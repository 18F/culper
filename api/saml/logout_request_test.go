package saml

import (
	"fmt"
	"os"
	"strings"
	"testing"
	"time"
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

}

func TestRequestSignature(t *testing.T) {

	fmt.Println(os.Getwd())

	req := newLogoutRequest("localhost", "admin", "b96e355b-256a-46b2-ba42-9d140effefcb")

	req.ID = "_784652ff-d59b-4778-a4a6-fc8d9cc502dc"
	req.IssueInstant = time.Date(2018, time.November, 27, 23, 37, 46, 952062600, time.UTC)
	testCrtFile := "testdata/test_cert.pem"
	testKeyFile := "testdata/test_key.pem"

	signedRequest, err := req.signedRequest(testCrtFile, testKeyFile)
	if err != nil {
		t.Fatal("Error signing request", err)
	}

	fmt.Println("OO", signedRequest)

	if !strings.Contains(signedRequest, "SignatureValue") {
		t.Fatal("No signature")
	}

	// check that the correct digest value is present
	if !strings.Contains(signedRequest, "K4BHZC12Eg+0ROvekIVi4ZUrG7g=") {
		t.Fatal("Incorrect or missing Digest")
	}

	// check that a part of the signature is there
	if !strings.Contains(signedRequest, "qjSm3XMvuvShKlA674D/inGSqqnea8tMBCzXK771IKBkLc5i0oiW39zx4XaKDOzT") {
		t.Fatal("Incorrect or missing Signature")
	}

}

func TestGetPemBody(t *testing.T) {

	correctBody := "MIIDLDCCAhQCCQDDkcG+0nx/ADANBgkqhkiG9w0BAQsFADBYMQswCQYDVQQGEwJ1czESMBAGA1UECgwJVGVzdFdvcmtzMRQwEgYDVQQDDAtleGFtcGxlLmNvbTEfMB0GCSqGSIb3DQEJARYQdGVzdEBleGFtcGxlLmNvbTAeFw0xODExMjYyMTU1MzJaFw0xOTExMjYyMTU1MzJaMFgxCzAJBgNVBAYTAnVzMRIwEAYDVQQKDAlUZXN0V29ya3MxFDASBgNVBAMMC2V4YW1wbGUuY29tMR8wHQYJKoZIhvcNAQkBFhB0ZXN0QGV4YW1wbGUuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1p2Um8WCNO2O+m5xQ0ezUGZbODAbz6BKLGrXIVTtE6c37j8t1abEkQf+UAr5AWzDHNWe/Ij0qowW7S7zUZzRP6gcI9UhBzqwts+OkpgadQtFa2UU9Jm5UWP+NcXX4DIjLXVIex7JRTKIn+iWuAhPRFNxbzxv4gkr+r0DNcW1RqxFL6oGHm0tGbTmAz3hQRZ2+DCTPhuubQ1mSa+SLBSLjB54hk0hX4ZmI6ua5o5ZR4JYGo26fedA3H4wm89mPNCpzu5p0Iu7YT3bCWRjQ4DAHR06rPsEBKF5wnvk2rPKvTTFsX4DMTKCSHsKSJLMmMgKWrRQMQ9suN2C3J3ApfNRpwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAspdYgSzeu+MhLThQncyFc8c6wocCF4jTcFaxbcbMHWzI0LQ6+IUCcnQw+TTsfvIjuS2tKJxsqG2bMdU+j5tnD9vMzAipZSmusDtzyK7lowlcdZWVx66UXcOZt0C3piFf1BKqvpcp0bk21pFq9nMGmM/5NwafebwlbaxYQR0CP82fEbhXHudvsDPvovCnKmnIscYKjMZbXMtq03WXGxdDpzZlQjmZzWCfGpCP3GLmqzBkM//msBK0POtOC7rhV/x+qJahUwMhZoP2thluHplOlXqyVbYU/Oov5PryTgNoSXRaZy1qze86rxNZmLacGgoZ0UFIMoMERbt2bXtyZLxfr"

	testCrtFile := "testdata/test_cert.pem"

	body, err := extractCertBody(testCrtFile)
	if err != nil {
		t.Fatal(err)
	}

	if body != correctBody {
		fmt.Println("Got: ", body)
		t.Fatal("No match yet.")
	}

}
