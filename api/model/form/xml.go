package form

import (
	"bytes"
	"encoding/gob"
	"fmt"
	"html/template"
	"path"

	"github.com/18F/e-QIP-prototype/api/logmsg"
)

var (
	// fmap is a mapping of functions to be used within the XML template execution.
	// These can be helper functions for formatting or even to process complex structure
	// types.
	fmap = template.FuncMap{
		"branch":            branch,
		"text":              text,
		"number":            number,
		"location":          location,
		"monthYear":         monthYear,
		"dateEstimated":     dateEstimated,
		"notApplicable":     notApplicable,
		"name":              name,
		"radio":             radio,
		"checkboxTrueFalse": checkboxTrueFalse,
	}
)

// xmlTemplateWithFuncs executes an XML template with mapped functions to be used with the
// given entity.
func xmlTemplateWithFuncs(name string, data map[string]interface{}) []byte {
	log := logmsg.NewLogger()

	path := path.Join("templates", name)
	tmpl := template.Must(template.New(name).Funcs(fmap).ParseFiles(path))

	var output bytes.Buffer
	if err := tmpl.Execute(&output, data); err != nil {
		log.WithError(err).WithField("name", name).Warn("Failed to execute XML template")
	}
	return output.Bytes()
}

func getInterfaceAsBytes(anon interface{}) []byte {
	var buf bytes.Buffer
	enc := gob.NewEncoder(&buf)
	if err := enc.Encode(anon); err != nil {
		return nil
	}
	return buf.Bytes()
}

func branch(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	branch := entity.(*Branch)
	return branch.Value
}

func text(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	text := entity.(*Text)
	return text.Value
}

func number(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	number := entity.(*Text)
	return number.Value
}

func location(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	location := entity.(*Location)
	domestic := location.IsDomestic()
	postoffice := location.IsPostOffice()

	switch location.Layout {
	case LayoutBirthPlace:
		if domestic {
			return fmt.Sprintf("<City>%s</City><State>%s</State><County>%s</County>", location.City, location.State, location.County)
		}
		return fmt.Sprintf("<City>%s</City><County>%s</County>", location.City, location.County)
	case LayoutBirthPlaceWithoutCounty:
		if domestic {
			return fmt.Sprintf("<City>%s</City><State>%s</State>", location.City, location.State)
		}
		return fmt.Sprintf("<City>%s</City><County>%s</County>", location.City, location.County)
	case LayoutCountry:
		return fmt.Sprintf("<Country>%s</Country>", location.Country)
	case LayoutUSCityStateInternationalCity:
		if domestic {
			return fmt.Sprintf("<City>%s</City><State>%s</State>", location.City, location.State)
		}
		return fmt.Sprintf("<City>%s</City><Country>%s</Country>", location.City, location.Country)
	case LayoutUSCityStateInternationalCityCountry:
		if domestic {
			return fmt.Sprintf("<City>%s</City><State>%s</State>", location.City, location.State)
		}
		return fmt.Sprintf("<City>%s</City><Country>%s</Country>", location.City, location.Country)
	case LayoutCityState:
		return fmt.Sprintf("<City>%s</City><State>%s</State>", location.City, location.State)
	case LayoutStreetCityCountry:
		return fmt.Sprintf("<Street>%s</Street><City>%s</City><Country>%s</Country>", location.Street1, location.City, location.Country)
	case LayoutCityCountry:
		return fmt.Sprintf("<City>%s</City><Country>%s</Country>", location.City, location.Country)
	case LayoutUSCityStateZipcodeInternationalCity:
		if domestic {
			return fmt.Sprintf("<City>%s</City><State>%s</State><ZipCode>%s</ZipCode>", location.City, location.State, location.Zipcode)
		}
		return fmt.Sprintf("<City>%s</City><Country>%s</Country>", location.City, location.Country)
	case LayoutCityStateCountry:
		return fmt.Sprintf("<City>%s</City><State>%s</State><Country>%s</Country>", location.City, location.State, location.Country)
	case LayoutUSAddress:
		return fmt.Sprintf("<Street>%s</Street><City>%s</City><State>%s</State><ZipCode>%s</ZipCode>", location.Street1, location.City, location.State, location.Zipcode)
	case LayoutStreetCity:
		return fmt.Sprintf("<Street>%s</Street><City>%s</City>", location.Street1, location.City)
	default:
		if domestic || postoffice {
			return fmt.Sprintf("<Street>%s</Street><City>%s</City><State>%s</State><ZipCode>%s</ZipCode>", location.Street1, location.City, location.State, location.Zipcode)
		}
		return fmt.Sprintf("<Street>%s</Street><City>%s</City><Country>%s</Country>", location.Street1, location.City, location.Country)
	}
}

func monthYear(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	date := entity.(*DateControl)
	return fmt.Sprintf("<Month>%s</Month><Year>%s</Year>", date.Month, date.Year)
}

func dateEstimated(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	date := entity.(*DateControl)
	if date.Estimated {
		return "Estimated"
	}
	return ""
}

func notApplicable(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	na := entity.(*NotApplicable)
	if na.Applicable {
		return "False"
	}
	return "True"
}

func name(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	name := entity.(*Name)
	tmpl := "<Last>%s</Last><First Type=\"IO\">%s</First><Middle Type=\"NMN\">%s</Middle><Suffix>%s</Suffix><Suffix_Other>%s</Suffix_Other>"
	return fmt.Sprintf(tmpl, name.Last, name.First, name.Middle, name.Suffix, name.SuffixOther)
}

func radio(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	radio := entity.(*Radio)
	return radio.Value
}

func checkboxTrueFalse(data interface{}) string {
	log := logmsg.NewLogger()

	// Deserialize the initial payload from a JSON structure
	payload := &Payload{}
	entity, err := payload.UnmarshalEntity(getInterfaceAsBytes(data))
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEntityError)
		return ""
	}

	cb := entity.(*Checkbox)
	if cb.Checked {
		return "true"
	}
	return "false"
}
