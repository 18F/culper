package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// LegalCourt structure
type LegalCourt struct {
	HasCourtActions Payload
	List            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalCourt) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalCourt) Valid() (bool, error) {
	b, err := entity.HasCourtActions.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// LegalPoliceOffenses structure
type LegalPoliceOffenses struct {
	HasOffenses Payload
	List        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceOffenses) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceOffenses) Valid() (bool, error) {
	b, err := entity.HasOffenses.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceOffenses) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalPoliceOffenses) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceOffenses) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalPoliceAdditionalOffenses structure
type LegalPoliceAdditionalOffenses struct {
	HasOtherOffenses Payload
	List             Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceAdditionalOffenses) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceAdditionalOffenses) Valid() (bool, error) {
	b, err := entity.HasOtherOffenses.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceAdditionalOffenses) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalPoliceAdditionalOffenses) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceAdditionalOffenses) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalPoliceDomesticViolence structure
type LegalPoliceDomesticViolence struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceDomesticViolence) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceDomesticViolence) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceDomesticViolence) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalPoliceDomesticViolence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceDomesticViolence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Save will create or update the database.
func (entity *LegalCourt) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalCourt) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalCourt) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalInvestigationsDebarred structure
type LegalInvestigationsDebarred struct {
	HasDebarment Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsDebarred) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsDebarred) Valid() (bool, error) {
	b, err := entity.HasDebarment.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsDebarred) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalInvestigationsDebarred) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the (int, database).
func (entity *LegalInvestigationsDebarred) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalInvestigationsHistory structure
type LegalInvestigationsHistory struct {
	HasHistory Payload
	List       Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsHistory) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsHistory) Valid() (bool, error) {
	b, err := entity.HasHistory.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsHistory) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalInvestigationsHistory) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsHistory) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalInvestigationsRevoked structure
type LegalInvestigationsRevoked struct {
	HasRevocations Payload
	List           Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsRevoked) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsRevoked) Valid() (bool, error) {
	b, err := entity.HasRevocations.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsRevoked) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalInvestigationsRevoked) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsRevoked) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalTechnologyManipulating structure
type LegalTechnologyManipulating struct {
	HasManipulating Payload
	List            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyManipulating) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyManipulating) Valid() (bool, error) {
	b, err := entity.HasManipulating.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyManipulating) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalTechnologyManipulating) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyManipulating) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalTechnologyUnauthorized structure
type LegalTechnologyUnauthorized struct {
	HasUnauthorized Payload
	List            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyUnauthorized) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyUnauthorized) Valid() (bool, error) {
	b, err := entity.HasUnauthorized.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyUnauthorized) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalTechnologyUnauthorized) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnauthorized) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalTechnologyUnlawful structure
type LegalTechnologyUnlawful struct {
	HasUnlawful Payload
	List        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyUnlawful) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyUnlawful) Valid() (bool, error) {
	b, err := entity.HasUnlawful.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyUnlawful) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalTechnologyUnlawful) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnlawful) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsActivitiesToOverthrow structure
type LegalAssociationsActivitiesToOverthrow struct {
	HasActivities Payload
	List          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsActivitiesToOverthrow) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsActivitiesToOverthrow) Valid() (bool, error) {
	b, err := entity.HasActivities.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsAdvocating structure
type LegalAssociationsAdvocating struct {
	HasAdvocated Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsAdvocating) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsAdvocating) Valid() (bool, error) {
	b, err := entity.HasAdvocated.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsAdvocating) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsAdvocating) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsAdvocating) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsEngagedInTerrorism structure
type LegalAssociationsEngagedInTerrorism struct {
	HasEngaged Payload
	List       Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsEngagedInTerrorism) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsEngagedInTerrorism) Valid() (bool, error) {
	b, err := entity.HasEngaged.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsEngagedInTerrorism) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsEngagedInTerrorism) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsEngagedInTerrorism) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsMembershipOverthrow structure
type LegalAssociationsMembershipOverthrow struct {
	HasOverthrow Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsMembershipOverthrow) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsMembershipOverthrow) Valid() (bool, error) {
	b, err := entity.HasOverthrow.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsMembershipOverthrow) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsMembershipOverthrow) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipOverthrow) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsMembershipViolence structure
type LegalAssociationsMembershipViolence struct {
	HasViolence Payload
	List        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsMembershipViolence) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsMembershipViolence) Valid() (bool, error) {
	b, err := entity.HasViolence.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsMembershipViolence) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsMembershipViolence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipViolence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsTerrorismAssociation structure
type LegalAssociationsTerrorismAssociation struct {
	HasTerrorism Payload
	Explanation  Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsTerrorismAssociation) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsTerrorismAssociation) Valid() (bool, error) {
	b, err := entity.HasTerrorism.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.Explanation.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsTerrorismAssociation) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsTerroristOrganization structure
type LegalAssociationsTerroristOrganization struct {
	HasTerrorist Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsTerroristOrganization) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsTerroristOrganization) Valid() (bool, error) {
	b, err := entity.HasTerrorist.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsTerroristOrganization) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsTerroristOrganization) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerroristOrganization) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
