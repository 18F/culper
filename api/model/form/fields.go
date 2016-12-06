package form

import (
	"fmt"
	"net/mail"
	"regexp"
	"strings"
	"time"
)

// TextField is a generic container for required text
type TextField string

// Valid validates a TextField
func (t TextField) Valid() (bool, error) {
	if strings.TrimSpace(string(t)) == "" {
		return false, ErrFieldRequired{"TextField is required"}
	}
	return true, nil
}

// EmailField contains a properly formatted email
type EmailField string

func (e EmailField) Valid() (bool, error) {
	if _, err := mail.ParseAddress(string(e)); err != nil {
		return false, ErrFieldInvalid{"Invalid email"}
	}
	return true, nil
}

// URLField contains a properly formatted URL
type URLField string

func (e URLField) Valid() (bool, error) {
	return true, nil
}

// DateField stores date information by month, day and year. It also
// contains a flag to indicate if the date is estimated
type DateField struct {
	Month     int64
	Day       int64
	Year      int64
	Estimated bool
}

// Valid determines if field is valid
// TODO Figure out exactly how estimated affects overall validation
func (d DateField) Valid() (bool, error) {
	var stack ErrorStack

	if d.Month < 1 || d.Month > 12 {
		stack.Append("Month", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid month", d.Month)})
	}

	if d.Day < 1 || d.Day > 31 {
		stack.Append("Day", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid day", d.Month)})
	}

	if d.Year < 1900 {
		stack.Append("Year", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid year", d.Month)})
	}

	return !stack.HasErrors(), stack
}

// MonthYearField is a subset of the DateField
type MonthYearField struct {
	Month     int64
	Year      int64
	Estimated bool
}

func (d MonthYearField) Valid() (bool, error) {
	return true, nil
}

// Time creates a time.Time based off of the values entered
// TODO this will be affected by how estimated is calculated
func (d DateField) Time() (time.Time, error) {
	if ok, err := d.Valid(); !ok {
		return time.Time{}, err
	}

	formatted := fmt.Sprintf("%v/%v/%v", d.Month, d.Day, d.Year)
	return time.Parse("1/2/2006", formatted)
}

// SSNField stores a persons social security number
// https://www.ssa.gov/employer/randomization.html
type SSNField struct {
	First         string
	Middle        string
	Last          string
	NotApplicable bool
}

// Valid validates the format of a Social Security Number if it is applicable
func (s SSNField) Valid() (bool, error) {
	if s.NotApplicable {
		return true, nil
	}

	var stack ErrorStack
	if s.First == "" {
		stack.Append("First", ErrFieldRequired{"First is a required field"})
	} else {
		if ok, _ := regexp.MatchString("^\\d{3}$", s.First); !ok {
			stack.Append("First", ErrFieldInvalid{fmt.Sprintf("`%s` is an invalid First value", s.First)})
		}
	}

	if s.Middle == "" {
		stack.Append("Middle", ErrFieldRequired{"Middle is a required field"})
	} else {
		if ok, _ := regexp.MatchString("^\\d{2}$", s.First); !ok {
			stack.Append("Middle", ErrFieldInvalid{fmt.Sprintf("`%s` is an invalid Middle value", s.Middle)})
		}
	}

	if s.Last == "" {
		stack.Append("Last", ErrFieldRequired{"Last is a required field"})
	} else {
		if ok, _ := regexp.MatchString("^\\d{4}$", s.First); !ok {
			stack.Append("Last", ErrFieldInvalid{fmt.Sprintf("`%s` is an invalid Last value", s.Last)})
		}
	}

	// Make sure values are accurate
	return !stack.HasErrors(), stack
}

// PassportField validates a passport number
type PassportField string

func (f PassportField) Valid() (bool, error) {
	pass := string(f)
	if pass == "" {
		return false, ErrFieldRequired{"Passport field is required"}
	}

	if len(pass) < 3 {
		return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid Passport number", pass)}
	}
	return true, nil
}

// Represents a person suffix if applicable
type Suffix string

func (s Suffix) Valid() (bool, error) {
	options := []string{"Jr", "Sr", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "Other"}
	for _, option := range options {
		if string(s) == option {
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("Suffix `%v` is not a valid value", s)}
}

// PhoneNumberField contains the contents for a Phone Number
// TimeToCall = {Day, Night, Both}
// DSN = Check box if International or DSN phone number
type PhoneNumberField struct {
	Number     string
	Extension  string
	TimeToCall string
	DSN        bool
}

func (p PhoneNumberField) Valid() (bool, error) {
	return true, nil
}

// EmploymentStatusField contains a person employement status.
// {Full-time, Part-time}
type EmploymentStatusField string

func (e EmploymentStatusField) Valid() (bool, error) {
	return true, nil
}

// FirstnameField contains a persons first name. Also contains a flag to indicate
// if the person has entered an initial.
type FirstnameField struct {
	Name        string
	InitialOnly bool
}

func (f FirstnameField) Valid() (bool, error) {
	if f.Name == "" {
		return false, ErrFieldRequired{"Firstname is required"}
	}
	return true, nil
}

// MiddlenameField stores and validates a persons Middle Name
type MiddlenameField struct {
	Name string
	// Initial Only || No Middle Name
	Type string
}

func (m MiddlenameField) Valid() (bool, error) {
	var stack ErrorStack

	if m.Type == "" && m.Name == "" {
		stack.Append("Name", ErrFieldRequired{"Middlename is required"})
	}

	if m.Type != "Initial Only" || m.Type != "No Middle Name" {
		stack.Append("Type", ErrFieldInvalid{fmt.Sprintf("%v is not a valid Middlename Type", m.Type)})
	}
	return !stack.HasErrors(), stack
}

// HairColorField stores the persons hair color
type HairColorField string

func (f HairColorField) Valid() (bool, error) {
	// Check if from enum of hair color
	return true, nil
}

// EyeColorField stores the persons eye color
type EyeColorField string

func (f EyeColorField) Valid() (bool, error) {
	// Check if from enum of hair color
	return true, nil
}

// SexField stores a person sex
type SexField string

func (f SexField) Valid() (bool, error) {
	switch strings.ToLower(string(f)) {
	case "male":
		return true, nil
	case "female":
		return true, nil
	default:
		return false, fmt.Errorf("Invalid sex field")
	}
}

// HeightField stores a persons height
type HeightField struct {
	Feet   int64
	Inches int64
}

func (f HeightField) Valid() (bool, error) {
	if f.Feet < 1 || f.Feet > 9 {
		return false, fmt.Errorf("Invalid Feet")
	}

	if f.Inches < 0 || f.Inches > 11 {
		return false, fmt.Errorf("Invalid Inches")
	}

	return true, nil
}

// WeightField stores a persons weight
type WeightField int64

func (f WeightField) Valid() (bool, error) {
	if f < 0 || f > 2000 {
		return false, fmt.Errorf("Invalid weight")
	}

	return true, nil
}

// ZipcodeField stores a properly formatted zipcode
type ZipcodeField string

func (f ZipcodeField) Valid() (bool, error) {
	zip := string(f)
	if string(zip) == "" {
		return false, ErrFieldRequired{"Zipcode is required"}
	} else {
		if ok, _ := regexp.MatchString("^\\d{5}$", zip); !ok {
			return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid Zipcode", zip)}
		}
	}

	return true, nil
}

// StateField stores a state location
type StateField string

func (f StateField) Valid() (bool, error) {
	state := string(f)
	if state == "" {
		return false, ErrFieldRequired{"State is required"}
	}

	if len(state) < 2 {
		return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid state", state)}
	}
	return true, nil
}

// StateField stores a state location
type CityField string

func (f CityField) Valid() (bool, error) {
	s := string(f)
	if s == "" {
		return false, ErrFieldRequired{"City is required"}
	}
	// TODO Just forcing more characters for testing purposes
	if len(s) < 3 {
		return false, ErrFieldRequired{fmt.Sprintf("`%v` is an invalid city", s)}
	}
	return true, nil
}

// CountryField stores a country location
type CountryField string

func (f CountryField) Valid() (bool, error) {

	if strings.TrimSpace(string(f)) == "" {
		return false, ErrInvalidLocation{"Country is required", nil}
	}
	return true, nil
}

// MaritalStatusField stores the persons marital status
// {Never Married, Married (Including Common Law, Separated, Annulled, Divorced, Widowed}
type MaritalStatusField string

func (f MaritalStatusField) Valid() (bool, error) {
	return true, nil
}

// RelativeTypeField represents different types of relatives.
// Mother Father Stepmother Stepfather FosterParent Child Stepchild Brother
// Sister Stepbrother Stepsister HalfBrother HalfSister FatherInLaw MotherInLaw
// Guardian
type RelativeTypeField string

func (f RelativeTypeField) Valid() (bool, error) {
	return true, nil
}

// CurrencyField stores US Currency alues
type CurrencyField struct {
	Amount    string
	Estimated bool
}

func (f CurrencyField) Valid() (bool, error) {
	return true, nil
}
