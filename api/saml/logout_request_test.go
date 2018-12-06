package saml

import (
	"fmt"
	"os"
	"strings"
	"testing"
)

// TestBasicRequestFormat just tests that NewLogoutRequest can run without generating any errors.
func TestBasicRequestFormat(t *testing.T) {

	req := newLogoutRequest("localhost", "admin", "session-id")

	output, err := req.xml()
	if err != nil {
		fmt.Printf("error: %v\n", err)
		t.Fatal("error")
	}

	fmt.Println(string(output))

	b64, err := req.base64()
	if err != nil {
		t.Fatal("weird to get the error here and not there.")
	}

	fmt.Println(b64)

}

func TestRequestSignature(t *testing.T) {

	fmt.Println(os.Getwd())

	req := newLogoutRequest("localhost", "admin", "b96e355b-256a-46b2-ba42-9d140effefcb")

	req.ID = "_784652ff-d59b-4778-a4a6-fc8d9cc502dc"
	req.IssueInstant = time.Date(2018, time.November, 27, 23, 37, 46, 952062600, time.UTC)
	testCrtFile := "testdata/test_cert.pem"
	testKeyFile := "testdata/test_key.pem"

	err := req.signRequest(testCrtFile, testKeyFile)
	if err != nil {
		t.Fatal("Error signing request", err)
	}

	output, err := req.xml()
	if err != nil {
		fmt.Printf("error: %v\n", err)
		t.Fatal("error")
	}

	fmt.Println(string(output))

	if !strings.Contains(string(output), "SignatureValue") {
		t.Fatal("No signature")
	}

}
