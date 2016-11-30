package model

import (
	"fmt"
	"testing"
	"time"
)

func TestBasicAuthentication(t *testing.T) {
	db := NewTestDB()
	username := fmt.Sprintf("user-%v", time.Now().Unix())
	pw := "admin"

	a := Account{
		Username:  username,
		Firstname: "Admin",
		Lastname:  "Last",
	}

	err := db.Insert(&a)
	if err != nil {
		t.Fatal(err)
	}

	basic := BasicAuthMembership{
		AccountID: a.ID,
	}
	basic.HashPassword(pw)
	basic.WithContext(db)

	err = db.Insert(&basic)
	if err != nil {
		t.Fatal(err)
	}

	a.WithContext(db)
	err = a.BasicAuthentication(pw)
	if err != nil {
		t.Fatalf("Expected password to match\n")
	}

	err = a.BasicAuthentication("incorrect-password")
	if err == nil {
		t.Fatalf("Expected incorrect password\n")
	}
}

func TestJwtToken(t *testing.T) {
	a := Account{
		ID: 1,
	}

	token, _, err := a.NewJwtToken()
	if err != nil {
		t.Fatal(err)
	}

	valid, _ := a.ValidJwtToken(token)
	if !valid {
		t.Fatalf("Expected Jwt Token to be valid")
	}

	valid, _ = a.ValidJwtToken("badtoken")
	if valid {
		t.Fatalf("Expected Jwt Token to be invalid")
	}
}
