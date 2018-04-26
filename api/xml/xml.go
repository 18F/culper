package xml

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"path"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

type XmlService struct {
	Log api.LogService
}

func (service XmlService) DefaultTemplate(templateName string, data map[string]interface{}) template.HTML {
	// fmap is a mapping of functions to be used within the XML template execution.
	// These can be helper functions for formatting or even to process complex structure
	// types.
	fmap := template.FuncMap{
		"branch":               branch,
		"branchToBool":         branchToBool,
		"branchcollectionHas":  branchcollectionHas,
		"branchAny":            branchAny,
		"checkbox":             checkbox,
		"checkboxHas":          checkboxHas,
		"checkboxTrueFalse":    checkboxTrueFalse,
		"citizenshipStatus":    citizenshipStatus,
		"country":              countryValue,
		"countryComments":      countryComments,
		"citizenshipHas":       citizenshipHas,
		"date":                 date,
		"dateEstimated":        dateEstimated,
		"daterange":            daterange,
		"daysInRange":          daysInRange,
		"degreeType":           degreeType,
		"diagnosisType":        diagnosisType,
		"foreignDocType":       foreignDocType,
		"monthYearDaterange":   monthYearDaterange,
		"email":                email,
		"employmentType":       employmentType,
		"hasRelativeType":      hasRelativeType,
		"location":             location,
		"locationIsPostOffice": locationIsPostOffice,
		"monthYear":            monthYear,
		"name":                 name,
		"nameLastFirst":        nameLastFirst,
		"notApplicable":        notApplicable,
		"number":               number,
		"radio":                radio,
		"schoolType":           schoolType,
		"relationshipType":     relationshipType,
		"telephone":            telephone,
		"telephoneNoNumber":    telephoneNoNumber,
		"text":                 text,
		"textarea":             textarea,
		"treatment":            treatment,
		"tmpl":                 service.DefaultTemplate,
	}
	return xmlTemplateWithFuncs(templateName, data, fmap)
}

func xmlTemplate(name string, data map[string]interface{}) template.HTML {
	path := path.Join("templates", name)
	tmpl := template.Must(template.New(name).ParseFiles(path))
	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		// service.Log.WarnError("Failed to execute XML template", err, api.LogFields{"name": name})
		return template.HTML("")
	}
	return template.HTML(output.String())
}

// xmlTemplateWithFuncs executes an XML template with mapped functions to be used with the
// given entity.
func xmlTemplateWithFuncs(name string, data map[string]interface{}, fmap template.FuncMap) template.HTML {
	path := path.Join("templates", name)
	tmpl := template.Must(template.New(name).Funcs(fmap).ParseFiles(path))
	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		// service.Log.WarnError("Failed to execute XML template", err, api.LogFields{"name": name})
		return template.HTML("")
	}
	return template.HTML(output.String())
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
		"Mother":       "01",
		"Father":       "02",
		"Stepmother":   "03",
		"Stepfather":   "04",
		"FosterParent": "05",
		"Child":        "06",
		"Stepchild":    "07",
		"Brother":      "08",
		"Sister":       "09",
		"Stepbrother":  "10",
		"Stepsister":   "11",
		"HalfBrother":  "12",
		"HalfSister":   "13",
		"FatherInLaw":  "14",
		"MotherInLaw":  "15",
		"Guardian":     "16",
	}
	return fmt.Sprintf("%s%s", types[str], str)
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
	// entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
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
	val, ok := data["value"]
	if ok && val == "Yes" {
		return "True"
	}
	return "False"
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

func telephone(data map[string]interface{}) template.HTML {
	return xmlTemplate("telephone.xml", data)
}

func name(data map[string]interface{}) template.HTML {
	return xmlTemplate("name.xml", data)
}

func nameLastFirst(data map[string]interface{}) template.HTML {
	return xmlTemplate("name-last-first.xml", data)
}

func daterange(data map[string]interface{}) template.HTML {
	fmap := template.FuncMap{
		"date":          date,
		"dateEstimated": dateEstimated,
	}
	return xmlTemplateWithFuncs("date-range.xml", data, fmap)
}

func monthYearDaterange(data map[string]interface{}) template.HTML {
	fmap := template.FuncMap{
		"date":          monthYear,
		"dateEstimated": dateEstimated,
	}
	return xmlTemplateWithFuncs("date-range.xml", data, fmap)
}

func date(data map[string]interface{}) template.HTML {
	return xmlTemplate("date-month-day-year.xml", data)
}

func monthYear(data map[string]interface{}) template.HTML {
	return xmlTemplate("date-month-year.xml", data)
}

// location assumes the data comes in as the props
func location(data map[string]interface{}) template.HTML {
	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	// entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		return template.HTML("")
	}

	location := entity.(*api.Location)
	domestic := location.IsDomestic()
	postoffice := location.IsPostOffice()

	switch location.Layout {
	case api.LayoutBirthPlace:
		if domestic {
			return xmlTemplate("location-city-state-county.xml", data)
		}
		return xmlTemplate("location-city-county.xml", data)
	case api.LayoutBirthPlaceWithoutCounty:
		if domestic {
			return xmlTemplate("location-city-state.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutCountry:
		return xmlTemplate("location-country.xml", data)
	case api.LayoutUSCityStateInternationalCity:
		if domestic {
			return xmlTemplate("location-city-state.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutUSCityStateInternationalCityCountry:
		if domestic {
			return xmlTemplate("location-city-state.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutCityState:
		return xmlTemplate("location-city-state.xml", data)
	case api.LayoutStreetCityCountry:
		return xmlTemplate("location-street-city-country.xml", data)
	case api.LayoutCityCountry:
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutUSCityStateZipcodeInternationalCity:
		if domestic {
			return xmlTemplate("location-city-state-zipcode.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case api.LayoutCityStateCountry:
		return xmlTemplate("location-city-state-country.xml", data)
	case api.LayoutUSAddress:
		return xmlTemplate("location-street-city-state-zipcode.xml", data)
	case api.LayoutStreetCity:
		return xmlTemplate("location-street-city.xml", data)
	default:
		if domestic || postoffice {
			return xmlTemplate("location-street-city-state-zipcode.xml", data)
		}
		return xmlTemplate("location-street-city-country.xml", data)
	}
}

func countryValue(data map[string]interface{}) template.HTML {
	return xmlTemplate("country.xml", data)
}

func treatment(data map[string]interface{}) template.HTML {
	fmap := template.FuncMap{
		"text":      text,
		"telephone": telephone,
		"location":  location,
	}
	return xmlTemplateWithFuncs("treatment.xml", data, fmap)
}
