package http

import (
	"encoding/json"
	"testing"
)

const validJSON = `
    {
       "type":"identification.name",
       "props":{
          "Name":{
             "type":"name",
             "props":{
                "first":"MacRae",
                "firstInitialOnly":false,
                "last":"Fenton",
                "lastInitialOnly":false,
                "middle":"William",
                "middleInitialOnly":false,
                "noMiddleName":false,
                "suffix":"",
                "suffixOther":""
             }
          }
       }
    }`

func confirmErrorMsg(t *testing.T, responseJSON []byte, expectedErr string) {
	t.Helper()
	var errorsJSON map[string][]map[string]string
	jsonErr := json.Unmarshal(responseJSON, &errorsJSON)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	message, ok := errorsJSON["errors"][0]["message"]
	if !ok {
		t.Fatal("Error with message missing from response")
	}
	// Check the response body is what we expect.
	if message != expectedErr {
		t.Log("Got the wrong error message: ", message)
		t.Fail()
	}
}
