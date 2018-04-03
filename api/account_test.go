package api

import (
	"fmt"
	"log"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/jwt"
)

func newTestDB() *db.DatabaseContext {
	return db.NewDB()
}

func TestBasicAuthentication(t *testing.T) {
	// Here we are actually hitting the database. We need to make sure our
	// test database is sync'd to avoid any unexpected outcomes.
	if err := db.MigrateUp("../db", "environment", ""); err != nil {
		log.Println("Failed to migrate database:", err)
	}

	db := newTestDB()
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

	token, _, err := a.NewJwtToken(jwt.BasicAuthAudience)
	if err != nil {
		t.Fatal(err)
	}

	valid, _ := a.ValidJwtToken(token, jwt.BasicAuthAudience)
	if !valid {
		t.Fatalf("Expected Jwt Token to be valid")
	}

	valid, _ = a.ValidJwtToken("badtoken", jwt.BasicAuthAudience)
	if valid {
		t.Fatalf("Expected Jwt Token to be invalid")
	}
}
