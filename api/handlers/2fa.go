package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/twofactor"
	"github.com/gorilla/mux"
)

// TwofactorHandler is the initial entry and subscription for two-factor
// authentication.
func TwofactorHandler(w http.ResponseWriter, r *http.Request) {
	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Validate the token
	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		http.Error(w, "No authorization token header found", http.StatusInternalServerError)
		return
	}

	jwtToken := matches[1]
	if valid, err := account.ValidJwtToken(jwtToken, model.BasicAuthAudience); !valid {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	png := ""
	if !account.TokenUsed {
		png, err = twofactor.Generate(account.Username, account.Token)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	fmt.Fprintf(w, png)
}

// TwofactorVerifyHandler verifies a token provided by the end user.
func TwofactorVerifyHandler(w http.ResponseWriter, r *http.Request) {
	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Validate the token
	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		http.Error(w, "No authorization token header found", http.StatusInternalServerError)
		return
	}

	jwtToken := matches[1]
	if valid, err := account.ValidJwtToken(jwtToken, model.BasicAuthAudience); !valid {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var body struct {
		Token string
	}
	DecodeJSON(r.Body, &body)

	ok, err := twofactor.Authenticate(body.Token, account.Token)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "Failed two-factor authentication", http.StatusUnauthorized)
		return
	}

	account.TokenUsed = true
	if err := account.Save(); err != nil {
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

// TwofactorEmailHandler sends a token to the user by email.
func TwofactorEmailHandler(w http.ResponseWriter, r *http.Request) {
	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = twofactor.Email(account.Email, account.Token); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "")
}

func TwofactorResetHandler(w http.ResponseWriter, r *http.Request) {
	if os.Getenv("ALLOW_2FA_RESET") == "" {
		http.Error(w, "Reset two-factor authentication not allowed on this server", http.StatusUnauthorized)
		return
	}

	// Retrieve the current account information
	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Validate the token
	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		http.Error(w, "No authorization token header found", http.StatusInternalServerError)
		return
	}

	jwtToken := matches[1]
	if valid, err := account.ValidJwtToken(jwtToken, model.BasicAuthAudience); !valid {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Make sure the account does not have a token assigned
	account.Token = ""
	account.TokenUsed = false
	if err := account.Save(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, jwtToken)
}

func getAccountFromRequest(r *http.Request) (*model.Account, error) {
	// Sanity check for username
	vars := mux.Vars(r)
	username := vars["account"]
	if username == "" {
		return &model.Account{}, errors.New("No username provided")
	}

	// Retrieve the current account information
	account := &model.Account{
		Username: username,
	}

	dbContext := db.NewDB()
	account.WithContext(dbContext)
	if err := account.Get(); err != nil {
		return account, err
	}

	// Make sure the account has a token
	if account.Token == "" {
		account.Token = twofactor.Secret()
		if err := account.Save(); err != nil {
			return account, err
		}
	}

	return account, nil
}
