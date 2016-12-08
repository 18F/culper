package form

import "testing"

func TestSuffixField(t *testing.T) {
	tests := []struct {
		Field    SuffixField
		Expected bool
	}{
		{
			SuffixField{
				Suffix:      "II",
				SuffixOther: "",
			},
			true,
		},
		{
			SuffixField{
				Suffix:      "Fake",
				SuffixOther: "",
			},
			false,
		},
		{
			SuffixField{
				Suffix:      "Other",
				SuffixOther: "",
			},
			false,
		},
		{
			SuffixField{
				Suffix:      "Other",
				SuffixOther: "Hellooooo",
			},
			true,
		},
		{
			SuffixField{
				Suffix:      "",
				SuffixOther: "",
			},
			true,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
