package model

import "testing"

func TestPasswordMatch(t *testing.T) {
	tests := []struct {
		Password      string
		PasswordInput string
		Expected      bool
	}{
		{"admin", "admin", true},
		{"admin", "admin2", false},
	}

	for _, test := range tests {
		basic := BasicAuthMembership{}

		if err := basic.HashPassword(test.Password); err != nil {
			t.Error("Unable to HashPassword")
		}

		if matches := basic.PasswordMatch(test.PasswordInput); test.Expected != matches {
			t.Errorf("Error matching password. Expect [%v] but got [%v]\n", test.Expected, matches)
		}

	}
}
