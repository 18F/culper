package saml

import (
	"fmt"
	"testing"
)

// TestBasicRequestFormat just tests that NewLogoutRequest can run without generating any errors.
func TestBasicRequestFormat(t *testing.T) {

	req := NewLogoutRequest("localhost", "admin", "session-id")

	output, err := req.XML()
	if err != nil {
		fmt.Printf("error: %v\n", err)
		t.Fatal("error")
	}

	fmt.Println(string(output))

	b64, err := req.Base64()
	if err != nil {
		t.Fatal("weird to get the error here and not there.")
	}

	fmt.Println(b64)

}
