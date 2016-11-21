package twofactor

import (
	"crypto/rand"
	"encoding/base32"
	"encoding/base64"
	"net/url"

	"github.com/dgryski/dgoogauth"
	qr "github.com/skip2/go-qrcode"
)

// Secret creates a random secret and then base32 encodes it.
func Secret() string {
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
func Generate(account, secret string) (string, error) {
	u, err := url.Parse("otpauth://totp")
	if err != nil {
		return "", err
	}

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
func Authenticate(token, secret string) (ok bool, err error) {
	otpc := &dgoogauth.OTPConfig{
		Secret:      secret,
		WindowSize:  3,
		HotpCounter: 0,
	}
	return otpc.Authenticate(token)
}
