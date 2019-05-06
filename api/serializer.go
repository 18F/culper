package api

// Serializer is an interface that sits between the domain models and the
// database. It is able to serialize and deserialize Applications and Attachments
type Serializer interface {
	SerializeApplication(Application) (string, error)
	DeserializeApplication(accountID int, formType string, formVersion string, body string) (Application, error)
}
