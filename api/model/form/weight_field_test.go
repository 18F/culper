package form

import "testing"

func TestWeightField(t *testing.T) {
	tests := []struct {
		Field    WeightField
		Expected bool
	}{
		{10, true},
		{0, false},
		{1000, false},
		{999, true},
		{10, true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", test.Field, ok, test.Expected)
		}
	}
}
