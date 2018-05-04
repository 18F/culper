package mfa

import (
	"crypto/rand"
	"encoding/base32"
	"encoding/base64"
	"net/url"
	"strconv"
	"strings"
	"text/template"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/dgryski/dgoogauth"
	qr "github.com/skip2/go-qrcode"
)

const (
	auth string = "totp"
)

var (
	templateEmail = template.Must(template.New("email").Parse(`# Passcode\n\n{{ . }}`))
)

// Service implements a multiple factor authentication.
type Service struct {
	Log api.LogService
	Env api.Settings
}

// Secret creates a random secret and then base32 encodes it.
func (service Service) Secret() string {
	secret := make([]byte, 6)
	_, err := rand.Read(secret)
	if err != nil {
		return ""
	}

	secret32 := base32.StdEncoding.EncodeToString(secret)
	return secret32
}

// Generate will create a QR code in PNG format which will then
// be base64 encoded so it can traverse the wire to the front end.
func (service Service) Generate(account, secret string) (string, error) {
	u, err := url.Parse("otpauth://" + auth)
	if err != nil {
		return "", err
	}

	// Google authenticator (on iOS) does not react well to the base32 right padding
	// of "=" runes. Removing them seems to have no adverse affect for those authenticators
	// currently already working.
	secret = strings.TrimRight(secret, "=")

	u.Path += "/eqip:" + account
	params := &url.Values{}
	params.Add("secret", secret)
	params.Add("issuer", "eqip")
	u.RawQuery = params.Encode()

	png, err := qr.Encode(u.String(), qr.Medium, 256)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(png), nil
}

// Authenticate validates the initial token generated when configuring two-factor
// authentication for the first time.
func (service Service) Authenticate(token, secret string) (ok bool, err error) {
	// Get the adjustable window size
	size := 3
	if service.Env.Has(api.WindowSize) {
		i, e := strconv.Atoi(service.Env.String(api.WindowSize))
		if e == nil {
			size = i
			service.Log.Debug("Setting MFA window size", api.LogFields{"window": i})
		}
	}

	// Create the OTP configuration to use for authenticating the token
	otpc := &dgoogauth.OTPConfig{
		Secret:      secret,
		WindowSize:  size,
		HotpCounter: 0,
		UTC:         true,
	}
	return otpc.Authenticate(token)
}
