package form

import "testing"

func TestNameField(t *testing.T) {
	tests := []struct {
		Field    NameField
		Expected bool
	}{
		{
			NameField{
				First:       "John",
				Last:        "Doe",
				Middle:      "S",
				Suffix:      "",
				SuffixOther: "",
			},
			true,
		},
		{
			NameField{
				First:       "",
				Last:        "Doe",
				Middle:      "",
				Suffix:      "",
				SuffixOther: "",
			},
			true,
		},
		{
			NameField{
				First:       "Winston",
				Last:        "",
				Middle:      "",
				Suffix:      "",
				SuffixOther: "",
			},
			false,
		},
		{
			NameField{
				First:       "John",
				Last:        "Doe",
				Middle:      "S",
				Suffix:      "Linux",
				SuffixOther: "",
			},
			false,
		},
		{
			NameField{
				First:       "Finley!",
				Last:        "Doe",
				Middle:      "S!",
				Suffix:      "",
				SuffixOther: "",
			},
			false,
		},
		{
			NameField{
				First:       "Ryan",
				Last:        "KD",
				Middle:      "S",
				Suffix:      "Other",
				SuffixOther: "",
			},
			false,
		},
		{
			NameField{
				First:       "Taylor",
				Last:        "KD",
				Middle:      "S",
				Suffix:      "Other",
				SuffixOther: "This sh0uld f@ail",
			},
			false,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", test.Field, ok, test.Expected)
		}
	}
}
