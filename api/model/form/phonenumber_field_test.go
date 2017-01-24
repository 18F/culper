package form

import "testing"

func TestPhoneNumberField(t *testing.T) {

	tests := []struct {
		Field    PhoneNumberField
		Expected bool
	}{
		{
			PhoneNumberField{
				Number:     "703-123-1111",
				Extension:  "0000",
				TimeToCall: "Day",
				Type:       "Domestic",
			},
			true,
		},
		{
			PhoneNumberField{
				Number:     "123-1111",
				Extension:  "0000",
				TimeToCall: "Day",
				Type:       "Domestic",
			},
			false,
		},
		{
			PhoneNumberField{
				Number:     "111-2233",
				Extension:  "0000",
				TimeToCall: "Day",
				Type:       "DSN",
			},
			true,
		},
		{
			PhoneNumberField{
				Number:     "11-2233",
				Extension:  "0000",
				TimeToCall: "Day",
				Type:       "DSN",
			},
			false,
		},
		{
			PhoneNumberField{
				Number:     "111-2233",
				Extension:  "0000",
				TimeToCall: "Day",
				Type:       "Unknown type",
			},
			false,
		},
		{
			PhoneNumberField{
				Number:     "111-2233",
				Extension:  "0000",
				TimeToCall: "Whenever",
				Type:       "Day",
			},
			false,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestPhoneNumberTypeField(t *testing.T) {

	tests := []struct {
		Field    PhoneNumberTypeField
		Expected bool
	}{
		{"dsn", true},
		{"international", true},
		{"domestic", true},
		{"unknown", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestTimeToCallField(t *testing.T) {

	tests := []struct {
		Field    TimeToCallField
		Expected bool
	}{
		{"day", true},
		{"Night", true},
		{"Both", true},
		{"unknown", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
