package handlers

import (
	"fmt"
	"log"
	"net/http"
	"regexp"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

var (
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
)

func JwtTokenValidatorHandler(w http.ResponseWriter, r *http.Request) error {
	log.Println("Checking Session Token")

	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		return fmt.Errorf("No authorization token header found")
	}

	token := matches[1]
	account := model.Account{}
	account.WithContext(db.NewDB())

	if valid, err := account.ValidJwtToken(token, model.TwoFactorAudience); !valid {
		return fmt.Errorf("Invalid authorization token: %v", err)
	}

	return nil
}

func JwtTokenRefresh(w http.ResponseWriter, r *http.Request) {
	log.Println("Refreshing Session Token")

	// Check if the token was passed with the request
	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		http.Error(w, "No authorization token header found", http.StatusInternalServerError)
		return
	}

	// Validate the token
	token := matches[1]
	account := model.Account{}
	account.WithContext(db.NewDB())
	if valid, err := account.ValidJwtToken(token, model.TwoFactorAudience); !valid {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := account.NewJwtToken(model.TwoFactorAudience)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	fmt.Fprintf(w, signedToken)
}
