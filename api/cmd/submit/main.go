package main

import (
	"encoding/json"
	"fmt"
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/eqip"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/xml"
	"github.com/benbjohnson/clock"
	"io/ioutil"
	"os"
	"strconv"
)

func main() {
	settings := &env.Native{}
	settings.Configure()
	logger := &log.Service{Log: log.NewLogger()}
	localClock := clock.New()
	xmlsvc := xml.Service{Log: logger, Clock: localClock}

	url := settings.String(api.WsURL)
	if url == "" {
		logger.Fatal(api.WebserviceMissingURL, api.LogFields{})
	}
	key := settings.String(api.WsKey)
	if key == "" {
		logger.Fatal(api.WebserviceMissingKey, api.LogFields{})
	}

	if len(os.Args) != 2 {
		logger.Fatal("usage: submit form.json", api.LogFields{})
	}

	jsonBytes, err := ioutil.ReadFile(os.Args[1])
	if err != nil {
		logger.Fatal(err.Error(), api.LogFields{})
	}

	// Do what api.Package() does
	var js map[string]interface{}
	if err := json.Unmarshal(jsonBytes, &js); err != nil {
		logger.Fatal(err.Error(), api.LogFields{})
	}
	xmlTemplate, err := xmlsvc.DefaultTemplate("application.xml", js)
	if err != nil {
		logger.Fatal(err.Error(), api.LogFields{})
	}
	logger.Warn(string(xmlTemplate), api.LogFields{})

	client := eqip.NewClient(url, key)

	ir, err := newImportRequest(settings, js, string(xmlTemplate))
	if err != nil {
		logger.Fatal(err.Error(), api.LogFields{})
	}
	response, err := client.ImportRequest(ir)
	if err != nil {
		logger.Fatal(err.Error(), api.LogFields{})
	}
	//_ = response
	logger.Warn(string(response.ResponseBody), api.LogFields{})

	logger.Warn("End of submit", api.LogFields{})
}

func newImportRequest(settings api.Settings, application map[string]interface{}, xmlContent string) (*eqip.ImportRequest, error) {
	var ciAgencyUserPseudoSSN bool
	var agencyID int
	var agencyGroupID int

	ciAgencyIDEnv := settings.String(api.WsCallerinfoAgencyID)
	if ciAgencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyID)
	}
	ciAgencyUserSSNEnv := settings.String(api.WsCallerinfoAgencyUserSSN)
	if ciAgencyUserSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencySSN)
	}
	// Parse agency id
	agencyIDEnv := settings.String(api.WsAgencyID)
	if agencyIDEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingAgencyID)
	}
	i, err := strconv.Atoi(agencyIDEnv)
	if err != nil {
		return nil, err
	}
	agencyID = i

	// Parse agency group id if necessary
	agencyGroupIDEnv := settings.String(api.WsAgencyGroupID)
	if agencyGroupIDEnv != "" {
		i, err := strconv.Atoi(agencyGroupIDEnv)
		if err != nil {
			return nil, err
		}
		agencyGroupID = i
	}

	ciAgencyUserPseudoSSNEnv := settings.String(api.WsCallerinfoAgencyUserPseudossn)
	if ciAgencyUserPseudoSSNEnv == "" {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	b, err := strconv.ParseBool(ciAgencyUserPseudoSSNEnv)
	if err != nil {
		return nil, fmt.Errorf(api.WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	ciAgencyUserPseudoSSN = b

	ci := eqip.NewCallerInfo(ciAgencyIDEnv, ciAgencyUserPseudoSSN, ciAgencyUserSSNEnv)
	return eqip.NewImportRequest(ci, agencyID, agencyGroupID, application, xmlContent)
}
