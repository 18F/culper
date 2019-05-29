package xml

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"path"
	"reflect"
	"regexp"
	"strings"

	"github.com/benbjohnson/clock"
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// Service is an implementation of handling XML.
type Service struct {
	clock        clock.Clock
	templatePath string
}

// NewXMLService returns a new XML service
func NewXMLService(templatePath string) Service {
	localClock := clock.New()

	return Service{
		clock:        localClock,
		templatePath: templatePath,
	}
}

// NewXMLServiceWithMockClock allows you to create an XML service with a minuplable clock
func NewXMLServiceWithMockClock(templatePath string, clock clock.Clock) Service {
	return Service{
		clock,
		templatePath,
	}
}

// PackageXML returns the XML representation of an application
func (service Service) PackageXML(app api.Application) (template.HTML, error) {
	// This is perhaps silly. I think that things might work with just the raw application sections
	// but I think that rather than expose that it will be better to keep the JSON as the interface
	jsonBytes, jsonErr := json.Marshal(app)
	if jsonErr != nil {
		return template.HTML(""), errors.Wrap(jsonErr, "Unable to marshal application")
	}

	var data map[string]interface{}
	unmarhalErr := json.Unmarshal(jsonBytes, &data)
	if unmarhalErr != nil {
		return template.HTML(""), errors.Wrap(jsonErr, "Unable to re-un-marshal application")
	}

	return service.DefaultTemplate("application.xml", data)

}

// DefaultTemplate returns a template given data.
func (service Service) DefaultTemplate(templateName string, data map[string]interface{}) (template.HTML, error) {

	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs(templateName, data, fmap)
}

func (service Service) templateFMap() template.FuncMap {

	// fmap is a mapping of functions to be used within the XML template execution.
	// These can be helper functions for formatting or even to process complex structure
	// types.
	fmap := template.FuncMap{
		"address":                service.address,
		"addressIn":              addressIn,
		"agencyType":             agencyType,
		"apoFpo":                 service.apoFpo,
		"branch":                 branch,
		"branchToAnswer":         branchToAnswer,
		"branchToBool":           branchToBool,
		"branchcollectionHas":    branchcollectionHas,
		"branchAny":              branchAny,
		"checkbox":               checkbox,
		"checkboxHas":            checkboxHas,
		"checkboxTrueFalse":      checkboxTrueFalse,
		"citizenshipStatus":      citizenshipStatus,
		"country":                service.countryValue,
		"countryComments":        countryComments,
		"citizenshipHas":         citizenshipHas,
		"clearanceType":          clearanceType,
		"date":                   service.date,
		"dateOptional":           service.dateOptional,
		"dateEstimated":          dateEstimated,
		"daterange":              service.daterange,
		"daysInRange":            daysInRange,
		"deceased":               deceased,
		"degreeType":             degreeType,
		"derivedBasis":           derivedBasis,
		"naturalizedBasis":       naturalizedBasis,
		"diagnosisType":          diagnosisType,
		"dischargeType":          dischargeType,
		"doctorFirstName":        doctorFirstName,
		"doctorLastName":         doctorLastName,
		"drugType":               drugType,
		"spouseForeignDocType":   spouseForeignDocType,
		"foreignAffiliation":     foreignAffiliation,
		"frequencyType":          frequencyType,
		"email":                  email,
		"employmentType":         employmentType,
		"hairType":               hairType,
		"hasRelativeType":        hasRelativeType,
		"inc":                    inc,
		"isPostOffice":           isPostOffice,
		"isDomestic":             isDomestic,
		"isInternational":        isInternational,
		"location":               service.location,
		"locationOverrideLayout": service.locationOverrideLayout,
		"militaryAddress":        service.militaryAddress,
		"militaryStatus":         militaryStatus,
		"monthYear":              service.monthYear,
		"monthYearOptional":      service.monthYearOptional,
		"monthYearDaterange":     service.monthYearDaterange,
		"name":                   service.name,
		"nameLastFirst":          service.nameLastFirst,
		"notApplicable":          notApplicable,
		"now":                    service.now,
		"number":                 number,
		"padDigits":              padDigits,
		"radio":                  radio,
		"schoolType":             schoolType,
		"selectBenefit":          selectBenefit,
		"selfAbroadDocType":      selfAbroadDocType,
		"selfForeignDocType":     selfForeignDocType,
		"severanceType":          severanceType,
		"suffixType":             suffixType,
		"relationshipType":       relationshipType,
		"relativeForeignDocType": relativeForeignDocType,
		"telephone":              service.telephone,
		"telephoneNoNumber":      telephoneNoNumber,
		"telephoneNoTimeOfDay":   service.telephoneNoTimeOfDay,
		"text":                   text,
		"textarea":               textarea,
		"toUpper":                toUpper,
		"treatment":              service.treatment,
		"treatmentAnswerType":    treatmentAnswerType,
		"tmpl":                   service.DefaultTemplate,
	}
	return fmap
}

// XXX
// Work-around for sloppy template logic where empty elements
// are generated in scenarios where no element is applicable.
// For example, UnemployedComment when not unemployed. See:
// https://github.com/18F/e-QIP-prototype/issues/717
func applyBulkFixes(xml string) string {
	replaceWithEmpty := []string{
		"<[a-zA-Z_0-9]+></[a-zA-Z_0-9]+>", // empty elements
		" DoNotKnow=\"False\"",
		" DoNotKnow=\"\"",
		" Type=\"\"",
		" Estimated=\"\"",
		" Estimated=\"false\"",
	}

	x := xml
	for _, n := range replaceWithEmpty {
		re := regexp.MustCompile(n)
		x = re.ReplaceAllString(x, "")
	}

	return x
}

func (service Service) xmlTemplate(name string, data map[string]interface{}) (template.HTML, error) {
	path := path.Join(service.templatePath, name)
	tmpl := template.Must(template.New(name).ParseFiles(path))
	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		return template.HTML(""), err
	}
	return template.HTML(applyBulkFixes(output.String())), nil
}

// xmlTemplateWithFuncs executes an XML template with mapped functions to be used with the
// given entity.
func (service Service) xmlTemplateWithFuncs(name string, data map[string]interface{}, fmap template.FuncMap) (template.HTML, error) {
	path := path.Join(service.templatePath, name)
	tmpl := template.Must(template.New(name).Funcs(fmap).ParseFiles(path))
	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		return template.HTML(""), err
	}
	return template.HTML(applyBulkFixes(output.String())), nil
}

func getInterfaceAsBytes(anon interface{}) []byte {
	js, err := json.Marshal(anon)
	if err != nil {
		return nil
	}
	return js
}

// now returns the server's local time in yyyy-MM-dd
func (service Service) now() string {
	t := service.clock.Now()
	return fmt.Sprintf("%d-%02d-%02d", t.Year(), t.Month(), t.Day())
}

func apoFpoView(primary map[string]interface{}, altAddress map[string]interface{}) map[string]interface{} {
	view := make(map[string]interface{})
	view["Primary"] = primary

	if props, ok := altAddress["props"]; ok {
		if hasApo, ok := (props.(map[string]interface{}))["HasDifferentAddress"]; ok {
			if alt, ok := (props.(map[string]interface{}))["Address"]; ok {
				view["HasApo"] = hasApo
				view["Alternate"] = alt
				return view
			}
		}
	}

	view["HasApo"] = make(map[string]interface{})
	view["Alternate"] = make(map[string]interface{})
	return view
}

// apoFpo generates the APOFPO element, given a primary address and an alternate address.
// primary is a required location type. altAddress is an optionally populated physicaladdress type.
func (service Service) apoFpo(primary map[string]interface{}, altAddress map[string]interface{}) (template.HTML, error) {
	// Templates operate on a single dot set, so create a single view on the data
	view := apoFpoView(primary, altAddress)
	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("apofpo.xml", view, fmap)
}

// selectBenefit returns the appropriate sub-tree from Foreign.BenefitActivity.props.List.props.items[*],
// given the benefit frequency type. This faciltates less duplication in foreign-financial-benefits.xml.
func selectBenefit(freqType string, benefitItem map[string]interface{}) (map[string]interface{}, error) {
	selector := freqType + "Benefit"
	if t, ok := benefitItem[selector]; ok {
		if p, ok := (t.(map[string]interface{}))["props"]; ok {
			return (p.(map[string]interface{})), nil
		}
	}
	return nil, errors.New(selector + " not found in benefit item")
}

func (service Service) address(loc map[string]interface{}, dnk map[string]interface{}) (template.HTML, error) {
	view := make(map[string]interface{})
	view["Location"] = loc
	view["DoNotKnow"] = dnk

	fmap := service.templateFMap()

	return service.xmlTemplateWithFuncs("address.xml", view, fmap)
}

// Put simple structures here where they only output a string

// simpleValue returns the value property of a basic payload type.
func simpleValue(data map[string]interface{}) string {
	props, ok := data["props"]
	if ok {
		return (props.(map[string]interface{}))["value"].(string)
	}
	return ""
}

// XXX
// Temporary measure to work-around issue where eApp has one field
// where user is prompted to enter as "Last name, First name" but
// e-QIP has two separate XML elements.
// See: https://github.com/18F/e-QIP-prototype/issues/715
func doctorLastName(data map[string]interface{}) string {
	fullName := simpleValue(data)
	if fullName == "" {
		// Shouldn't get here as UI should enforce non-empty field
		return ""
	}

	commaDelim := strings.SplitN(fullName, ",", 2)
	if len(commaDelim) == 2 {
		return strings.TrimSpace(commaDelim[0])
	}

	return fullName
}

// XXX
// See comment on doctorLastName()
func doctorFirstName(data map[string]interface{}) string {
	fullName := simpleValue(data)
	if fullName == "" {
		// Shouldn't get here as UI should enforce non-empty field
		return ""
	}

	commaDelim := strings.SplitN(fullName, ",", 2)
	if len(commaDelim) == 2 {
		return strings.TrimSpace(commaDelim[1])
	}

	return ""
}

func branch(data map[string]interface{}) string {
	return simpleValue(data)
}

func branchAny(branches ...map[string]interface{}) string {
	for _, branch := range branches {
		if simpleValue(branch) == "Yes" {
			return "Yes"
		}
	}
	return "No"
}

func branchcollectionHas(data map[string]interface{}) string {
	props, ok := data["props"]
	if !ok {
		return "No"
	}

	items, ok := (props.(map[string]interface{}))["items"].([]interface{})
	if !ok {
		return "No"
	}

	if len(items) == 0 {
		return "No"
	}

	for _, item := range items {
		bi := item.(map[string]interface{})["Item"]
		b, ok := (bi.(map[string]interface{}))["Has"]
		if !ok {
			return "No"
		}

		val := simpleValue(b.(map[string]interface{}))
		if val == "Yes" {
			return val
		}
	}

	return "No"
}

func email(data map[string]interface{}) string {
	return simpleValue(data)
}

func text(data map[string]interface{}) string {
	return simpleValue(data)
}

func textarea(data map[string]interface{}) string {
	return simpleValue(data)
}

func number(data map[string]interface{}) string {
	return simpleValue(data)
}

func radio(data map[string]interface{}) string {
	return simpleValue(data)
}

func checkbox(data map[string]interface{}) string {
	props, ok := data["props"]
	if ok {
		values, ok := (props.(map[string]interface{}))["values"].([]interface{})
		if !ok {
			return ""
		}
		ss := []string{}
		for _, v := range values {
			ss = append(ss, v.(string))
		}
		return strings.Join(ss, ",")
	}
	return ""
}

func checkboxHas(data map[string]interface{}, target string) string {
	props, ok := data["props"]
	if ok {
		values, ok := (props.(map[string]interface{}))["values"].([]interface{})
		if !ok {
			return "False"
		}
		for _, s := range values {
			if s == target {
				return "True"
			}
		}
	}
	return "False"
}

func hasRelativeType(data map[string]interface{}, target string) string {
	props, ok := data["props"]
	if !ok {
		return "False"
	}

	items, ok := (props.(map[string]interface{}))["items"].([]interface{})
	if !ok {
		return "False"
	}

	if len(items) == 0 {
		return "False"
	}

	for _, item := range items {
		ci := item.(map[string]interface{})["Item"]
		relation, ok := (ci.(map[string]interface{}))["Relation"]
		if !ok {
			return "False"
		}

		val := simpleValue(relation.(map[string]interface{}))
		if val == target {
			return "True"
		}
	}

	return "False"
}

// relationshipType translates our enums to eqip specific enums
func relationshipType(str string) string {
	types := map[string]string{
		"Mother":        "01Mother",
		"Father":        "02Father",
		"Stepmother":    "03Stepmother",
		"Stepfather":    "04Stepfather",
		"Fosterparent":  "05FosterParent",
		"Child":         "06Child",
		"Stepchild":     "07Stepchild",
		"Brother":       "08Brother",
		"Sister":        "09Sister",
		"Stepbrother":   "10Stepbrother",
		"Stepsister":    "11Stepsister",
		"Half-brother":  "12HalfBrother",
		"Half-sister":   "13HalfSister",
		"Father-in-law": "14FatherInLaw",
		"Mother-in-law": "15MotherInLaw",
		"Guardian":      "16Guardian",
	}
	return types[str]
}

func foreignAffiliation(str string) string {
	types := map[string]string{
		"Yes":          "Yes",
		"No":           "No",
		"I don't know": "IDontKnow",
	}
	return types[str]
}

func deceased(str string) string {
	types := map[string]string{
		"Yes": "Yes",
		"No":  "No",
		"DK":  "IDontKnow",
	}
	return types[str]
}

// citizenshipStatus translates our enums to eqip specific enums
func citizenshipStatus(status string) string {
	alias := map[string]string{
		"Citizen":     "USByBirth",
		"ForeignBorn": "USByBirthOutsideUS",
		"Naturalized": "USNotByBirth",
		"Derived":     "DerivedUSCitizen",
		"NotCitizen":  "Alien",
	}
	return alias[status]
}

func schoolType(t string) string {
	alias := map[string]string{
		"High School":    "HighSchool",
		"College":        "College",
		"Vocational":     "Vocational",
		"Correspondence": "Correspondence",
	}
	return alias[t]
}

func degreeType(t string) string {
	alias := map[string]string{
		"High School Diploma": "HighSchool",
		"Associate":           "Associate",
		"Bachelor":            "Bachelor",
		"Master":              "Master",
		"Doctorate":           "Doctorate",
		"Professional":        "Professional",
		"Other":               "Other",
	}
	return alias[t]
}

func diagnosisType(t string) string {
	alias := map[string]string{
		"Psychotic disorder":              "PsychoticDisorder",
		"Schizophrenia":                   "Schizophrenia",
		"Schizoaffective disorder":        "SchizoaffectiveDisorder",
		"Delusional disorder":             "DelusionalDisorder",
		"Bipolar mood disorder":           "BipolarMoodDisorder",
		"Borderline personality disorder": "BorderlinePersonalityDisorder",
		"Antisocial personality disorder": "AntisocialPersonalityDisorder",
	}
	return alias[t]
}

// relativeForeignDocType translates our enums to eqip specific enums
// XXX https://github.com/18F/e-QIP-prototype/issues/680
func relativeForeignDocType(docType string) string {
	alias := map[string]string{
		"FS":                     "FS240or545",
		"DS":                     "DS1350",
		"NaturalizedAlien":       "NaturalizedAlienRegistration",
		"NaturalizedPermanent":   "NaturalizedPermanentResident",
		"NaturalizedCertificate": "NaturalizationCertificate",
		"DerivedAlien":           "DerivedAlienRegistration",
		"DerivedPermanent":       "DerivedPermanentResident",
		"DerivedCertificate":     "DerivedCitizenshipCertificate",
		"Permanent":              "NonCitizenI551",
		"Employment":             "NonCitizenI766",
		"Arrival":                "NonCitizenI94",
		"Visa":                   "NonCitizenVisa",
		"F1":                     "NonCitizenI20",
		"J1":                     "NonCitizenDS2019",
		"Other":                  "Other",
	}
	return alias[docType]
}

// spouseForeignDocType translates our enums to eqip specific enums
func spouseForeignDocType(docType string) string {
	alias := map[string]string{
		"FS240":                              "FS240or545",
		"DS1350":                             "DS1350",
		"AlienRegistration":                  "NaturalizedAlienRegistration",
		"PermanentResident":                  "NaturalizedPermanentResident",
		"CertificateOfNaturalization":        "NaturalizationCertificate",
		"DerivedAlienRegistration":           "DerivedAlienRegistration",
		"DerivedPermanentResident":           "DerivedPermanentResident",
		"DerivedCertificateOfNaturalization": "DerivedCitizenshipCertificate",
		"I-551":                              "NonCitizenI551",
		"I-766":                              "NonCitizenI766",
		"I-94":                               "NonCitizenI94",
		"Visa":                               "NonCitizenVisa",
		"NonImmigrantStudent":                "NonCitizenI20",
		"ExchangeVisitor":                    "NonCitizenDS2019",
		"Other":                              "Other",
	}
	return alias[docType]
}

func selfForeignDocType(docType string) string {
	alias := map[string]string{
		"I-94":      "I94",
		"U.S. Visa": "Visa",
		"I-20":      "I20",
		"DS-2019":   "DS2019",
		"Other":     "Other",
	}
	return alias[docType]
}

func selfAbroadDocType(docType string) string {
	alias := map[string]string{
		"FS-240":  "FS240",
		"DS-1350": "DS1350",
		"FS-545":  "FS545",
		"Other":   "Other",
	}
	return alias[docType]
}

// employmentType translates our enums to eqip specific enums
func employmentType(empType string) string {
	alias := map[string]string{
		"ActiveMilitary":    "ActiveMilitaryDuty",
		"NationalGuard":     "NationalGuard",
		"USPHS":             "USPHS",
		"OtherFederal":      "OtherFederal",
		"StateGovernment":   "State",
		"SelfEmployment":    "SelfEmployed",
		"Unemployment":      "Unemployed",
		"FederalContractor": "FederalContractor",
		"NonGovernment":     "NonGovernment",
		"Other":             "Other",
	}
	return alias[empType]
}

func militaryStatus(status string) string {
	alias := map[string]string{
		"ActiveDuty":      "Active",
		"ActiveReserve":   "ActiveReserve",
		"InactiveReserve": "InactiveReserve",
	}
	return alias[status]
}

// addressIn returns true if Location entity (Address) is in the specified country
func addressIn(location map[string]interface{}, country string) bool {
	props, ok := location["props"]
	if !ok {
		return false
	}

	c, ok := (props.(map[string]interface{}))["country"]
	if !ok {
		return false
	}

	if c == country {
		return true
	}

	return false
}

func citizenshipHas(data map[string]interface{}, country string) bool {
	props, ok := data["props"]
	if !ok {
		return false
	}

	items, ok := (props.(map[string]interface{}))["value"].([]interface{})
	if !ok {
		return false
	}

	if len(items) == 0 {
		return false
	}

	for _, item := range items {
		if item == country {
			return true
		}
	}

	return false
}

func daysInRange(v string) string {
	alias := map[string]string{
		"1-5":              "OneToFive",
		"6-10":             "SixToTen",
		"11-20":            "ElevenToTwenty",
		"21-30":            "TwentyoneToThirty",
		"More than 30":     "MoreThanThirty",
		"Many short trips": "ManyShortTrips",
	}
	return alias[v]
}

// Put attribute helpers here

func dateEstimated(data map[string]interface{}) string {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return ""
	}

	date := entity.(*api.DateControl)
	if date.Estimated {
		return "Estimated"
	}
	return ""
}

func notApplicable(data map[string]interface{}) string {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return ""
	}

	na := entity.(*api.NotApplicable)
	if na.Applicable {
		return "False"
	}
	return "True"
}

func telephoneNoNumber(data map[string]interface{}) string {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return ""
	}

	telephone := entity.(*api.Telephone)
	if telephone.NoNumber {
		return "True"
	}
	return "False"
}

func checkboxTrueFalse(data map[string]interface{}) string {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return ""
	}

	cb := entity.(*api.Checkbox)
	if cb.Checked {
		return "true"
	}
	return "false"
}

func unmarshalLocation(data map[string]interface{}) (*api.Location, error) {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return nil, err
	}

	location := entity.(*api.Location)
	return location, nil
}

func isDomestic(data map[string]interface{}) (bool, error) {
	location, err := unmarshalLocation(data)
	if err != nil {
		return false, err
	}
	return location.IsDomestic(), nil
}

func isInternational(data map[string]interface{}) (bool, error) {
	location, err := unmarshalLocation(data)
	if err != nil {
		return false, err
	}
	return location.IsInternational(), nil
}

func isPostOffice(data map[string]interface{}) (bool, error) {
	location, err := unmarshalLocation(data)
	if err != nil {
		return false, err
	}
	return location.IsPostOffice(), nil
}

func branchToBool(data map[string]interface{}) string {
	props, ok := data["props"]
	if ok {
		val, ok := (props.(map[string]interface{}))["value"]
		if ok && val == "Yes" {
			return "True"
		}
	}
	return "False"
}

func branchToAnswer(data map[string]interface{}) string {
	props, ok := data["props"]
	if ok {
		val, ok := (props.(map[string]interface{}))["value"]
		if ok && val == "Yes" {
			return "Yes"
		}
	}
	return "No"
}

func countryComments(data map[string]interface{}) string {
	props, ok := data["props"]
	if ok {
		comments, ok := (props.(map[string]interface{}))["comments"]
		if ok {
			return comments.(string)
		}
	}
	return ""
}

// Put "complex" XML structures here where they output from another template

func (service Service) telephone(data map[string]interface{}) (template.HTML, error) {
	return service.xmlTemplate("telephone.xml", data)
}

func (service Service) telephoneNoTimeOfDay(data map[string]interface{}) (template.HTML, error) {
	return service.xmlTemplate("telephone-no-time-of-day.xml", data)
}

func (service Service) name(data map[string]interface{}) (template.HTML, error) {
	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("name.xml", data, fmap)
}

func (service Service) nameLastFirst(data map[string]interface{}) (template.HTML, error) {
	return service.xmlTemplate("name-last-first.xml", data)
}

func (service Service) daterange(data map[string]interface{}) (template.HTML, error) {
	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("date-range.xml", data, fmap)
}

func (service Service) monthYearDaterange(data map[string]interface{}) (template.HTML, error) {
	fmap := service.templateFMap()
	fmap["date"] = service.monthYear // This is the only place where we swap out what the default list of functions uses.
	return service.xmlTemplateWithFuncs("date-range.xml", data, fmap)
}

func (service Service) dateOptional(d, dnk map[string]interface{}) (template.HTML, error) {
	view := make(map[string]interface{})
	view["Date"] = d
	view["DoNotKnow"] = dnk

	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("date-month-day-year-optional.xml", view, fmap)
}

func (service Service) date(data map[string]interface{}) (template.HTML, error) {
	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("date-month-day-year.xml", data, fmap)
}

func (service Service) monthYearOptional(d, dnk map[string]interface{}) (template.HTML, error) {
	view := make(map[string]interface{})
	view["Date"] = d
	view["DoNotKnow"] = dnk

	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("date-month-year-optional.xml", view, fmap)
}

func (service Service) monthYear(data map[string]interface{}) (template.HTML, error) {
	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("date-month-year.xml", data, fmap)
}

func (service Service) location(data map[string]interface{}) (template.HTML, error) {
	return service.locationOverrideLayout(data, "")
}

func (service Service) militaryAddress(data map[string]interface{}) (template.HTML, error) {
	return service.locationOverrideLayout(data, api.LayoutMilitaryAddress)
}

// location assumes the data comes in as the props
func (service Service) locationOverrideLayout(data map[string]interface{}, override string) (template.HTML, error) {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	// entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return template.HTML(""), err
	}

	location := entity.(*api.Location)
	domestic := location.IsDomestic()
	postoffice := location.IsPostOffice()

	// XXX
	// Work-around issue in UI where it does not
	// normalize case of state abbrevations. See:
	// https://github.com/18F/e-QIP-prototype/issues/716
	fmap := service.templateFMap()

	// XXX
	// Work-around issue in UI where it does not
	// collect the address in the correct layout. See:
	// https://github.com/18F/e-QIP-prototype/issues/755
	layout := location.Layout
	if override != "" {
		layout = override
	}

	switch layout {
	case api.LayoutOffense:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state-zipcode-county.xml", data, fmap)
		}

		return service.xmlTemplateWithFuncs("location-city-country.xml", data, fmap)
	case api.LayoutBirthPlace:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state-county.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutBirthPlaceNoUS:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state-county-no-country.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutBirthPlaceWithoutCounty:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutBirthPlaceWithoutCountyNoUS:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state-no-country.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutCountry:
		return service.xmlTemplate("location-country.xml", data)
	case api.LayoutUSCityStateInternationalCity:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutUSCityStateInternationalCityCountry:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutState:
		return service.xmlTemplateWithFuncs("location-state.xml", data, fmap)
	case api.LayoutCityState:
		return service.xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
	case api.LayoutStreetCityCountry:
		return service.xmlTemplate("location-street-city-country.xml", data)
	case api.LayoutCityCountry:
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutUSCityStateZipcodeInternationalCity:
		if domestic {
			return service.xmlTemplateWithFuncs("location-city-state-zipcode.xml", data, fmap)
		}
		return service.xmlTemplate("location-city-country.xml", data)
	case api.LayoutCityStateCountry:
		return service.xmlTemplateWithFuncs("location-city-state-country.xml", data, fmap)
	case api.LayoutUSAddress:
		return service.xmlTemplateWithFuncs("location-street-city-state-zipcode.xml", data, fmap)
	case api.LayoutStreetCity:
		return service.xmlTemplate("location-street-city.xml", data)
	case api.LayoutMilitaryAddress:
		return service.xmlTemplateWithFuncs("location-address-apofpo-state-zipcode.xml", data, fmap)
	case api.LayoutPhysicalDomestic:
		return service.xmlTemplateWithFuncs("location-physical-address-domestic.xml", data, fmap)
	case api.LayoutPhysicalInternational:
		return service.xmlTemplateWithFuncs("location-physical-address-international.xml", data, fmap)
	default:
		if domestic || postoffice {
			return service.xmlTemplateWithFuncs("location-street-city-state-zipcode.xml", data, fmap)
		}
		return service.xmlTemplate("location-street-city-country.xml", data)
	}
}

func (service Service) countryValue(data map[string]interface{}) (template.HTML, error) {
	return service.xmlTemplate("country.xml", data)
}

func (service Service) treatment(data map[string]interface{}) (template.HTML, error) {
	fmap := service.templateFMap()
	return service.xmlTemplateWithFuncs("treatment.xml", data, fmap)
}

func padDigits(digits string) string {
	if digits == "" {
		return ""
	}

	return fmt.Sprintf("%02s", digits)
}

func toUpper(state string) string {
	return strings.ToUpper(state)
}

func derivedBasis(v string) string {
	basis := map[string]string{
		"Individual": "ByOperationofLaw",
		"Other":      "Other",
	}
	return basis[v]
}

func naturalizedBasis(v string) string {
	basis := map[string]string{
		"Individual": "BasedOnMyOwnIndividualNaturalizationApplication",
		"Other":      "Other",
	}
	return basis[v]
}

func dischargeType(v string) string {
	basis := map[string]string{
		"Honorable":    "Honorable",
		"Dishonorable": "Dishonorable",
		"LessThan":     "OtherThanHonorable",
		"General":      "General",
		"BadConduct":   "BadConduct",
		"Other":        "Other",
	}
	return basis[v]
}

func frequencyType(v string) string {
	basis := map[string]string{
		"OneTime":    "Onetime",
		"Future":     "Future",
		"Continuing": "Continuing",
		"Other":      "Other",
	}
	return basis[v]
}

func severanceType(v string) string {
	basis := map[string]string{
		"Fired":       "Fired",
		"Quit":        "QuitKnowingWouldBeFired",
		"Charges":     "AllegedMisconduct",
		"Performance": "UnsatisfactoryPerformance",
	}
	return basis[v]
}

func agencyType(v string) string {
	basis := map[string]string{
		"U.S. Department of Defense":           "Defense",
		"U.S. Department of State":             "State",
		"U.S. Office of Personnel Management":  "OPM",
		"Federal Bureau of Investigation":      "FBI",
		"U.S. Department of Treasury":          "Treasury",
		"U.S. Department of Homeland Security": "HomelandSecurity",
		"Foreign government":                   "ForeignGovernment",
		"Other":                                "Other",
	}
	return basis[v]
}

func clearanceType(v string) string {
	basis := map[string]string{
		"None":                                "None",
		"Confidential":                        "Confidential",
		"Secret":                              "Secret",
		"Top Secret":                          "TopSecret",
		"Sensitive Compartmented Information": "SCI",
		"Q":                                   "Q",
		"L":                                   "L",
		"Issued by foreign country":           "Foreign",
		"Other":                               "Other",
	}
	return basis[v]
}

func hairType(v string) string {
	basis := map[string]string{
		"Bald":    "Bald",
		"Black":   "Black",
		"Blonde":  "Blonde or Strawberry",
		"Blue":    "Blue",
		"Brown":   "Brown",
		"Gray":    "Gray or Partially Gray",
		"Green":   "Green",
		"Orange":  "Orange",
		"Pink":    "Pink",
		"Purple":  "Purple",
		"Red":     "Red or Auburn",
		"Sandy":   "Sandy",
		"Unknown": "Unspecified or unknown",
		"White":   "White",
	}
	return basis[v]
}

func suffixType(s string) string {
	if s == "Other" {
		return "__Other__"
	}
	return s
}

func treatmentAnswerType(s string) string {
	if s == "Decline" {
		return "IDeclineToAnswer"
	}
	return s
}

// XXX
// Work-around for https://github.com/18F/e-QIP-prototype/issues/858
func drugType(d string) string {
	switch d {
	case "Cocaine", "THC", "Ketamine", "Narcotics", "Stimulants", "Depressants", "Hallucinogenic", "Steroids", "Inhalants":
		return d
	default:
		return "Other"
	}
}

// inc adds 1 to a
func inc(a interface{}) (interface{}, error) {
	return add(a, 1)
}

// add returns the sum of a and b.
// Snagged from https://github.com/hashicorp/consul-template/blob/de2ebf4/template_functions.go
func add(b, a interface{}) (interface{}, error) {
	av := reflect.ValueOf(a)
	bv := reflect.ValueOf(b)

	switch av.Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		switch bv.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			return av.Int() + bv.Int(), nil
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			return av.Int() + int64(bv.Uint()), nil
		case reflect.Float32, reflect.Float64:
			return float64(av.Int()) + bv.Float(), nil
		default:
			return nil, fmt.Errorf("add: unknown type for %q (%T)", bv, b)
		}
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		switch bv.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			return int64(av.Uint()) + bv.Int(), nil
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			return av.Uint() + bv.Uint(), nil
		case reflect.Float32, reflect.Float64:
			return float64(av.Uint()) + bv.Float(), nil
		default:
			return nil, fmt.Errorf("add: unknown type for %q (%T)", bv, b)
		}
	case reflect.Float32, reflect.Float64:
		switch bv.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			return av.Float() + float64(bv.Int()), nil
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			return av.Float() + float64(bv.Uint()), nil
		case reflect.Float32, reflect.Float64:
			return av.Float() + bv.Float(), nil
		default:
			return nil, fmt.Errorf("add: unknown type for %q (%T)", bv, b)
		}
	default:
		return nil, fmt.Errorf("add: unknown type for %q (%T)", av, a)
	}
}
