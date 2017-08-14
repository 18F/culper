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

	if valid, err := account.ValidJwtToken(token); !valid {
		return fmt.Errorf("Invalid authorization token: %v", err)
	}

	return nil
}
