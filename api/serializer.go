package api

// Serializer is an interface that sits between the domain models and the
// database. It is able to serialize and deserialize Applications and Attachments
type Serializer interface {
	// SerializeApplication turns an Application into bytes
	SerializeApplication(Application) ([]byte, error)
	// DeserializeApplication turns bytes into an Application
	DeserializeApplication(accountID int, formType string, formVersion string, body []byte) (Application, error)

	// SerializeAttachment turns an attachment into two byte arrays for storage in the db
	// The first one is the meatadata, and the second one is the body
	SerializeAttachment(attachment Attachment) ([]byte, []byte, error)
	// DeserializeAttachment turns bytes into an Attachment
	DeserializeAttachment(accountID int, attachmentID int, metadata []byte, body []byte) (Attachment, error)
}
