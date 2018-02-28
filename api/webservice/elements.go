package webservice

import (
	"bytes"
	"encoding/gob"
	"encoding/xml"
	"io"
	"text/template"
)

type RequestBody interface {
	XML() string
}

// SOAPEnvelope contains the entire contents of a SOAP request
// Based on schema defined in http://schemas.xmlsoap.org/soap/envelope/. The basic
// structure:
//
//	<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
//		<xs:complexType name="Header">...</xs:complexType>
//		<xs:complexType name="Body">...</xs:complexType>
//	</xs:schema>
type SOAPEnvelope struct {
	XMLName xml.Name `xml:"S:Envelope"`
	Header  SOAPHeader
	Body    SOAPBody
}

// NewSOAPEnvelope sets up the structure for a soap request
func NewSOAPEnvelope(action Body, unsigned, signed string) SOAPEnvelope {
	return SOAPEnvelope{
		Header: SOAPHeader{
			Authentication: Authentication{
				Namespace:                defaultAuthNamespace,
				UnencryptedSecurityToken: unsigned,
				EncryptedSecurityToken:   signed,
			},
		},
		Body: SOAPBody{
			Body: action,
		},
	}
}

func NewSOAPEnvelopeTemplate(action RequestBody, unsigned, signed string) (io.Reader, error) {
	tmpl := template.Must(template.New("envelope.xml").ParseFiles("envelope.xml"))
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
	return bytes.NewReader(output.Bytes()), err
}

// XML generates the xml for this specific struct as a Reader
func (s *SOAPEnvelope) XML() (io.Reader, error) {
	var buf bytes.Buffer
	enc := xml.NewEncoder(&buf)
	// For debugging
	enc.Indent("  ", "    ")
	if err := enc.Encode(s); err != nil {
		return nil, err
	}
	return bytes.NewReader(buf.Bytes()), nil
}

// SOAPHeader contains authentication information
type SOAPHeader struct {
	XMLName        xml.Name `xml:"SOAP-ENV:Header"`
	Authentication Authentication
}

// Authentication contains unencrypted and encrypted security tokens
type Authentication struct {
	XMLName                  xml.Name `xml:"eqipws-auth:Authentication"`
	Namespace                string   `xml:"xmlns:eqipws-auth,attr"`
	UnencryptedSecurityToken string   `xml:"UnencryptedSecurityToken"`
	EncryptedSecurityToken   string   `xml:"EncryptedSecurityToken"`
}

// SOAPBody is a generic container for content
type SOAPBody struct {
	XMLName xml.Name `xml:"xmlns:ns2:http://webservice.ws.eqip.opm.gov S:Body"`
	Body    Body
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

// ImportRequest defines the structure for the element used to import
// applicant information
//	<xs:complexType name="importRequest">
//		<xs:sequence>
//			<xs:element name="arg0" type="tns:callerInfo" minOccurs="0"/>
//			<xs:element name="arg1" type="tns:user" minOccurs="0"/>
//			<xs:element name="arg2" type="tns:agencyKey" minOccurs="0"/>
//			<xs:element name="arg3" type="tns:agencyGroupKey" minOccurs="0"/>
//			<xs:element name="arg4" type="xs:base64Binary" nillable="true" minOccurs="0"/>
//			<xs:element name="arg5" type="tns:attachment" minOccurs="0" maxOccurs="unbounded"/>
//		</xs:sequence>
//	</xs:complexType>
type ImportRequest struct {
	XMLName        xml.Name       `xml:"ns2:importRequest"`
	CallerInfo     CallerInfo     `xml:"arg0"`
	User           UserKey        `xml:"arg1>key"`
	AgencyKey      AgencyKey      `xml:"arg2"`
	AgencyGroupKey AgencyGroupKey `xml:"arg3"`
	Base64Content  string         `xml:"arg4"`
	Attachments    []Attachment   `xml:"arg5"`
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
type IsAlive struct {
	XMLName xml.Name `xml:"ns2:isAlive"`
}

func (a IsAlive) XML() string {
	tmpl := template.Must(template.New("is-alive.xml").ParseFiles("is-alive.xml"))
	var output bytes.Buffer
	err := tmpl.Execute(&output, nil)
	if err != nil {
		return "Unable to parse template"
	}
	return output.String()
}

// CallerInfo represents the agency and agency user making the web service call.
//	<xs:complexType name="callerInfo">
//		<xs:sequence>
//			<xs:element name="agency" type="tns:agencyKey" minOccurs="0"/>
//			<xs:element name="agencyUser" type="tns:userKey" minOccurs="0"/>
//			<xs:element name="callerIpAddress" type="xs:string" minOccurs="0"/>
//		</xs:sequence>
//	 </xs:complexType
type CallerInfo struct {
	Agency          *AgencyKey `xml:"agency"`
	AgencyUser      *UserKey   `xml:"agencyUser"`
	CallerIPAddress string     `xml:"callerIpAddress"`
}

// AgencyKey represents the identifier for an Agency in e-QIP
//	<xs:complexType name="agencyKey">
//		<xs:sequence>
//			<xs:element name="agencyId" type="xs:int"/>
//		</xs:sequence>
//	</xs:complexType>
type AgencyKey struct {
	XMLName  xml.Name
	AgencyID int `xml:"agencyId"`
}

// AgencyGroupKey represents the identifier for an Agency Group in e-QIP
//	  <xs:complexType name="agencyGroupKey">
//		  <xs:sequence>
//			  <xs:element name="groupId" type="xs:int"/>
//		  </xs:sequence>
//	  </xs:complexType>
type AgencyGroupKey struct {
	XMLName xml.Name
	GroupID int `xml:"groupId"`
}

// UserKey represents a User within the e-QIP system
//	  <xs:complexType name="userKey">
//		  <xs:sequence>
//			  <xs:element name="pseudoSsn" type="xs:boolean"/>
//			  <xs:element name="ssn" type="xs:string" minOccurs="0"/>
//		  </xs:sequence>
//	  </xs:complexType>
type UserKey struct {
	PseudoSSN bool   `xml:"pseudoSsn"`
	SSN       string `xml:"ssn"`
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

// Body is used for the contents of a SOAP body
type Body interface{}
