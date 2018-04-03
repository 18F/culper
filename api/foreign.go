package api

import (
	"regexp"
)

var (
	formatPassportBook = regexp.MustCompile(`^[a-zA-Z]{1}[0-9]{6,9}$`)
	formatPassportCard = regexp.MustCompile(`^[cC]{1}[0-9]{8}$`)
)

type ForeignPassport struct {
	PayloadHasPassports Payload `json:"HasPassports" sql:"-"`
	PayloadName         Payload `json:"Name" sql:"-"`
	PayloadCard         Payload `json:"Card" sql:"-"`
	PayloadNumber       Payload `json:"Number" sql:"-"`
	PayloadIssued       Payload `json:"Issued" sql:"-"`
	PayloadExpiration   Payload `json:"Expiration" sql:"-"`
	PayloadComments     Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	HasPassports *Branch      `json:"-"`
	Name         *Name        `json:"-"`
	Card         *Radio       `json:"-"`
	Number       *Text        `json:"-"`
	Issued       *DateControl `json:"-"`
	Expiration   *DateControl `json:"-"`
	Comments     *Textarea    `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasPassportsID int `json:"-" pg:",fk:HasPassports"`
	NameID         int `json:"-" pg:",fk:Name"`
	CardID         int `json:"-" pg:",fk:Card"`
	NumberID       int `json:"-" pg:",fk:Number"`
	IssuedID       int `json:"-" pg:",fk:Issued"`
	ExpirationID   int `json:"-" pg:",fk:Expiration"`
	CommentsID     int `json:"-" pg:",fk:Comments"`
}

type ForeignContacts struct {
	PayloadHasForeignContacts Payload `json:"HasForeignContacts" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignContacts *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	HasForeignContactsID int `json:"-" pg:", fk:HasForeignContacts"`
	ListID               int `json:"-" pg:", fk:List"`
}

type ForeignTravel struct {
	PayloadHasForeignTravelOutside  Payload `json:"HasForeignTravelOutside" sql:"-"`
	PayloadHasForeignTravelOfficial Payload `json:"HasForeignTravelOfficial" sql:"-"`
	PayloadList                     Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignTravelOutside  *Branch     `json:"-"`
	HasForeignTravelOfficial *Branch     `json:"-"`
	List                     *Collection `json:"-"`

	// Persister specific fields
	ID                         int `json:"-"`
	HasForeignTravelOutsideID  int `json:"-" pg:", fk:HasForeignTravelOutside"`
	HasForeignTravelOfficialID int `json:"-" pg:", fk:HasForeignTravelOfficial"`
	ListID                     int `json:"-" pg:", fk:List"`
}

type ForeignActivitiesBenefits struct {
	PayloadHasBenefits Payload `json:"HasBenefits" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBenefits *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasBenefitsID int `json:"-" pg:", fk:HasBenefits"`
	ListID        int `json:"-" pg:", fk:List"`
}

type ForeignActivitiesDirect struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasInterestsID int `json:"-" pg:", fk:HasInterests"`
	ListID         int `json:"-" pg:", fk:List"`
}

type ForeignActivitiesIndirect struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasInterestsID int `json:"-" pg:", fk:HasInterests"`
	ListID         int `json:"-" pg:", fk:List"`
}

type ForeignActivitiesRealEstate struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasInterestsID int `json:"-" pg:", fk:HasInterests"`
	ListID         int `json:"-" pg:", fk:List"`
}

type ForeignActivitiesSupport struct {
	PayloadHasForeignSupport Payload `json:"HasForeignSupport" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignSupport *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasForeignSupportID int `json:"-" pg:", fk:HasForeignSupport"`
	ListID              int `json:"-" pg:", fk:List"`
}

type ForeignBusinessAdvice struct {
	PayloadHasForeignAdvice Payload `json:"HasForeignAdvice" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignAdvice *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasForeignAdviceID int `json:"-" pg:", fk:HasForeignAdvice"`
	ListID             int `json:"-" pg:", fk:List"`
}

type ForeignBusinessConferences struct {
	PayloadHasForeignConferences Payload `json:"HasForeignConferences" sql:"-"`
	PayloadList                  Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignConferences *Branch     `json:"-"`
	List                  *Collection `json:"-"`

	// Persister specific fields
	ID                      int `json:"-"`
	HasForeignConferencesID int `json:"-" pg:", fk:HasForeignConferences"`
	ListID                  int `json:"-" pg:", fk:List"`
}

type ForeignBusinessContact struct {
	PayloadHasForeignContact Payload `json:"HasForeignContact" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignContact *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasForeignContactID int `json:"-" pg:", fk:HasForeignContact"`
	ListID              int `json:"-" pg:", fk:List"`
}

type ForeignBusinessEmployment struct {
	PayloadHasForeignEmployment Payload `json:"HasForeignEmployment" sql:"-"`
	PayloadList                 Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignEmployment *Branch     `json:"-"`
	List                 *Collection `json:"-"`

	// Persister specific fields
	ID                     int `json:"-"`
	HasForeignEmploymentID int `json:"-" pg:", fk:HasForeignEmployment"`
	ListID                 int `json:"-" pg:", fk:List"`
}

type ForeignBusinessFamily struct {
	PayloadHasForeignFamily Payload `json:"HasForeignFamily" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignFamily *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasForeignFamilyID int `json:"-" pg:", fk:HasForeignFamily"`
	ListID             int `json:"-" pg:", fk:List"`
}

type ForeignBusinessPolitical struct {
	PayloadHasForeignPolitical Payload `json:"HasForeignPolitical" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignPolitical *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int `json:"-"`
	HasForeignPoliticalID int `json:"-" pg:", fk:HasForeignPolitical"`
	ListID                int `json:"-" pg:", fk:List"`
}

type ForeignBusinessSponsorship struct {
	PayloadHasForeignSponsorship Payload `json:"HasForeignSponsorship" sql:"-"`
	PayloadList                  Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignSponsorship *Branch     `json:"-"`
	List                  *Collection `json:"-"`

	// Persister specific fields
	ID                      int `json:"-"`
	HasForeignSponsorshipID int `json:"-" pg:", fk:HasForeignSponsorship"`
	ListID                  int `json:"-" pg:", fk:List"`
}

type ForeignBusinessVentures struct {
	PayloadHasForeignVentures Payload `json:"HasForeignVentures" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignVentures *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	HasForeignVenturesID int `json:"-" pg:", fk:HasForeignVentures"`
	ListID               int `json:"-" pg:", fk:List"`
}

type ForeignBusinessVoting struct {
	PayloadHasForeignVoting Payload `json:"HasForeignVoting" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignVoting *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasForeignVotingID int `json:"-" pg:", fk:HasForeignVoting"`
	ListID             int `json:"-" pg:", fk:List"`
}

// ForeignComments subsection of identification section.
type ForeignComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}
