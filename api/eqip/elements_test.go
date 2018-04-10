package eqip

// import (
// 	"encoding/xml"
// 	"io/ioutil"
// 	"testing"
// )

// func TestSOAPFaul(t *testing.T) {
// 	tests := []struct {
// 		File     string
// 		Expected ErrEqipWSException
// 	}{
// 		{
// 			File: "./testdata/eqipWSException.xml",
// 			Expected: ErrEqipWSException{
// 				Message: "This is an EqipWSException",
// 			},
// 		},
// 		{
// 			File: "./testdata/characterEncodingException.xml",
// 			Expected: ErrEqipWSException{
// 				Message: "This is a CharacterEncodingException",
// 			},
// 		},
// 	}

// 	for _, test := range tests {
// 		b, err := ioutil.ReadFile(test.File)
// 		if err != nil {
// 			t.Fatal(err)
// 		}
// 		var fault SOAPFault
// 		if err := xml.Unmarshal(b, &fault); err != nil {
// 			t.Fatal(err)
// 		}

// 		err = fault.Error()
// 		if err == nil {
// 			t.Error("Exepcted SOAP Fault to have an error")
// 			continue
// 		}
// 		wserr, ok := err.(*ErrEqipWSException)
// 		if !ok {
// 			t.Error("Exepcted err to be of type ErrEqipWSException")
// 			continue
// 		}
// 		if wserr.Message != test.Expected.Message {
// 			t.Errorf("Expected message to be %s but got %s", test.Expected.Message, wserr.Message)
// 		}
// 	}
// }
