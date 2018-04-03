package api

// Sentence is a basic input.
type Sentence struct {
	PayloadDescription          Payload `json:"Description" sql:"-"`
	PayloadExceedsYear          Payload `json:"ExceedsYear" sql:"-"`
	PayloadIncarcerated         Payload `json:"Incarcerated" sql:"-"`
	PayloadIncarcerationDates   Payload `json:"IncarcerationDates" sql:"-"`
	PayloadIncarcerationDatesNA Payload `json:"IncarcerationDatesNA" sql:"-"`
	PayloadProbationDates       Payload `json:"ProbationDates" sql:"-"`
	PayloadProbationDatesNA     Payload `json:"ProbationDatesNA" sql:"-"`

	// Validator specific fields
	Description          *Textarea      `json:"-" sql:"-"`
	ExceedsYear          *Branch        `json:"-" sql:"-"`
	Incarcerated         *Branch        `json:"-" sql:"-"`
	IncarcerationDates   *DateRange     `json:"-" sql:"-"`
	IncarcerationDatesNA *NotApplicable `json:"-" sql:"-"`
	ProbationDates       *DateRange     `json:"-" sql:"-"`
	ProbationDatesNA     *NotApplicable `json:"-" sql:"-"`

	// Persister specific fields
	ID                     int `json:"-"`
	AccountID              int `json:"-"`
	DescriptionID          int `json:"-"`
	ExceedsYearID          int `json:"-"`
	IncarceratedID         int `json:"-"`
	IncarcerationDatesID   int `json:"-"`
	IncarcerationDatesNAID int `json:"-"`
	ProbationDatesID       int `json:"-"`
	ProbationDatesNAID     int `json:"-"`
}
