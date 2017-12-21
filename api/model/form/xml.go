package form

import (
	"bytes"
	"encoding/json"
	"html/template"
	"path"
	"strings"

	"github.com/18F/e-QIP-prototype/api/logmsg"
)

var (
	// fmap is a mapping of functions to be used within the XML template execution.
	// These can be helper functions for formatting or even to process complex structure
	// types.
	DefaultFuncMap = template.FuncMap{
		"branch":            branch,
		"text":              text,
		"textarea":          textarea,
		"number":            number,
		"location":          location,
		"date":              date,
		"daterange":         daterange,
		"monthYear":         monthYear,
		"dateEstimated":     dateEstimated,
		"notApplicable":     notApplicable,
		"telephone":         telephone,
		"name":              name,
		"radio":             radio,
		"checkbox":          checkbox,
		"checkboxHas":       checkboxHas,
		"checkboxTrueFalse": checkboxTrueFalse,
	}

	fattrmap = template.FuncMap{}
)

func xmlTemplate(name string, data map[string]interface{}) template.HTML {
	log := logmsg.NewLogger()

	path := path.Join("templates", name)
	tmpl := template.Must(template.New(name).ParseFiles(path))

	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		log.WithError(err).WithField("name", name).Warn("Failed to execute XML template")
	}
	return template.HTML(output.String())
}

// xmlTemplateWithFuncs executes an XML template with mapped functions to be used with the
// given entity.
func xmlTemplateWithFuncs(name string, data map[string]interface{}, fmap template.FuncMap) template.HTML {
	log := logmsg.NewLogger()

	path := path.Join("templates", name)
	tmpl := template.Must(template.New(name).Funcs(fmap).ParseFiles(path))

	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		log.WithError(err).WithField("name", name).Warn("Failed to execute XML template")
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
		values := (props.(map[string]interface{}))["values"].([]interface{})
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
		values := (props.(map[string]interface{}))["values"].([]interface{})
		for _, s := range values {
			if s == target {
				return "True"
			}
		}
	}
	return "False"
}

// Put attribute helpers here

func dateEstimated(data map[string]interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).WithField("funcMap", "dateEstimated").Warn(logmsg.PayloadEntityError)
		return ""
	}

	date := entity.(*DateControl)
	if date.Estimated {
		return "Estimated"
	}
	return ""
}

func notApplicable(data map[string]interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).WithField("funcMap", "notApplicable").Warn(logmsg.PayloadEntityError)
		return ""
	}

	na := entity.(*NotApplicable)
	if na.Applicable {
		return "False"
	}
	return "True"
}

func checkboxTrueFalse(data map[string]interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).WithField("funcMap", "checkboxTrueFalse").Warn(logmsg.PayloadEntityError)
		return ""
	}

	cb := entity.(*Checkbox)
	if cb.Checked {
		return "true"
	}
	return "false"
}

// Put "complex" XML structures here where they output from another template

func telephone(data map[string]interface{}) template.HTML {
	return xmlTemplate("telephone.xml", data)
}

func name(data map[string]interface{}) template.HTML {
	return xmlTemplate("name.xml", data)
}

func daterange(data map[string]interface{}) template.HTML {
	fmap := template.FuncMap{
		"date":          date,
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
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	// entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).WithField("funcMap", "location").Warn(logmsg.PayloadEntityError)
		return template.HTML("")
	}

	location := entity.(*Location)
	domestic := location.IsDomestic()
	postoffice := location.IsPostOffice()

	switch location.Layout {
	case LayoutBirthPlace:
		if domestic {
			return xmlTemplate("location-city-state-county.xml", data)
		}
		return xmlTemplate("location-city-county.xml", data)
	case LayoutBirthPlaceWithoutCounty:
		if domestic {
			return xmlTemplate("location-city-state.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case LayoutCountry:
		return xmlTemplate("location-country.xml", data)
	case LayoutUSCityStateInternationalCity:
		if domestic {
			return xmlTemplate("location-city-state.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case LayoutUSCityStateInternationalCityCountry:
		if domestic {
			return xmlTemplate("location-city-state.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case LayoutCityState:
		return xmlTemplate("location-city-state.xml", data)
	case LayoutStreetCityCountry:
		return xmlTemplate("location-street-city-country.xml", data)
	case LayoutCityCountry:
		return xmlTemplate("location-city-country.xml", data)
	case LayoutUSCityStateZipcodeInternationalCity:
		if domestic {
			return xmlTemplate("location-city-state-zipcode.xml", data)
		}
		return xmlTemplate("location-city-country.xml", data)
	case LayoutCityStateCountry:
		return xmlTemplate("location-city-state-country.xml", data)
	case LayoutUSAddress:
		return xmlTemplate("location-street-city-state-zipcode.xml", data)
	case LayoutStreetCity:
		return xmlTemplate("location-street-city.xml", data)
	default:
		if domestic || postoffice {
			return xmlTemplate("location-street-city-state-zipcode.xml", data)
		}
		return xmlTemplate("location-street-city-country.xml", data)
	}
}
