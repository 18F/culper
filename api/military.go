package api

type MilitarySelective struct {
	PayloadWasBornAfter       Payload `json:"WasBornAfter" sql:"-"`
	PayloadHasRegistered      Payload `json:"HasRegistered" sql:"-"`
	PayloadRegistrationNumber Payload `json:"RegistrationNumber" sql:"-"`
	PayloadExplanation        Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	WasBornAfter       *Branch   `json:"-"`
	HasRegistered      *Branch   `json:"-"`
	RegistrationNumber *Text     `json:"-"`
	Explanation        *Textarea `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	WasBornAfterID       int `json:"-" pg:", fk:WasBornAfter"`
	HasRegisteredID      int `json:"-" pg:", fk:HasRegistered"`
	RegistrationNumberID int `json:"-" pg:", fk:RegistrationNumber"`
	ExplanationID        int `json:"-" pg:", fk:Explanation"`
}

type MilitaryHistory struct {
	PayloadHasServed Payload `json:"HasServed" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasServed *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	HasServedID int `json:"-" pg:", fk:HasServed"`
	ListID      int `json:"-" pg:", fk:List"`
}

type MilitaryDisciplinary struct {
	PayloadHasDisciplinary Payload `json:"HasDisciplinary" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDisciplinary *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasDisciplinaryID int `json:"-" pg:", fk:HasDisciplinary"`
	ListID            int `json:"-" pg:", fk:List"`
}

type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
}

// MilitaryComments subsection of identification section.
type MilitaryComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
