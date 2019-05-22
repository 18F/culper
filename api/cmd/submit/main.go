package main

import (
	"encoding/json"
	"fmt"
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/eqip"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/xml"
	"io/ioutil"
	"os"
)

// Generates and submits an SF-86 XML to e-QIP from eApp application form data.
// The input JSON should represent a fully validated form, as serialized by eApp.
// Requires that all the `WS_*` environment variables be configured, except `WS_ENABLED`.
//
// See api/testdata/complete-scenarios/*.json for example form files.
//
// Set LOG_LEVEL=debug to print the SF-86 XML being submitted and the full response.
func main() {
	settings := &env.Native{}
	settings.Configure()
	logger := &log.Service{Log: log.NewLogger()}
	xmlsvc := xml.NewXMLService()

	fatal := func(err error) {
		if err != nil {
			logger.Fatal(err.Error(), api.LogFields{})
		}
	}

	if len(os.Args) != 2 {
		fatal(fmt.Errorf("usage: submit form.json"))
	}

	jsonBytes, err := ioutil.ReadFile(os.Args[1])
	fatal(err)

	// Do what api.Package() does to generate the SF-86 XML
	var js map[string]interface{}
	err = json.Unmarshal(jsonBytes, &js)
	fatal(err)

	result, err := xmlsvc.DefaultTemplate("application.xml", js)
	fatal(err)
	xml := string(result)

	logger.Debug(xml, api.LogFields{})

	client, err := api.EqipClient(settings)
	fatal(err)

	request, err := api.EqipRequest(settings, js, xml)
	fatal(err)

	response, err := client.ImportRequest(request)
	// Error at network or HTTP level
	fatal(err)

	logger.Debug(string(response.ResponseBody), api.LogFields{})

	// Error at e-QIP service
	serviceErr := response.Error()
	if serviceErr != nil {
		exception := serviceErr.(*eqip.ErrEqipWSException)
		for _, msg := range exception.ErrorMessages {
			logger.Warn(msg, api.LogFields{})
		}
		fatal(fmt.Errorf(serviceErr.Error()))
	}

	agencyKey, requestKey := response.ImportRequestResponse.Keys()
	fmt.Printf("submit: import into e-QIP successful: agencyKey=%v, requestKey=%v\n",
		agencyKey, requestKey)
}
