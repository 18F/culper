package api

import (
	"database/sql"
	"fmt"
	"testing"
	"time"
)

func TestBasicAuthentication(t *testing.T) {
	username := fmt.Sprintf("user-%v", time.Now().Unix())
	password := "admin"

	account := &Account{
		Username:    username,
		Firstname:   "Admin",
		Lastname:    "Last",
		FormType:    "SF86",
		FormVersion: "2017-07",
	}

	membership := &BasicAuthMembership{
		AccountID: account.ID,
		Account:   account,
	}
	membership.HashPassword(password)

	if matched := membership.PasswordMatch(password); !matched {
		t.Fatal("Expected password to match")
	}

	if matched := membership.PasswordMatch("incorrect-password"); matched {
		t.Fatal("Expected incorrect password")
	}
}

func TestValidFormType(t *testing.T) {

	account := &Account{
		Username:    "glarbal@example.com",
		Email:       sql.NullString{},
		FormType:    "SF86",
		FormVersion: "2017-07",
	}

	type testCase struct {
		sftype    string
		sfversion string
		valid     bool
	}

	testCases := []testCase{
		testCase{"SF86", "2017-07", true},
		testCase{"SF 86", "2017-07", false},
		testCase{"SF86", "2036-11", false},

		testCase{"SF85", "2017-12-draft7", true},
		testCase{"SF85", "2017-07", false},
	}

	for _, tCase := range testCases {
		account.FormType = tCase.sftype
		account.FormVersion = tCase.sfversion

		if tCase.valid != account.FormTypeIsKnown() {
			helperWord := "should"
			if !tCase.valid {
				helperWord += " not"
			}
			t.Logf("%s + %s %s be valid", tCase.sftype, tCase.sfversion, helperWord)
			t.Fail()
		}

	}

}
