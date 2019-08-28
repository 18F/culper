package api

// Entity is a structure which can marshall and validate.
type Entity interface {
	Marshaller
}

// Marshaller is structure which can marshal and unmarshal JSON.
type Marshaller interface {
	Unmarshal([]byte) error
	Marshal() Payload
}
