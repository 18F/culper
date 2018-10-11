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

	"github.com/18F/e-QIP-prototype/api"
	"github.com/benbjohnson/clock"
)

// Service is an implementation of handling XML.
type Service struct {
	Log   api.LogService
	Clock clock.Clock
}

// DefaultTemplate returns a template given data.
func (service Service) DefaultTemplate(templateName string, data map[string]interface{}) (template.HTML, error) {

	// now returns the server's local time in yyyy-MM-dd
	now := func() string {
		t := service.Clock.Now()
		return fmt.Sprintf("%d-%02d-%02d", t.Year(), t.Month(), t.Day())
	}

	// fmap is a mapping of functions to be used within the XML template execution.
	// These can be helper functions for formatting or even to process complex structure
	// types.
	fmap := template.FuncMap{
		"addressIn":              addressIn,
		"agencyType":             agencyType,
		"branch":                 branch,
		"branchToAnswer":         branchToAnswer,
		"branchToBool":           branchToBool,
		"branchcollectionHas":    branchcollectionHas,
		"branchAny":              branchAny,
		"checkbox":               checkbox,
		"checkboxHas":            checkboxHas,
		"checkboxTrueFalse":      checkboxTrueFalse,
		"citizenshipStatus":      citizenshipStatus,
		"country":                countryValue,
		"countryComments":        countryComments,
		"citizenshipHas":         citizenshipHas,
		"clearanceType":          clearanceType,
		"date":                   date,
		"dateEstimated":          dateEstimated,
		"daterange":              daterange,
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
		"foreignDocType":         foreignDocType,
		"foreignAffiliation":     foreignAffiliation,
		"frequencyType":          frequencyType,
		"monthYearDaterange":     monthYearDaterange,
		"email":                  email,
		"employmentType":         employmentType,
		"hairType":               hairType,
		"hasRelativeType":        hasRelativeType,
		"inc":                    inc,
		"location":               location,
		"locationIsPostOffice":   locationIsPostOffice,
		"locationOverrideLayout": locationOverrideLayout,
		"militaryAddress":        militaryAddress,
		"militaryStatus":         militaryStatus,
		"monthYear":              monthYear,
		"name":                   name,
		"nameLastFirst":          nameLastFirst,
		"notApplicable":          notApplicable,
		"now":                    now,
		"number":                 number,
		"padDigits":              padDigits,
		"radio":                  radio,
		"schoolType":             schoolType,
		"severanceType":          severanceType,
		"suffixType":             suffixType,
		"relationshipType":       relationshipType,
		"relativeForeignDocType": relativeForeignDocType,
		"telephone":              telephone,
		"telephoneNoNumber":      telephoneNoNumber,
		"telephoneNoTimeOfDay":   telephoneNoTimeOfDay,
		"text":                   text,
		"textarea":               textarea,
		"toUpper":                toUpper,
		"treatment":              treatment,
		"treatmentAnswerType":    treatmentAnswerType,
		"tmpl":                   service.DefaultTemplate,
	}
	return xmlTemplateWithFuncs(templateName, data, fmap)
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

func xmlTemplate(name string, data map[string]interface{}) (template.HTML, error) {
	path := path.Join("templates", name)
	tmpl := template.Must(template.New(name).ParseFiles(path))
	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		return template.HTML(""), err
	}
	return template.HTML(applyBulkFixes(output.String())), nil
}

// xmlTemplateWithFuncs executes an XML template with mapped functions to be used with the
// given entity.
func xmlTemplateWithFuncs(name string, data map[string]interface{}, fmap template.FuncMap) (template.HTML, error) {
	path := path.Join("templates", name)
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

// foreignDocType translates our enums to eqip specific enums
func foreignDocType(docType string) string {
	alias := map[string]string{
		"FS240":                              "FS240or545",
		"DS1350":                             "DS1350",
		"AlienRegistration":                  "NaturalizedAlienRegistration",
		"PermanentResident":                  "NaturalizedPermanentResident",
		"CertificateOfNaturalization":        "NaturalizationCertificate",
		"DerivedAlienRegistration":           "DerivedAlienRegistration",
		"DerivedPermanentResident":           "DerivedPermanentResident",
		"DerivedCertificateOfNaturalization": "DerivedCitizenshipCertificate",
		"I-551":               "NonCitizenI551",
		"I-766":               "NonCitizenI766",
		"I-94":                "NonCitizenI94",
		"Visa":                "NonCitizenVisa",
		"NonImmigrantStudent": "NonCitizenI20",
		"ExchangeVisitor":     "NonCitizenDS2019",
		"Other":               "Other",
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

func locationIsPostOffice(data map[string]interface{}) string {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return ""
	}

	location := entity.(*api.Location)
	if location.IsPostOffice() {
		return "True"
	}
	return ""
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

func telephone(data map[string]interface{}) (template.HTML, error) {
	return xmlTemplate("telephone.xml", data)
}

func telephoneNoTimeOfDay(data map[string]interface{}) (template.HTML, error) {
	return xmlTemplate("telephone-no-time-of-day.xml", data)
}

func name(data map[string]interface{}) (template.HTML, error) {
	fmap := template.FuncMap{
		"suffixType": suffixType,
	}
	return xmlTemplateWithFuncs("name.xml", data, fmap)
}

func nameLastFirst(data map[string]interface{}) (template.HTML, error) {
	return xmlTemplate("name-last-first.xml", data)
}

func daterange(data map[string]interface{}) (template.HTML, error) {
	fmap := template.FuncMap{
		"date":          date,
		"dateEstimated": dateEstimated,
	}
	return xmlTemplateWithFuncs("date-range.xml", data, fmap)
}

func monthYearDaterange(data map[string]interface{}) (template.HTML, error) {
	fmap := template.FuncMap{
		"date":          monthYear,
		"dateEstimated": dateEstimated,
	}
	return xmlTemplateWithFuncs("date-range.xml", data, fmap)
}

func date(data map[string]interface{}) (template.HTML, error) {
	fmap := template.FuncMap{
		"padDigits": padDigits,
	}
	return xmlTemplateWithFuncs("date-month-day-year.xml", data, fmap)
}

func monthYear(data map[string]interface{}) (template.HTML, error) {
	fmap := template.FuncMap{
		"padDigits": padDigits,
	}
	return xmlTemplateWithFuncs("date-month-year.xml", data, fmap)
}

func location(data map[string]interface{}) (template.HTML, error) {
	return locationOverrideLayout(data, "")
}

func militaryAddress(data map[string]interface{}) (template.HTML, error) {
	return locationOverrideLayout(data, api.LayoutMilitaryAddress)
}

// location assumes the data comes in as the props
func locationOverrideLayout(data map[string]interface{}, override string) (template.HTML, error) {
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
	fmap := template.FuncMap{
		"toUpper": toUpper,
	}

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
			return xmlTemplateWithFuncs("location-city-state-zipcode-country.xml", data, fmap)
		}

		return xmlTemplateWithFuncs("location-city-country.xml", data, fmap)
	case api.LayoutBirthPlace:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state-county.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutBirthPlaceNoUS:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state-county-no-country.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutBirthPlaceWithoutCounty:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutBirthPlaceWithoutCountyNoUS:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state-no-country.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutCountry:
		return xmlTemplate("location-country.xml", data)
	case api.LayoutUSCityStateInternationalCity:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutUSCityStateInternationalCityCountry:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutState:
		return xmlTemplateWithFuncs("location-state.xml", data, fmap)
	case api.LayoutCityState:
		return xmlTemplateWithFuncs("location-city-state.xml", data, fmap)
	case api.LayoutStreetCityCountry:
		return xmlTemplate("location-street-city-country.xml", data)
	case api.LayoutCityCountry:
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutUSCityStateZipcodeInternationalCity:
		if domestic {
			return xmlTemplateWithFuncs("location-city-state-zipcode.xml", data, fmap)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutCityStateCountry:
		return xmlTemplateWithFuncs("location-city-state-country.xml", data, fmap)
	case api.LayoutUSAddress:
		return xmlTemplateWithFuncs("location-street-city-state-zipcode.xml", data, fmap)
	case api.LayoutStreetCity:
		return xmlTemplate("location-street-city.xml", data)
	case api.LayoutMilitaryAddress:
		return xmlTemplateWithFuncs("location-address-apofpo-state-zipcode.xml", data, fmap)
	default:
		if domestic || postoffice {
			return xmlTemplateWithFuncs("location-street-city-state-zipcode.xml", data, fmap)
		}
		return xmlTemplate("location-street-city-country.xml", data)
	}
}

func countryValue(data map[string]interface{}) (template.HTML, error) {
	return xmlTemplate("country.xml", data)
}

func treatment(data map[string]interface{}) (template.HTML, error) {
	fmap := template.FuncMap{
		"text":      text,
		"telephone": telephone,
		"location":  location,
	}
	return xmlTemplateWithFuncs("treatment.xml", data, fmap)
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
		"Confidential":                        "Confidential",
		"Secret":                              "Secret",
		"Top Secret":                          "TopSecret",
		"Sensitive Compartmented Information": "SCI",
		"Q": "Q",
		"L": "L",
		"Issued by foreign country": "Foreign",
		"Other":                     "Other",
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
