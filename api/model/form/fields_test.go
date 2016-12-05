package form

import "testing"

func TestTextField(t *testing.T) {

	tests := []struct {
		Field    TextField
		Expected bool
	}{
		{"", false},
		{"hello", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestEmailField(t *testing.T) {

	tests := []struct {
		Field    EmailField
		Expected bool
	}{
		{"", false},
		{"test", false},
		{"test@local.dev", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestURLField(t *testing.T) {

}

func TestDateField(t *testing.T) {

}

func TestMonthYearField(t *testing.T) {

}

func TestSSNField(t *testing.T) {

}

func TestSuffixField(t *testing.T) {

}

func TestPhoneNumberField(t *testing.T) {

}

func TestEmploymentStatusField(t *testing.T) {

}

func TestFirstnameField(t *testing.T) {

}

func TestMiddlenameField(t *testing.T) {

}

func TestHairColorField(t *testing.T) {

}

func TestEyeColorField(t *testing.T) {

}

func TestSexField(t *testing.T) {

}

func TestHeightField(t *testing.T) {

}

func TestWeightField(t *testing.T) {

}

func TestZipcodeField(t *testing.T) {
	tests := []struct {
		Field    ZipcodeField
		Expected bool
	}{
		{"", false},
		{"212", false},
		{"22310", true},
		{"22310-2", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}

}

func TestStateField(t *testing.T) {
	tests := []struct {
		Field    StateField
		Expected bool
	}{
		{"", false},
		{"VA", true},
		{"Virginia", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestCountryField(t *testing.T) {
	tests := []struct {
		Field    CountryField
		Expected bool
	}{
		{"", false},
		{"United States", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestMaritalStatusField(t *testing.T) {

}

func TestRelativeTypeField(t *testing.T) {

}

func TestCurrencyField(t *testing.T) {

}
