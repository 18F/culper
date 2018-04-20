package eqip

const userTemplate = `
{{- $ssn := .Identification.ApplicantSSN.props.ssn.props}}
{{- $name := .Identification.ApplicantName.props.Name.props }}
{{- $date := .Identification.ApplicantBirthDate.props.Date.props}}
{{- $location := .Identification.ApplicantBirthPlace.props.Location.props}}
<key>
  <pseudoSsn>false</pseudoSsn>
  <ssn>{{$ssn.first}}{{$ssn.middle}}{{$ssn.last}}</ssn>
</key>
<demographicData>
  <birth>
    <date>
      <day>{{$date.day}}</day>
      <month>{{$date.month}}</month>
      <year>{{$date.year}}</year>
    </date>
    <place>
      <city>{{$location.city}}</city>
      <country>{{$location.country}}</country>
      <county>{{$location.county}}</county>
      <state>{{$location.state}}</state>
    </place>
  </birth>
  <fullName>
    <first>{{$name.first}}</first>
    <middle>{{$name.middle}}</middle>
    <last>{{$name.last}}</last>
  </fullName>
  <email></email>
  <telephone></telephone>
</demographicData>
`
const importRequestTemplate = `
<ns2:importRequest xmlns:ns2="http://webservice.ws.eqip.opm.gov/">
  <arg0 xmlns="">
    <agency>
      <agencyId>{{.CallerInfo.AgencyID}}</agencyId>
    </agency>
    <agencyUser>
      <pseudoSsn>{{.CallerInfo.AgencyUser.PseudoSSN}}</pseudoSsn>
      <ssn>{{.CallerInfo.AgencyUser.SSN}}</ssn>
    </agencyUser>
    <callerIpAddress></callerIpAddress>
  </arg0>
  <arg1 xmlns="">
  {{.Applicant}}
  </arg1>
  <arg2 xmlns="">
    <agencyId>{{.AgencyID}}</agencyId>
  </arg2>
  <arg3 xmlns="">
    <groupId>{{.AgencyGroupID}}</groupId>
  </arg3>
  <arg4>{{- .Content -}}</arg4>
</ns2:importRequest>
`

const isAliveTemplate = `
<ns2:isAlive xmlns:ns2="http://webservice.ws.eqip.opm.gov/" />
`

const envelopeTemplate = `
<?xml version="1.0"?>
<eapp>
<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"><SOAP-ENV:Header xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"><eqipws-auth:Authentication xmlns:eqipws-auth="urn:gov.opm.eqip.ws/Authentication"><UnencryptedSecurityToken xmlns="">{{- .Unsigned -}}</UnencryptedSecurityToken><EncryptedSecurityToken xmlns="">{{- .Signed -}}</EncryptedSecurityToken></eqipws-auth:Authentication></SOAP-ENV:Header><S:Body xmlns:ns2="http://webservice.ws.eqip.opm.gov/">{{- .RequestBody.XML -}}</S:Body></S:Envelope>
</eapp>
`
