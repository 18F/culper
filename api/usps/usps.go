package usps

import (
	"encoding/xml"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

var (
	// USPSURI is that base address for the USPS API
	USPSURI = "https://secure.shippingapis.com/ShippingAPI.dll"

	// VerifyAPI is the name of that API that handles address verifications
	VerifyAPI = "Verify"

	// USPSErrorCodes contains USPS code mapping to eApp error codes
	USPSErrorCodes = map[string]string{
		"-2147219400":     "error.geocode.city",
		"-2147219401":     "error.geocode.notfound",
		"-2147219403":     "error.geocode.multiple",
		"Generic":         "error.geocode.generic",
		"Default Address": "error.geocode.defaultAddress",
		"Partial":         "error.geocode.partial",
		"System":          "error.geocode.system",
		"80040B19":        "error.geocode.system.xml",
	}
)

// USPSGeocoder geocodes address information using the United States Post Office webservice
// API docs can be found https://www.usps.com/business/web-tools-apis/address-information-api.htm
type USPSGeocoder struct {
	Env     *api.Settings
	Log     *api.LogService
	baseURI string
	userID  string
}

// Validate takes values to be geocoded and executes a web service call
func (g USPSGeocoder) Validate(geoValues api.GeocodeValues) (api.GeocodeResults, error) {
	log := g.Log.NewLogger()
	uspsUserID := g.Env.String("USPS_API_API_KEY")
	if uspsUserID == "" {
		log.Warn(g.Log.USPSMissingKey)
	}

	Geocode = NewUSPSGeocoder(uspsUserID)
	return g.query(geoValues)
}

// query creates and executes http requests and populates a Results object
func (g USPSGeocoder) query(geoValues api.GeocodeValues) (results api.GeocodeResults, err error) {
	// Prepare uri used to query
	uri := g.prepareQueryURI(geoValues)

	// Query away!
	resp, err := http.Get(uri)
	if err != nil {
		log.WithError(err).Warn(api.USPSRequestError)
		return nil, fmt.Errorf("Unable to execute USPS Geocoding request")
	}

	// Decode the response to populate struct
	var addressResp USPSAddressValidateResponse
	if err := g.decode(resp.Body, &addressResp); err != nil {
		log.WithError(err).Warn(api.USPSDecodeError)
		return results, err
	}

	// Get a handle to found address
	foundAddress := addressResp.Address

	// Check if we've encountered an error
	if foundAddress.Error != nil {
		if errCode, ok := USPSErrorCodes[foundAddress.Error.Number]; ok {
			log.WithField("code", errCode).Warn(api.USPSKnownErrorCode)
			return results, fmt.Errorf("%v", errCode)
		}
		errCode := USPSErrorCodes["Generic"]
		log.WithField("code", errCode).Warn(api.USPSUnknownErrorCode)
		return results, fmt.Errorf("%v", errCode)

	}

	if strings.ContainsAny(foundAddress.ReturnText, "Default Address") {
		errCode := USPSErrorCodes["Default Address"]
		log.WithField("code", errCode).Warn(api.USPSKnownErrorCode)
		return results, fmt.Errorf("%v", errCode)
	}

	// Generate a normalized Result struct from the address found
	results = append(results, foundAddress.ToResult(geoValues))

	// Check if any of values requested to be validate do not match up to what was
	// returned by the validation response. If there is a mismatch, mark as partial
	if results.HasPartial() {
		errCode := USPSErrorCodes["Partial"]
		log.WithField("code", errCode).Warn(api.USPSKnownErrorCode)
		return results, fmt.Errorf(errCode)
	}

	return results, nil
}

// decode handles generating a struct from a response body. The USPS api can return two different sets of XML based
// on the error that has occurred. Under normal circumstances, this is returned
//
//	   <AddressValidateResponse>
//		   <Address />
//	   </AddressValidateResponse>
//
// or
//
//	  <AddressValidateResponse>
//		  <Address>
//			  <Error>
//			   ...
//			  </Error>
//		  </Address
//	  </AddressValidateResponse>
//
// However, if a higher level system error is encountered, for instance, when using an invalid user id,
// this structure is returned
//
//	  <Error>
//		  <Number>80040B1A</Number>
//		  <Description>Authorization failure.  Perhaps username and/or password is incorrect.</Description>
//		  <Source>USPSCOM::DoAuth</Source>
//	  </Error>
func (g USPSGeocoder) decode(r io.Reader, addressResp *USPSAddressValidateResponse) error {
	body, _ := ioutil.ReadAll(r)

	// First attempt to unmarshal to typical AddressValidateResponse element
	err := xml.Unmarshal(body, addressResp)
	if err == nil {
		return nil
	}
	log.Debug("Error attempting to decode USPS Address Validation Response. Checking if returned xml is system error")

	// Check if we've encountered a system error where only <Error> is returned as the root element
	var errorResp USPSErrorResponse
	err = xml.Unmarshal(body, &errorResp)
	if err != nil {
		log.WithError(err).Debug("Error attempting to decode USPS Address validation")
		return err
	}

	// We have a system error so attempt to resolve error code
	if errCode, ok := USPSErrorCodes[errorResp.Number]; ok {
		return ErrUSPSSystem{Message: errCode}
	}

	log.Debug("Unable to resolve error code. Default to generic error message")
	sysErr := ErrUSPSSystem{Message: USPSErrorCodes["System"]}
	return sysErr
}

// prepareQueryURI creates the url used to execute a http validate address request
func (g USPSGeocoder) prepareQueryURI(geoValues api.GeocodeValues) string {
	// Set up query parameters
	v := url.Values{}

	// Populate USPS Address struct with generic geo values
	address := USPSAddress{}
	address.FromGeoValues(geoValues)
	addressRequest := USPSAddressValidateRequest{
		UserID:  g.userID,
		Address: address,
	}

	// Set the api we want to query
	v.Set("API", VerifyAPI)

	// Set the xml containing information to verify
	v.Set("XML", addressRequest.ToXMLString())

	uri := fmt.Sprintf("%v?%v", g.baseURI, v.Encode())
	return uri
}

// USPSAddressValidateRequest contains the information necessary to execute an address validation webservice request
// The USERID refers to the api key that must be sent with each request
type USPSAddressValidateRequest struct {
	XMLName xml.Name `xml:"AddressValidateRequest"`
	UserID  string   `xml:"USERID,attr"`
	Address USPSAddress
}

// USPSAddressValidateResponse contains the information returned from a successful webservice request
type USPSAddressValidateResponse struct {
	XMLName xml.Name    `xml:"AddressValidateResponse"`
	Address USPSAddress `xml:"Address"`
}

// ToXMLString creates a string representation of the xml request
func (r USPSAddressValidateRequest) ToXMLString() string {
	output, _ := xml.Marshal(r)
	return string(output)
}

// USPSErrorResponse stores a system level error
type USPSErrorResponse struct {
	XMLName xml.Name `xml:"Error"`
	USPSError
}

// USPSError is the structure for responses resulting in an error
type USPSError struct {
	// The error number generated by the Web Tools server.
	Number string `xml:"Number"`

	// The component and interface that generated the error on the Web Tools server.
	Source string `xml:"Source"`

	// The error description
	Description string `xml:"Description"`

	// [reserved for future use according to USPS docs]
	HelpFile string `xml:"HelpFile"`

	// [reserved for future use according to USPS docs]
	HelpContext string `xml:"HelpContext"`
}

// USPSAddress represents the structure for the <Address> element information in a USPS request and response.
// With a successful response, the following is returned
//  <Address>
//    <Address2></Address2>
//    <City></City>
//    <State></State>
//    <Zip5></Zip5>
//    <Zip4></Zip4>
//  </Address>
//
// When there's an error with the address information, the <Error> block is nested within the <Address /> element
// like the following
// <AddressValidateResponse>
//    <Address>
//        <Error>
//            <Number>-2147219401</Number>
//            <Source>clsAMS</Source>
//            <Description>Address Not Found.  </Description>
//            <HelpFile/>
//            <HelpContext/>
//        </Error>
//    </Address>
// </AddressValidateResponse>
//
// Therefore, we include an Error field in the Address struct. We make it a pointer so that we can check for <nil>
// if the value is not populated (no error has occurred).
type USPSAddress struct {
	// XMLName refers to the name to give the XML tag
	XMLName xml.Name `xml:"Address"`
	// Up to 5 address verifications can be included per transaction.
	// <Address ID="0"></Address><Address ID="1"></Address>
	ID int64 `xml:"ID,attr"`

	// Maximum characters allowed: 38
	FirmName string `xml:"FirmName,omitempty"`

	// Address Line 1 is used to provide an apartment or suite number, if applicable.  Maximum characters allowed: 38
	Address1 string `xml:"Address1"`

	// Street address. Maximum characters allowed: 38
	Address2 string `xml:"Address2"`

	// Maximum characters allowed: 15.  Either <City> and <State> or <Zip5> are required.
	City string `xml:"City"`

	// Maximum characters allowed: 2. Either <City> and <State> or <Zip5> are required.
	State string `xml:"State"`

	// Maximum characters allowed: 28. For Puerto Rico addresses only.
	Urbanization string `xml:"Urbanization"`

	// Maximum characters allowed: 5. Either <City> and <State> or <Zip5> are required.
	Zip5 string `xml:"Zip5"`

	// Input tag exactly as presented, not all caps.  Maximum characters allowed:
	Zip4 string `xml:"Zip4"`

	// Stores error information for an address. USPS returns errors within the address block if they
	// exist. We set this to a pointer so that we can check for <nil>
	Error *USPSError `xml:"Error"`

	// Stores additional information that is not necessarily an error. Some instances may include where an apartment
	// number used does not correspond to a valid base address
	ReturnText string `xml:"ReturnText,omitempty"`
}

// FromGeoValues populates a USPSAddress using Values
func (address *USPSAddress) FromGeoValues(geoValues api.GeocodeValues) {
	// Don't get mad at me, USPS makes Address1 the apartment/suite field and Address2
	// the mailing address field
	if geoValues.Street != "" {
		address.Address2 = geoValues.Street
	}
	if geoValues.Street2 != "" {
		address.Address1 = geoValues.Street2
	}

	if geoValues.City != "" {
		address.City = geoValues.City
	}
	if geoValues.State != "" {
		address.State = geoValues.State
	}
}

// ToResult generates a Result struct and determines whether it is a partial match. A partial
// match occurs when there's a mismatch in values between each corresponding field
func (address *USPSAddress) ToResult(geoValues api.GeocodeValues) (result api.GeocodeResult) {
	result.Street = address.Address2
	result.Street2 = address.Address1
	result.City = address.City
	result.State = address.State
	result.Zipcode = address.Zip5

	// Check if there are deviations between what was requested versus what
	// was returned. If we find any, mark result as Partial
	ziplength := len(geoValues.Zipcode)
	switch {
	case address.ReturnText != "":
		fallthrough
	case !strings.EqualFold(result.Street, geoValues.Street):
		fallthrough
	case !strings.EqualFold(result.Street2, geoValues.Street2):
		fallthrough
	case !strings.EqualFold(result.City, geoValues.City):
		fallthrough
	case !strings.EqualFold(result.State, geoValues.State):
		fallthrough
	case ziplength < 5:
		fallthrough
	case ziplength >= 5 && !strings.EqualFold(result.Zipcode, geoValues.Zipcode[0:5]):
		fallthrough
	case ziplength > 5 && !strings.EqualFold(address.Zip4, geoValues.Zipcode[ziplength-4:ziplength]):
		result.Partial = true
	}

	if address.ReturnText != "" {
		result.Error = address.ReturnText
	}

	return result
}

// ErrUSPSSystem is the expected structure of the USPS system.
type ErrUSPSSystem struct {
	Message string
}

// Error returns the USPS error message.
func (e ErrUSPSSystem) Error() string {
	return e.Message
}

// NewUSPSGeocoder creates a new instance of USPS Geocoder
func NewUSPSGeocoder(userID string) *USPSGeocoder {
	return &USPSGeocoder{
		userID:  userID,
		baseURI: USPSURI,
	}
}

// NewTestUSPSGeocoder is used for mocking purposes. We can instantiate a new instance
// and set the URL to that of an http test mock server
func NewTestUSPSGeocoder(userID string, baseURI string) *USPSGeocoder {
	if baseURI == "" {
		baseURI = USPSURI
	}

	return &USPSGeocoder{
		userID:  userID,
		baseURI: baseURI,
	}
}
