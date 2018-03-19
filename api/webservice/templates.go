package webservice

const xmpTemplate = `
<XMP version="3.00">
  {{.SubmittedRequestInfo}}
  <AgencyUsageBlock>
    <TypeOfInvestigation>
      <Type>64</Type>
      <Service>B</Service>
    </TypeOfInvestigation>
    <SensitivityLevel>
      <Code>2</Code>
    </SensitivityLevel>
    <Access>
      <Code>2</Code>
    </Access>
    <Action>
      <Nature>MIL</Nature>
    </Action>
    <Position>
      <Title>Military</Title>
    </Position>
    <SON>957B</SON>
    <LocationOPF>
      <Code>None</Code>
    </LocationOPF>
    <SOI>NV00</SOI>
    <LocationSEC>
      <Code>None</Code>
    </LocationSEC>
    <InvestigativeRequirement>I</InvestigativeRequirement>
    <ApplicantAffiliation>MIL</ApplicantAffiliation>
    <IPAC>DOD-NAVY</IPAC>
    <RequestingOfficials>
      <Requestor>
        <Name>AARON Strohl Laney</Name>
        <Email>eml152dummy@MailDomain.com</Email>
        <Telephone>
          <Number>1 (763) 323-2004</Number>
        </Telephone>
      </Requestor>
      <SecondRequestor>
        <Name>JAMES Strohl Laney</Name>
        <Email>eml153dummy@MailDomain.com</Email>
        <Telephone>
          <Number>1 (298) 723-1913</Number>
        </Telephone>
      </SecondRequestor>
    </RequestingOfficials>
  </AgencyUsageBlock>
</XMP>
`

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
      <agencyId>{{.CallerInfo.Agency.AgencyID}}</agencyId>
    </agency>
    <agencyUser>
      <pseudoSsn>{{.CallerInfo.AgencyUser.PseudoSSN}}</pseudoSsn>
      <ssn>{{.CallerInfo.AgencyUser.SSN}}</ssn>
    </agencyUser>
    <callerIpAddress>76.219.232.180</callerIpAddress>
  </arg0>
  <arg1 xmlns="">
  {{.User2}}
  </arg1>
  <arg2 xmlns="">
    <agencyId>{{.AgencyKey.AgencyID}}</agencyId>
  </arg2>
  <arg3 xmlns="">
    <groupId>{{.AgencyGroupKey.GroupID}}</groupId>
  </arg3>
  <arg4>{{- .Base64Content -}}</arg4>
</ns2:importRequest>
`

const envelopeTemplate = `
<?xml version="1.0"?>
<eapp>
<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"><SOAP-ENV:Header xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"><eqipws-auth:Authentication xmlns:eqipws-auth="urn:gov.opm.eqip.ws/Authentication"><UnencryptedSecurityToken xmlns="">{{- .Unsigned -}}</UnencryptedSecurityToken><EncryptedSecurityToken xmlns="">{{- .Signed -}}</EncryptedSecurityToken></eqipws-auth:Authentication></SOAP-ENV:Header><S:Body xmlns:ns2="http://webservice.ws.eqip.opm.gov/">{{- .RequestBody.XML -}}</S:Body></S:Envelope>
</eapp>
`

const getRequestFormPdfResponseTemplate = `
<ns2:getRequestFormPdf xmlns:ns2="http://webservice.ws.eqip.opm.gov/">
  <arg0 xmlns="">
    <agency>
      <agencyId>{{.CallerInfo.Agency.AgencyID}}</agencyId>
    </agency>
    <agencyUser>
      <pseudoSsn>{{.CallerInfo.AgencyUser.PseudoSSN}}</pseudoSsn>
      <ssn>{{.CallerInfo.AgencyUser.SSN}}</ssn>
    </agencyUser>
  </arg0>
  <arg1>
    <requestId>{{.RequestKey.RequestID}}</requestId>
  </arg1>
</ns2:getRequestFormPdf>
`
