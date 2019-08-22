package api

import "encoding/json"

// SubstanceDrugUsage represents the payload for the substance drug usage section.
type SubstanceDrugUsage struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:UsedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugUsage) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugUsage) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.usage", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugUsage) ClearNoBranches() error {
	entity.UsedDrugs.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceDrugPurchase represents the payload for the substance drug purchase section.
type SubstanceDrugPurchase struct {
	PayloadInvolved Payload `json:"Involved" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	InvolvedID int `json:"-" pg:", fk:Involved"`
	ListID     int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugPurchase) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	involved, err := entity.PayloadInvolved.Entity()
	if err != nil {
		return err
	}
	entity.Involved = involved.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugPurchase) Marshal() Payload {
	if entity.Involved != nil {
		entity.PayloadInvolved = entity.Involved.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.purchase", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugPurchase) ClearNoBranches() error {
	entity.Involved.ClearNo()

	listErr := entity.List.ClearBranchItemsNo("InvolvementWhileEmployed", "InvolvementWithClearance", "InvolvementInFuture")
	if listErr != nil {
		return listErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// SubstanceDrugClearance represents the payload for the substance drug clearance section.
type SubstanceDrugClearance struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:UsedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugClearance) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugClearance) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.clearance", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugClearance) ClearNoBranches() error {
	entity.UsedDrugs.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceDrugPublicSafety represents the payload for the substance drug public safety section.
type SubstanceDrugPublicSafety struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:UsedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugPublicSafety) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugPublicSafety) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.publicsafety", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugPublicSafety) ClearNoBranches() error {
	entity.UsedDrugs.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceDrugMisuse represents the payload for the substance drug misuse section.
type SubstanceDrugMisuse struct {
	PayloadUsedDrugs Payload `json:"MisusedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:MisusedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugMisuse) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugMisuse) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.misuse", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugMisuse) ClearNoBranches() error {
	entity.UsedDrugs.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceDrugOrdered represents the payload for the substance drug ordered section.
type SubstanceDrugOrdered struct {
	PayloadTreatmentOrdered Payload `json:"TreatmentOrdered" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	TreatmentOrdered *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	InvolvedID int `json:"-" pg:", fk:TreatmentOrdered"`
	ListID     int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugOrdered) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	ordered, err := entity.PayloadTreatmentOrdered.Entity()
	if err != nil {
		return err
	}
	entity.TreatmentOrdered = ordered.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugOrdered) Marshal() Payload {
	if entity.TreatmentOrdered != nil {
		entity.PayloadTreatmentOrdered = entity.TreatmentOrdered.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.ordered", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugOrdered) ClearNoBranches() error {
	entity.TreatmentOrdered.ClearNo()
	clearErr := entity.List.ClearBranchItemsNo("ActionTaken")
	if clearErr != nil {
		return clearErr
	}
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceDrugVoluntary represents the payload for the substance drug voluntary section.
type SubstanceDrugVoluntary struct {
	PayloadTreatmentVoluntary Payload `json:"TreatmentVoluntary" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	TreatmentVoluntary *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	InvolvedID int `json:"-" pg:", fk:TreatmentVoluntary"`
	ListID     int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugVoluntary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	treatmentVoluntary, err := entity.PayloadTreatmentVoluntary.Entity()
	if err != nil {
		return err
	}
	entity.TreatmentVoluntary = treatmentVoluntary.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceDrugVoluntary) Marshal() Payload {
	if entity.TreatmentVoluntary != nil {
		entity.PayloadTreatmentVoluntary = entity.TreatmentVoluntary.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.voluntary", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceDrugVoluntary) ClearNoBranches() error {
	entity.TreatmentVoluntary.ClearNo()
	clearErr := entity.List.ClearBranchItemsNo("TreatmentCompleted")
	if clearErr != nil {
		return clearErr
	}
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceAlcoholNegative represents the payload for the substance alcohol negative section.
type SubstanceAlcoholNegative struct {
	PayloadHasImpacts Payload `json:"HasImpacts" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasImpacts *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int `json:"-"`
	HasImpactsID int `json:"-" pg:", fk:HasImpacts"`
	ListID       int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholNegative) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasImpacts, err := entity.PayloadHasImpacts.Entity()
	if err != nil {
		return err
	}
	entity.HasImpacts = hasImpacts.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceAlcoholNegative) Marshal() Payload {
	if entity.HasImpacts != nil {
		entity.PayloadHasImpacts = entity.HasImpacts.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.negative", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceAlcoholNegative) ClearNoBranches() error {
	entity.HasImpacts.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// SubstanceAlcoholOrdered represents the payload for the substance alcholo ordered section.
type SubstanceAlcoholOrdered struct {
	PayloadHasBeenOrdered Payload `json:"HasBeenOrdered" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBeenOrdered *Branch     `json:"-"`
	List           *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasBeenOrderedID int `json:"-" pg:", fk:HasBeenOrdered"`
	ListID           int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholOrdered) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasBeenOrdered, err := entity.PayloadHasBeenOrdered.Entity()
	if err != nil {
		return err
	}
	entity.HasBeenOrdered = hasBeenOrdered.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceAlcoholOrdered) Marshal() Payload {
	if entity.HasBeenOrdered != nil {
		entity.PayloadHasBeenOrdered = entity.HasBeenOrdered.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.ordered", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceAlcoholOrdered) ClearNoBranches() error {
	entity.HasBeenOrdered.ClearNo()

	listErr := entity.List.ClearBranchItemsNo("ActionTaken", "CompletedTreatment")
	if listErr != nil {
		return listErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// SubstanceAlcoholVoluntary represents the payload for the substance alcohol voluntary section.
type SubstanceAlcoholVoluntary struct {
	PayloadSoughtTreatment Payload `json:"SoughtTreatment" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	SoughtTreatment *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	SoughtTreatmentID int `json:"-" pg:", fk:SoughtTreatment"`
	ListID            int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholVoluntary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	soughtTreatment, err := entity.PayloadSoughtTreatment.Entity()
	if err != nil {
		return err
	}
	entity.SoughtTreatment = soughtTreatment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceAlcoholVoluntary) Marshal() Payload {
	if entity.SoughtTreatment != nil {
		entity.PayloadSoughtTreatment = entity.SoughtTreatment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.voluntary", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceAlcoholVoluntary) ClearNoBranches() error {
	entity.SoughtTreatment.ClearNo()

	clearErr := entity.List.ClearBranchItemsNo("CompletedTreatment")
	if clearErr != nil {
		return clearErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// SubstanceAlcoholAdditional represents the payload for the substance alcohol additional section.
type SubstanceAlcoholAdditional struct {
	PayloadReceivedTreatment Payload `json:"ReceivedTreatment" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	ReceivedTreatment *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	ReceivedTreatmentID int `json:"-" pg:", fk:ReceivedTreatment"`
	ListID              int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholAdditional) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	receivedTreatment, err := entity.PayloadReceivedTreatment.Entity()
	if err != nil {
		return err
	}
	entity.ReceivedTreatment = receivedTreatment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *SubstanceAlcoholAdditional) Marshal() Payload {
	if entity.ReceivedTreatment != nil {
		entity.PayloadReceivedTreatment = entity.ReceivedTreatment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.additional", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *SubstanceAlcoholAdditional) ClearNoBranches() error {
	entity.ReceivedTreatment.ClearNo()

	clearErr := entity.List.ClearBranchItemsNo("CompletedTreatment")
	if clearErr != nil {
		return clearErr
	}

	entity.List.ClearBranchNo()
	return nil
}
