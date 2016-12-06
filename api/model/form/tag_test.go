package form

import "testing"

type CustomTextField struct {
	Firstname   TextField `minLength:"4"`
	Lastname    TextField `minLength:"40"`
	Middlename  TextField `maxLength:"100"`
	PhoneNumber string    `required:"required"`
}

func TestExtract(t *testing.T) {
	tests := []struct {
		Fieldname   string
		TagName     string
		Obj         interface{}
		Expected    bool
		ExpectedStr string
	}{
		{"Firstname", "minLength", CustomTextField{}, true, "4"},
		{"Firstname", "", CustomTextField{}, false, ""},
		{"", "", CustomTextField{}, false, ""},
		{"", "minLength", CustomTextField{}, false, ""},
		{"PhoneNumber", "required", CustomTextField{}, true, "required"},
		{"PhoneNumber", "require", CustomTextField{}, false, "required"},
	}

	for _, test := range tests {
		if s, ok := Extract(test.Fieldname, test.TagName, test.Obj); ok != test.Expected && s != test.ExpectedStr {
			t.Errorf("Expected [%v] to have bool [%v] and string [%v] but got [%v] and [%v]\n",
				test.Fieldname, test.Expected, test.ExpectedStr, ok, s)
		}
	}

}
func TestMinLength(t *testing.T) {
	tests := []struct {
		Fieldname string
		TagName   string
		Expected  int64
	}{
		{"Firstname", "minLength", 4},
		{"Firstnames", "minLength", 0},
		{"Lastname", "minLength", 40},
	}

	for _, test := range tests {
		if v, _ := MinLength(test.Fieldname, CustomTextField{}); v != test.Expected {
			t.Errorf("Expected [%v] to be [%v] but got [%v]\n", test.Fieldname, test.Expected, v)
		}

	}
}

func TestMaxLength(t *testing.T) {
	tests := []struct {
		Fieldname string
		TagName   string
		Expected  int64
	}{
		{"Middlename", "maxLength", 100},
	}

	for _, test := range tests {
		if v, _ := MaxLength(test.Fieldname, CustomTextField{}); v != test.Expected {
			t.Errorf("Expected [%v] to be [%v] but got [%v]\n", test.Fieldname, test.Expected, v)
		}

	}
}
