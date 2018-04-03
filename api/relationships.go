package api

type RelationshipsMarital struct {
	PayloadStatus       Payload `json:"Status" sql:"-"`
	PayloadCivilUnion   Payload `json:"CivilUnion" sql:"-"`
	PayloadDivorcedList Payload `json:"DivorcedList" sql:"-"`

	// Validator specific fields
	Status       *Radio      `json:"-"`
	CivilUnion   *CivilUnion `json:"-"`
	DivorcedList *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	StatusID       int `json:"-" pg:", fk:Status"`
	CivilUnionID   int `json:"-" pg:", fk:CivilUnion"`
	DivorcedListID int `json:"-" pg:", fk:DivorcedList"`
}

type RelationshipsCohabitants struct {
	PayloadHasCohabitant  Payload `json:"HasCohabitant" sql:"-"`
	PayloadCohabitantList Payload `json:"CohabitantList" sql:"-"`

	// Validator specific fields
	HasCohabitant  *Branch     `json:"-"`
	CohabitantList *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasCohabitantID  int `json:"-" pg:", fk:HasCohabitant"`
	CohabitantListID int `json:"-" pg:", fk:CohabitantList"`
}

type RelationshipsPeople struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
}

type RelationshipsRelatives struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
}

// RelationshipsComments subsection of identification section.
type RelationshipsComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
