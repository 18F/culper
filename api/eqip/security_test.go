package eqip

import (
	"log"
	"testing"
)

const (
	testPrivateKeyPath = "./testdata/test.pkcs.key"
	publicCertPath     = "./testdata/test.cer"
)

func TestGenerateSecurityToken(t *testing.T) {

	token := generateSecurityToken()
	if token == "" {
		t.Fatal("Expected security token to be generated")
	}
	encryptedToken, err := signSecurityToken(token, testPrivateKeyPath)
	if err != nil {
		t.Fatalf("Expected signed security token but got %v", err)
	}

	if err := verifySecurityToken([]byte(token), encryptedToken, publicCertPath); err != nil {
		log.Fatalf("Expected security token to be validated but received %v", err)
	}

}

func TestCharacterDigitRadix(t *testing.T) {
	tests := []struct {
		Character rune
		Expected  int
	}{
		{'W', -1},
		{'a', 10},
		{'Z', -1},
		{'1', 1},
	}

	for _, test := range tests {
		if n := characterDigitRadix(test.Character, 16); n != test.Expected {
			t.Errorf("Expected %v but got %v", test.Expected, n)
		}
	}
}
