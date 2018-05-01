package main

import (
	"encoding/json"
	"math/rand"
	"time"

	"github.com/18F/e-QIP-prototype/api"
)

type Map map[string]json.RawMessage
type Array []json.RawMessage

type Fuzzer struct {
	r         *rand.Rand
	errorRate float64
}

func NewFuzzer() Fuzzer {
	s := rand.NewSource(time.Now().UnixNano())
	r := rand.New(s)
	return Fuzzer{
		r: r,
	}
}

func (fuzzer *Fuzzer) ErrorRate(rate float64) {
	fuzzer.errorRate = rate
}

func (fuzzer Fuzzer) WalkJSON(raw json.RawMessage) json.RawMessage {
	if raw[0] == 123 {
		var content Map
		json.Unmarshal(raw, &content)
		for k, v := range content {
			if mutable(v) {
				content[k] = fuzzer.Mutate(v)
			} else {
				// Continue walking the JSON if it cannot be fuzzed
				content[k] = fuzzer.WalkJSON(v)
			}
		}
		raw = js(content)
	} else if raw[0] == 91 {
		var content Array
		json.Unmarshal(raw, &content)
		for i, v := range content {
			if mutable(v) {
				content[i] = fuzzer.Mutate(v)
			} else {
				// Continue walking the JSON if it cannot be fuzzed
				content[i] = fuzzer.WalkJSON(v)
			}
		}
		raw = js(content)
	} else {
		// NOTE: If we care about primitives then uncomment the following.
		// var val interface{}
		// json.Unmarshal(raw, &val)
		// switch v := val.(type) {
		// case float64:
		// case string:
		// case bool:
		// case nil:
		// default:
		// }
	}
	return raw
}

func (fuzzer Fuzzer) Mutate(raw json.RawMessage) json.RawMessage {
	payload := &api.Payload{}
	if err := payload.Unmarshal(raw); err != nil {
		return raw
	}

	// If there is a fuzzer defined for this type of payload then
	// we will execute and return the results from it.
	f, ok := fuzzers[payload.Type]
	if !ok {
		return raw
	}

	err := f(payload, fuzzer.errorRate, fuzzer.r)
	if err != nil {
		return raw
	}

	js, _ := json.Marshal(payload)
	return js
}

func mutable(raw json.RawMessage) bool {
	payload := &api.Payload{}
	if err := payload.Unmarshal(raw); err != nil {
		return false
	}

	_, ok := fuzzers[payload.Type]
	return ok
}

func js(val interface{}) json.RawMessage {
	marshalled, _ := json.Marshal(val)
	return marshalled
}

var fuzzers = map[string]func(payload *api.Payload, errorRate float64, r *rand.Rand) error{
	"branch":             fuzzBranch,
	"checkbox":           fuzzCheckbox,
	"checkboxgroup":      fuzzCheckboxGroup,
	"country":            fuzzCountry,
	"datecontrol":        fuzzDateControl,
	"email":              fuzzEmail,
	"employmentactivity": fuzzEmploymentActivity,
	"height":             fuzzHeight,
	"location":           fuzzLocation,
	"name":               fuzzName,
	"notapplicable":      fuzzNotApplicable,
	"number":             fuzzNumber,
	"radio":              fuzzRadio,
	"ssn":                fuzzSSN,
	"telephone":          fuzzTelephone,
	"text":               fuzzText,
	"textarea":           fuzzTextarea,
}

func fuzzBranch(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Branch{}
	if randomBool(r) {
		props.Value = "Yes"
	} else {
		props.Value = "No"
	}
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzCheckbox(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Checkbox{}
	if randomBool(r) {
		props.Value = "Checked"
		props.Checked = true
	} else {
		props.Value = "Unchecked"
		props.Checked = false
	}
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzCheckboxGroup(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.CheckboxGroup{}
	props.Values = []string{"One", "Two"}
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzCountry(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Country{}
	props.Value = []string{"United States"}
	props.Comments = ""
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzDateControl(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.DateControl{}
	props.Month = "1"
	props.Day = "1"
	props.Year = "2000"
	props.Estimated = randomBool(r)
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzEmail(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Email{}
	props.Value = "john.doe@dummy.gov"
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzEmploymentActivity(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.EmploymentActivity{}
	props.Value = "Other"
	props.OtherExplanation = "IDK"
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzHeight(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Height{}
	props.Feet = 6
	props.Inches = 11
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzLocation(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Location{}
	props.Layout = api.LayoutAddress
	props.Street1 = "123 main st"
	props.City = "springfield"
	props.State = "il"
	props.Zipcode = "12345"
	props.Country = "United States"
	props.Validated = true
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzName(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Name{}
	props.First = "John"
	props.FirstInitialOnly = false
	props.Middle = "Smith"
	props.MiddleInitialOnly = false
	props.NoMiddleName = false
	props.Last = "Doe"
	props.LastInitialOnly = false
	props.Suffix = ""
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzNotApplicable(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.NotApplicable{}
	props.Applicable = false
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzNumber(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Number{}
	props.Value = "1000"
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzRadio(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Radio{}
	props.Value = "Radio1"
	props.Checked = true
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzSSN(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.SSN{}
	props.First = "123"
	props.Middle = "12"
	props.Last = "123"
	props.NotApplicable = false
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzTelephone(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Telephone{}
	props.TimeOfDay = "Morning"
	props.Type = "Domestic"
	props.NumberType = "Cell"
	props.Number = "123-123-1234"
	props.Extension = ""
	props.NoNumber = false
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzText(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Text{}
	props.Value = randomString(r, 20)
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func fuzzTextarea(payload *api.Payload, errorRate float64, r *rand.Rand) error {
	if payload == nil {
		return nil
	}

	props := &api.Textarea{}
	props.Value = randomString(r, 255)
	js, _ := json.Marshal(props)
	payload.Props = js
	return nil
}

func randomBool(r *rand.Rand) bool {
	if r.Int()&1 == 1 {
		return true
	}
	return false
}

type charRange struct {
	first, last rune
}

func (r *charRange) choose(rand *rand.Rand) rune {
	count := int64(r.last - r.first)
	return r.first + rune(rand.Int63n(count))
}

var unicodeRanges = []charRange{
	{' ', '~'},
	// {'\u00a0', '\u02af'},
	// {'\u4e00', '\u9fff'},
}

func randomString(r *rand.Rand, maxLength int) string {
	n := r.Intn(maxLength)
	runes := make([]rune, n)
	for i := range runes {
		runes[i] = unicodeRanges[r.Intn(len(unicodeRanges))].choose(r)
	}
	return string(runes)
}

func randomInt(r *rand.Rand) int {
	return int(r.Uint32())<<32 | int(r.Uint32())
}
