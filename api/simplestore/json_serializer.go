package simplestore

import (
	"encoding/json"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// JSONSerializer serializes an application to JSON for storage
type JSONSerializer struct{}

// NewJSONSerializer returns a new JSON Serializer
func NewJSONSerializer() JSONSerializer {
	return JSONSerializer{}
}

// SerializeApplication turns an Application into bytes for storage
func (s JSONSerializer) SerializeApplication(app api.Application) ([]byte, error) {
	json, marshalErr := json.Marshal(app)
	if marshalErr != nil {
		return []byte{}, marshalErr
	}

	return json, nil
}

// DeserializeApplication turns bytes into an Application
func (s JSONSerializer) DeserializeApplication(accountID int, formType string, formVersion string, serializedBody []byte) (api.Application, error) {
	app := api.BlankApplication(accountID, formType, formVersion)
	jsonErr := json.Unmarshal(serializedBody, &app)
	if jsonErr != nil {
		return api.Application{}, errors.Wrap(jsonErr, "Couldn't unmarshal the loaded Application")
	}

	return app, nil

}

// SerializeAttachment turns an Attachment into bytes
func (s JSONSerializer) SerializeAttachment(attachment api.Attachment) ([]byte, []byte, error) {
	metadata, marshalErr := json.Marshal(attachment)
	if marshalErr != nil {
		return []byte{}, []byte{}, marshalErr
	}

	return metadata, attachment.Raw, nil
}

// DeserializeAttachment turns bytes into an Attachment
func (s JSONSerializer) DeserializeAttachment(accountID int, attachmentID int, metadata []byte, body []byte) (api.Attachment, error) {
	attachment := api.Attachment{}

	jsonErr := json.Unmarshal(metadata, &attachment)
	if jsonErr != nil {
		return api.Attachment{}, errors.Wrap(jsonErr, "Couldn't unmarshal the metadata for an attachment")
	}

	attachment.AccountID = accountID
	attachment.ID = attachmentID
	attachment.Raw = body

	return attachment, nil
}
