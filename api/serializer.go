package api

// Serializer is an interface that sits between the domain models and the
// database. It is able to serialize and deserialize Applications and Attachments
type Serializer interface {
	SerializeApplication(Application) ([]byte, error)
	DeserializeApplication(accountID int, formType string, formVersion string, body []byte) (Application, error)
}
