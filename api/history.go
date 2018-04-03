package api

type HistoryResidence struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
}

type HistoryEmployment struct {
	PayloadList             Payload `json:"List" sql:"-"`
	PayloadEmploymentRecord Payload `json:"EmploymentRecord" sql:"-"`

	// Validator specific fields
	List             *Collection `json:"-"`
	EmploymentRecord *Branch     `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	ListID             int `json:"-" pg:", fk:List"`
	EmploymentRecordID int `json:"-"`
}

type HistoryEducation struct {
	PayloadHasAttended Payload `json:"HasAttended" sql:"-"`
	PayloadHasDegree10 Payload `json:"HasDegree10" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasAttended *Branch     `json:"-" sql:"-"`
	HasDegree10 *Branch     `json:"-" sql:"-"`
	List        *Collection `json:"-" sql:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasAttendedID int `json:"-" pg:", fk:HasAttended"`
	HasDegree10ID int `json:"-" pg:", fk:HasDegree10" sql:"has_degree10_id"`
	ListID        int `json:"-" pg:", fk:List"`
}

type HistoryFederal struct {
	PayloadHasFederalService Payload `json:"HasFederalService" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasFederalService *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasFederalServiceID int `json:"-" pg:", fk:HasFederalService"`
	ListID              int `json:"-" pg:", fk:List"`
}

// HistoryComments subsection of identification section.
type HistoryComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
