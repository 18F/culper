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
		FormType:    "SF86",
		FormVersion: "2017-07",
	}

	setErr := account.HashPassword(password)
	if setErr != nil {
		t.Fatal(setErr)
	}

	checkErr := account.CheckPassword(password)
	if checkErr != nil {
		t.Fatal(checkErr)
	}

	badErr := account.CheckPassword("incorrect-password")
	if badErr != ErrPasswordDoesNotMatch {
		t.Fatal("Should have not matched!", badErr)
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

func TestAccountUsernameValidation(t *testing.T) {

	account := &Account{
		Username:    "",
		Email:       sql.NullString{},
		FormType:    "SF86",
		FormVersion: "2017-07",
	}
	err := account.validate()
	if err == nil {
		t.Errorf("expected a Missing Username error")
		t.Fail()
	}
}

func TestAccountFormTypeValidation(t *testing.T) {

	account := &Account{
		Username:    "glarbal@example.com",
		Email:       sql.NullString{},
		FormType:    "Dogs",
		FormVersion: "2017-07",
	}
	err := account.validate()
	if err == nil {
		t.Errorf("expected a Known Form error")
		t.Fail()
	}
}

func TestSubmitAccount(t *testing.T) {

	account := &Account{
		Username:    "glarbal@example.com",
		Email:       sql.NullString{},
		FormType:    "Dogs",
		FormVersion: "2017-07",
		Status:      StatusSubmitted,
	}
	if account.CanSubmit() {
		t.Errorf("Expect to be unable to submit account")
		t.Fail()
	}
}

func TestUnsubmitAccount(t *testing.T) {

	account := &Account{
		Username:    "glarbal@example.com",
		Email:       sql.NullString{},
		FormType:    "Dogs",
		FormVersion: "2017-07",
	}
	account.Unsubmit()
	if account.Status != StatusIncomplete {
		t.Errorf("Expect to be have set account status to incomplete")
		t.Fail()
	}
}

func TestDefaultFormVersion(t *testing.T) {
	form, err := DefaultFormVersion("SF86")
	if err != nil {
		t.Log("Error finding default form: ", err)
		t.Fail()
	}
	if form != "2017-07" {
		t.Errorf("Returned wrong form, expected SF86, got %v.", form)
		t.Fail()
	}
}

func TestDefaultFormVersionFail(t *testing.T) {
	_, err := DefaultFormVersion("SF101")
	if err == nil {
		t.Log("Expected to fine an error, did not receive one")
		t.Fail()
	}
}
