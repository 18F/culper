package handlers

import (
	"fmt"
	"net/http"
	"regexp"

	"github.com/truetandem/e-QIP-prototype/api/db"
	"github.com/truetandem/e-QIP-prototype/api/model"
)

var (
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
)

func JwtTokenValidatorHandler(w http.ResponseWriter, r *http.Request) error {
	fmt.Println("Checking Session Token")

	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		return fmt.Errorf("No Authorization token header found")
	}

	token := matches[1]
	account := model.Account{}
	account.WithContext(db.NewDB())

	if valid, err := account.ValidJwtToken(token); err != nil || !valid {
		return fmt.Errorf("Invalid authorization token")
	}

	return nil
}
