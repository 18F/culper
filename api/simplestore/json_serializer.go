package simplestore

import (
	"encoding/json"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

type JSONSerializer struct{}

func NewJSONSerializer() JSONSerializer {
	return JSONSerializer{}
}

func (s JSONSerializer) SerializeApplication(app api.Application) ([]byte, error) {
	json, marshalErr := json.Marshal(app)
	if marshalErr != nil {
		return []byte{}, marshalErr
	}

	return json, nil
}

func (s JSONSerializer) DeserializeApplication(accounID int, formType string, formVersion string, serializedBody []byte) (api.Application, error) {
	app := api.BlankApplication(accounID, formType, formVersion)
	jsonErr := json.Unmarshal(serializedBody, &app)
	if jsonErr != nil {
		return api.Application{}, errors.Wrap(jsonErr, "Couldn't unmarshal the loaded Application")
	}

	return app, nil

}
