package eqip

import (
	"bytes"
	"compress/zlib"
	"encoding/base64"
	"encoding/gob"
	"encoding/xml"
	"fmt"
	"io"
	"text/template"
)

// ImportRequest contains information for executing an eqip importRequest
type ImportRequest struct {
	CallerInfo    CallerInfo
	Applicant     UserTemplate
	AgencyID      int
	AgencyGroupID int
	Content       Base64Content
}

// When processing templates, indicates that execution should stop immediately.
const missingKeyIsError = "missingkey=error"
const missingKeyIsEmpty = "missingkey=zero"

// XML returns an xml representation of an ImportRequest
func (a ImportRequest) XML() string {
	tmpl := template.Must(template.New("import-request.xml").
		Option(missingKeyIsError).Parse(importRequestTemplate))
	var output bytes.Buffer
	err := tmpl.Execute(&output, a)
	if err != nil {
		fmt.Println(err)
		return "Unable to parse template"
	}
	return output.String()
}

// NewImportRequest creates an import request to be sent to the webservice. This is a helper func that properly sets up
// the user demographic data, compresses and encodes the xml content and fills in the agency ids
func NewImportRequest(ci CallerInfo, agencyID, agencyGroupID int, app map[string]interface{}, xmlContent string) (*ImportRequest, error) {
	var user UserTemplate
	if err := user.Load(app); err != nil {
		return nil, err
	}
	var base64Content Base64Content
	if err := base64Content.Compress(xmlContent); err != nil {
		return nil, err
	}

	r := &ImportRequest{
		CallerInfo:    ci,
		Applicant:     user,
		AgencyID:      agencyID,
		AgencyGroupID: agencyGroupID,
		Content:       base64Content,
	}
	return r, nil
}

// CallerInfo represents the agency and agency user making the web service call
type CallerInfo struct {
	AgencyID   string
	AgencyUser AgencyUser
}

// NewCallerInfo creates a CallerInfo struct based on agency id and ssn values
func NewCallerInfo(agencyID string, psuedoSSN bool, ssn string) CallerInfo {
	return CallerInfo{
		AgencyID: agencyID,
		AgencyUser: AgencyUser{
			PseudoSSN: psuedoSSN,
			SSN:       ssn,
		},
	}
}

// AgencyUser represents the Agency User making this call
type AgencyUser struct {
	PseudoSSN bool
	SSN       string
}

// RequestBody are objects that return XML representations of themselves
type RequestBody interface {
	XML() string
}

// Body is used for the contents of a SOAP body
type Body interface {
	SetResponseBody([]byte)
}

// UserTemplate stores an applicants demographic information
type UserTemplate string

// Load will use the application data in the user template.
func (t *UserTemplate) Load(app map[string]interface{}) error {
	tmpl := template.Must(template.New("user.xml").
		Option(missingKeyIsEmpty).Parse(userTemplate))
	var output bytes.Buffer
	if err := tmpl.Execute(&output, app); err != nil {
		return err
	}
	*t = UserTemplate(output.String())
	return nil
}

// Base64Content is a string that can compress and convert itself to base64
type Base64Content string

// Compress the `Base64Content` using zlib.
func (b *Base64Content) Compress(content string) error {
	var zlibBytes bytes.Buffer
	gw := zlib.NewWriter(&zlibBytes)
	_, err := gw.Write([]byte(content))
	if err != nil {
		return err
	}
	if err := gw.Flush(); err != nil {
		return err
	}
	if err := gw.Close(); err != nil {
		return err
	}
	base64Str := base64.StdEncoding.EncodeToString(zlibBytes.Bytes())
	*b = Base64Content(base64Str)
	return nil
}

// NewSOAPEnvelopeTemplate populates the envelope element for a SOAP request
func NewSOAPEnvelopeTemplate(action RequestBody, unsigned, signed string) (io.Reader, error) {
	tmpl := template.Must(template.New("envelope.xml").
		Option(missingKeyIsError).Parse(envelopeTemplate))
	var output bytes.Buffer
	err := tmpl.Execute(&output, struct {
		RequestBody RequestBody
		Signed      string
		Unsigned    string
	}{
		RequestBody: action,
		Signed:      signed,
		Unsigned:    unsigned,
	})
	if err != nil {
		return nil, err
	}
	return bytes.NewReader(output.Bytes()), err
}

// SOAPFault contains information about a webservice error. The general structure for SOAP 1.1
// fault is the following:
//<xs:complexType name="Fault" final="extension">
//	  <xs:sequence>
//		  <xs:element name="faultcode" type="xs:QName"/>
//		  <xs:element name="faultstring" type="xs:string"/>
//		  <xs:element name="faultactor" type="xs:anyURI" minOccurs="0"/>
//		  <xs:element name="detail" type="tns:detail" minOccurs="0">
//	  </xs:sequence>
//</xs:complexType>
// The application specific error information is placed in the <detail /> element which is why we
// extract those values directly with this struct.
// For instance:
//      <S:Fault>
//          <detail>
//              <ns2:EqipWSException>
//                  <message>This is an error message</message>
//                  <errorMessages>Error1</errorMessages>
//                  <errorMessages>Error2</errorMessages>
//              </ns2:EqipWSException>
//          </detail>
//      </S:Fault>
// The response schema can contain two possible exceptions:
//	   EqipWSException
//		   Represents a generic error condition in the e-QIP Web Service Interface.
//	   CharacerEncodingException
//		   Represents an error state due to an invalid String character encoding.
// Both exceptions contain the same structure but only one instance of it will ever be
// returned (if any errors exist).
type SOAPFault struct {
	EqipWSException           *ErrEqipWSException `xml:"Body>Fault>detail>EqipWSException"`
	CharacerEncodingException *ErrEqipWSException `xml:"Body>Fault>detail>CharacterEncodingException"`
}

// Error returns the appropriate error that contains the error information if any exist
func (f SOAPFault) Error() error {
	switch {
	case f.EqipWSException != nil:
		return f.EqipWSException
	case f.CharacerEncodingException != nil:
		return f.CharacerEncodingException
	default:
		return nil
	}
}

// ErrEqipWSException describes a generic error condition in the e-QIP Web Service Interface.
// This struct implements the Error interface so that it can be handled like typical golang
// errors.
type ErrEqipWSException struct {
	Message       string   `xml:"message"`
	ErrorMessages []string `xml:"errorMessages"`
}

// Error returns the message associated to the webservice exception.
func (e ErrEqipWSException) Error() string {
	return e.Message
}

// ImportRequestResponse is the response returned when a request is successful
//	<xs:complexType name="importRequestResponse">
//		<xs:sequence>
//			<xs:element name="return" type="tns:request" minOccurs="0"/>
//		</xs:sequence>
//	</xs:complexType>
type ImportRequestResponse struct {
	Return *Request `xml:"return"`
}

// Bytes converts the response to a byte array.
func (response *ImportRequestResponse) Bytes() []byte {
	var buffer bytes.Buffer
	enc := gob.NewEncoder(&buffer)
	if err := enc.Encode(response); err != nil {
		return []byte{}
	}
	return buffer.Bytes()
}

// Keys returns the agency and request keys from the response.
func (response *ImportRequestResponse) Keys() (int, string) {
	if response == nil || response.Return == nil {
		return 0, ""
	}
	ret := response.Return
	akey := ret.InitiatingAgency
	rkey := ret.RequestKey
	if akey == nil || rkey == nil {
		return 0, ""
	}

	return akey.AgencyID, rkey.RequestID
}

// Request contains information for an ImportRequestResponse
//	<xs:complexType name="request">
//		<xs:sequence>
//			<xs:element name="initiatingAgency" type="tns:agencyKey" minOccurs="0"/>
//			<xs:element name="requestKey" type="tns:requestKey" minOccurs="0"/>
//			<xs:element name="userAlreadyExisted" type="xs:boolean"/>
//		</xs:sequence>
//	</xs:complexType>
type Request struct {
	XMLName           xml.Name
	InitiatingAgency  *AgencyKey  `xml:"initiatingAgency"`
	RequestKey        *RequestKey `xml:"requestKey"`
	UserAleadyExisted bool        `xml:"userAlreadyExisted"`
}

// IsAlive is a no-op method that allows for testing that the e-QIP Agency Web Service Interface is available and operating
// <xs:complexType name="isAlive"><xs:sequence/>
type IsAlive struct{}

// XML returns the xml representation of IsAlive
func (a IsAlive) XML() string {
	tmpl := template.Must(template.New("is-alive.xml").
		Option(missingKeyIsError).Parse(isAliveTemplate))
	var output bytes.Buffer
	err := tmpl.Execute(&output, nil)
	if err != nil {
		return "Unable to parse template"
	}
	return output.String()
}

// IsAliveSOAPResponse is a wrapper struct containing success and failure information
type IsAliveSOAPResponse struct {
	SOAPFault
	ResponseBody []byte
}

// SetResponseBody sets the responses body value.
func (r *IsAliveSOAPResponse) SetResponseBody(b []byte) {
	r.ResponseBody = b
}

// ImportSOAPResponse is a wrapper struct containing success and failure information
type ImportSOAPResponse struct {
	SOAPFault
	ImportRequestResponse *ImportRequestResponse `xml:"Body>importRequestResponse"`
	ResponseBody          []byte
}

// SetResponseBody sets the responses body value.
func (r *ImportSOAPResponse) SetResponseBody(b []byte) {
	r.ResponseBody = b
}

// AgencyKey represents the identifier for an Agency in e-QIP
//	<xs:complexType name="agencyKey">
//		<xs:sequence>
//			<xs:element name="agencyId" type="xs:int"/>
//		</xs:sequence>
//	</xs:complexType>
type AgencyKey struct {
	AgencyID int `xml:"agencyId"`
}

// Attachment represents a document that is attached to an e-QIP investigation request
//	  <xs:complexType name="attachment">*/
//		  <xs:sequence>
//			  <xs:element name="attachmentBytes" type="xs:base64Binary" minOccurs="0"/>
//			  <xs:element name="attachmentDescription" type="xs:string" minOccurs="0"/>
//			  <xs:element name="attachmentFileName" type="xs:string" minOccurs="0"/>
//			  <xs:element name="attachmentKey" type="tns:attachmentKey" minOccurs="0"/>
//			  <xs:element name="documentType" type="tns:documentType" minOccurs="0"/>
//			  <xs:element name="methodOfTransmission" type="tns:attachmentTransmissionMethod" minOccurs="0"/>
//		  </xs:sequence>
//	  </xs:complexType>
type Attachment struct {
	AttachmentBytes       string         `xml:"attachmentBytes"`
	AttachmentDescription string         `xml:"attachmentDescription"`
	AttachmentFileName    string         `xml:"attachmentFileName"`
	AttachmentKey         *AttachmentKey `xml:"attachmentKey"`
	DocumentType          string         `xml:"documentType"`
	MethodOfTransmission  string         `xml:"methodOfTransmission"`
}

// AttachmentKey represents an identifier for an attachment within the e-QIP system
//	  <xs:complexType name="attachmentKey">
//		  <xs:sequence>
//			  <xs:element name="attachmentId" type="xs:int"/>
//		  </xs:sequence>
//	  </xs:complexType>
type AttachmentKey struct {
	AttachmentID int `xml:"attachmentId"`
}

// RequestKey uniquely identifies an Investigation Request within the e-QIP system
//	<xs:complexType name="requestKey">
//		<xs:sequence>
//			<xs:element name="requestId" type="xs:string" minOccurs="0"/>
//		</xs:sequence>
//	</xs:complexType>
type RequestKey struct {
	RequestID string `xml:"requestId"`
}
