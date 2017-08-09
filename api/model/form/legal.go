package form

import "encoding/json"

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
func (entity *LegalPoliceOffenses) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalPoliceOffenses) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceOffenses) Get() error {
	return nil
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
func (entity *LegalPoliceAdditionalOffenses) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalPoliceAdditionalOffenses) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceAdditionalOffenses) Get() error {
	return nil
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
func (entity *LegalPoliceDomesticViolence) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalPoliceDomesticViolence) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceDomesticViolence) Get() error {
	return nil
}

// Save will create or update the database.
func (entity *LegalCourt) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalCourt) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalCourt) Get() error {
	return nil
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
func (entity *LegalInvestigationsDebarred) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalInvestigationsDebarred) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsDebarred) Get() error {
	return nil
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
func (entity *LegalInvestigationsHistory) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalInvestigationsHistory) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsHistory) Get() error {
	return nil
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
func (entity *LegalInvestigationsRevoked) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalInvestigationsRevoked) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsRevoked) Get() error {
	return nil
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
func (entity *LegalTechnologyManipulating) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalTechnologyManipulating) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyManipulating) Get() error {
	return nil
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
func (entity *LegalTechnologyUnauthorized) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalTechnologyUnauthorized) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnauthorized) Get() error {
	return nil
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
func (entity *LegalTechnologyUnlawful) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalTechnologyUnlawful) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnlawful) Get() error {
	return nil
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
func (entity *LegalAssociationsActivitiesToOverthrow) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Get() error {
	return nil
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
func (entity *LegalAssociationsAdvocating) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsAdvocating) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsAdvocating) Get() error {
	return nil
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
func (entity *LegalAssociationsEngagedInTerrorism) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsEngagedInTerrorism) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsEngagedInTerrorism) Get() error {
	return nil
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
func (entity *LegalAssociationsMembershipOverthrow) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsMembershipOverthrow) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipOverthrow) Get() error {
	return nil
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
func (entity *LegalAssociationsMembershipViolence) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsMembershipViolence) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipViolence) Get() error {
	return nil
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
func (entity *LegalAssociationsTerrorismAssociation) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Get() error {
	return nil
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
func (entity *LegalAssociationsTerroristOrganization) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsTerroristOrganization) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerroristOrganization) Get() error {
	return nil
}
