package api

import (
	"fmt"
	"testing"
	"time"
)

func TestBasicAuthentication(t *testing.T) {
	username := fmt.Sprintf("user-%v", time.Now().Unix())
	password := "admin"

	account := &Account{
		Username:  username,
		Firstname: "Admin",
		Lastname:  "Last",
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
