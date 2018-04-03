package api

// LegalCourt structure
type LegalCourt struct {
	PayloadHasCourtActions Payload `json:"HasCourtActions" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCourtActions *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasCourtActionsID int `json:"-" pg:", fk:HasCourtActions"`
	ListID            int `json:"-" pg:", fk:List"`
}

// LegalPoliceOffenses structure
type LegalPoliceOffenses struct {
	PayloadHasOffenses Payload `json:"HasOffenses" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOffenses *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasOffensesID int `json:"-" pg:", fk:HasOffenses"`
	ListID        int `json:"-" pg:", fk:List"`
}

// LegalPoliceAdditionalOffenses structure
type LegalPoliceAdditionalOffenses struct {
	PayloadHasOtherOffenses Payload `json:"HasOtherOffenses" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOtherOffenses *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasOtherOffensesID int `json:"-" pg:", fk:HasOtherOffenses"`
	ListID             int `json:"-" pg:", fk:List"`
}

// LegalPoliceDomesticViolence structure
type LegalPoliceDomesticViolence struct {
	PayloadHasDomesticViolence Payload `json:"HasDomesticViolence" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDomesticViolence *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int `json:"-"`
	HasDomesticViolenceID int `json:"-"`
	ListID                int `json:"-" pg:", fk:List"`
}

// LegalInvestigationsDebarred structure
type LegalInvestigationsDebarred struct {
	PayloadHasDebarment Payload `json:"HasDebarment" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDebarment *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasDebarmentID int `json:"-" pg:", fk:HasDebarment"`
	ListID         int `json:"-" pg:", fk:List"`
}

// LegalInvestigationsHistory structure
type LegalInvestigationsHistory struct {
	PayloadHasHistory Payload `json:"HasHistory" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasHistory *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int `json:"-"`
	HasHistoryID int `json:"-" pg:", fk:HasHistory"`
	ListID       int `json:"-" pg:", fk:List"`
}

// LegalInvestigationsRevoked structure
type LegalInvestigationsRevoked struct {
	PayloadHasRevocations Payload `json:"HasRevocations" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasRevocations *Branch     `json:"-"`
	List           *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasRevocationsID int `json:"-" pg:", fk:HasRevocations"`
	ListID           int `json:"-" pg:", fk:List"`
}

// LegalTechnologyManipulating structure
type LegalTechnologyManipulating struct {
	PayloadHasManipulating Payload `json:"HasManipulating" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasManipulating *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasManipulatingID int `json:"-" pg:", fk:HasManipulating"`
	ListID            int `json:"-" pg:", fk:List"`
}

// LegalTechnologyUnauthorized structure
type LegalTechnologyUnauthorized struct {
	PayloadHasUnauthorized Payload `json:"HasUnauthorized" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasUnauthorized *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasUnauthorizedID int `json:"-" pg:", fk:HasUnauthorized"`
	ListID            int `json:"-" pg:", fk:List"`
}

// LegalTechnologyUnlawful structure
type LegalTechnologyUnlawful struct {
	PayloadHasUnlawful Payload `json:"HasUnlawful" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasUnlawful *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasUnlawfulID int `json:"-" pg:", fk:HasUnlawful"`
	ListID        int `json:"-" pg:", fk:List"`
}

// LegalAssociationsActivitiesToOverthrow structure
type LegalAssociationsActivitiesToOverthrow struct {
	PayloadHasActivities Payload `json:"HasActivities" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasActivities *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasActivitiesID int `json:"-" pg:", fk:HasActivities"`
	ListID          int `json:"-" pg:", fk:List"`
}

// LegalAssociationsAdvocating structure
type LegalAssociationsAdvocating struct {
	PayloadHasAdvocated Payload `json:"HasAdvocated" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasAdvocated *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasAdvocatedID int `json:"-" pg:", fk:HasAdvocated"`
	ListID         int `json:"-" pg:", fk:List"`
}

// LegalAssociationsEngagedInTerrorism structure
type LegalAssociationsEngagedInTerrorism struct {
	PayloadHasEngaged Payload `json:"HasEngaged" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasEngaged *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int `json:"-"`
	HasEngagedID int `json:"-" pg:", fk:HasEngaged"`
	ListID       int `json:"-" pg:", fk:List"`
}

// LegalAssociationsMembershipOverthrow structure
type LegalAssociationsMembershipOverthrow struct {
	PayloadHasOverthrow Payload `json:"HasOverthrow" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOverthrow *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasOverthrowID int `json:"-" pg:", fk:HasOverthrow"`
	ListID         int `json:"-" pg:", fk:List"`
}

// LegalAssociationsMembershipViolence structure
type LegalAssociationsMembershipViolence struct {
	PayloadHasViolence Payload `json:"HasViolence" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasViolence *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasViolenceID int `json:"-" pg:", fk:HasViolence"`
	ListID        int `json:"-" pg:", fk:List"`
}

// LegalAssociationsTerrorismAssociation structure
type LegalAssociationsTerrorismAssociation struct {
	PayloadHasTerrorism Payload `json:"HasTerrorism" sql:"-"`
	PayloadExplanation  Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	HasTerrorism *Branch   `json:"-"`
	Explanation  *Textarea `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasTerrorismID int `json:"-" pg:", fk:HasTerrorism"`
	ExplanationID  int `json:"-" pg:", fk:Explanation"`
}

// LegalAssociationsTerroristOrganization structure
type LegalAssociationsTerroristOrganization struct {
	PayloadHasTerrorist Payload `json:"HasTerrorist" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasTerrorist *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasTerroristID int `json:"-" pg:", fk:HasTerrorist"`
	ListID         int `json:"-" pg:", fk:List"`
}

// LegalComments subsection of identification section.
type LegalComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
