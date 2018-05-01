package api

import "encoding/json"

// MilitarySelective represents the payload for the military service section.
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

// Unmarshal bytes in to the entity properties.
func (entity *MilitarySelective) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	wasBornAfter, err := entity.PayloadWasBornAfter.Entity()
	if err != nil {
		return err
	}
	entity.WasBornAfter = wasBornAfter.(*Branch)

	hasRegistered, err := entity.PayloadHasRegistered.Entity()
	if err != nil {
		return err
	}
	entity.HasRegistered = hasRegistered.(*Branch)

	registrationNumber, err := entity.PayloadRegistrationNumber.Entity()
	if err != nil {
		return err
	}
	entity.RegistrationNumber = registrationNumber.(*Text)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *MilitarySelective) Marshal() Payload {
	if entity.WasBornAfter != nil {
		entity.PayloadWasBornAfter = entity.WasBornAfter.Marshal()
	}
	if entity.HasRegistered != nil {
		entity.PayloadHasRegistered = entity.HasRegistered.Marshal()
	}
	if entity.RegistrationNumber != nil {
		entity.PayloadRegistrationNumber = entity.RegistrationNumber.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	return MarshalPayloadEntity("military.selective", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitarySelective) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.WasBornAfter.Valid(); !ok {
		stack.Append("MilitarySelective", err)
	}

	if entity.WasBornAfter.Value == "Yes" {
		if ok, err := entity.HasRegistered.Valid(); !ok {
			stack.Append("MilitarySelective", err)
		} else {
			if entity.HasRegistered.Value == "Yes" {
				if ok, err := entity.RegistrationNumber.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			} else if entity.HasRegistered.Value == "No" {
				if ok, err := entity.Explanation.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			}
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitarySelective) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	wasBornAfterID, err := entity.WasBornAfter.Save(context, account)
	if err != nil {
		return wasBornAfterID, err
	}
	entity.WasBornAfterID = wasBornAfterID

	hasRegisteredID, err := entity.HasRegistered.Save(context, account)
	if err != nil {
		return hasRegisteredID, err
	}
	entity.HasRegisteredID = hasRegisteredID

	registrationNumberID, err := entity.RegistrationNumber.Save(context, account)
	if err != nil {
		return registrationNumberID, err
	}
	entity.RegistrationNumberID = registrationNumberID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitarySelective) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.WasBornAfter.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasRegistered.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.RegistrationNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitarySelective) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.WasBornAfterID != 0 {
		entity.WasBornAfter = &Branch{ID: entity.WasBornAfterID}
		if _, err := entity.WasBornAfter.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasRegisteredID != 0 {
		entity.HasRegistered = &Branch{ID: entity.HasRegisteredID}
		if _, err := entity.HasRegistered.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.RegistrationNumberID != 0 {
		entity.RegistrationNumber = &Text{ID: entity.RegistrationNumberID}
		if _, err := entity.RegistrationNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		entity.Explanation = &Textarea{ID: entity.ExplanationID}
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *MilitarySelective) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitarySelective) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *MilitarySelective) Find(context DatabaseService) error {
	context.Find(&MilitarySelective{ID: entity.ID}, func(result interface{}) {
		previous := result.(*MilitarySelective)
		if entity.WasBornAfter == nil {
			entity.WasBornAfter = &Branch{}
		}
		entity.WasBornAfterID = previous.WasBornAfterID
		entity.WasBornAfter.ID = previous.WasBornAfterID
		if entity.HasRegistered == nil {
			entity.HasRegistered = &Branch{}
		}
		entity.HasRegisteredID = previous.HasRegisteredID
		entity.HasRegistered.ID = previous.HasRegisteredID
		if entity.RegistrationNumber == nil {
			entity.RegistrationNumber = &Text{}
		}
		entity.RegistrationNumberID = previous.RegistrationNumberID
		entity.RegistrationNumber.ID = previous.RegistrationNumberID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
	})
	return nil
}

// MilitaryHistory represents the payload for the military history section.
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

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryHistory) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasServed, err := entity.PayloadHasServed.Entity()
	if err != nil {
		return err
	}
	entity.HasServed = hasServed.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *MilitaryHistory) Marshal() Payload {
	if entity.HasServed != nil {
		entity.PayloadHasServed = entity.HasServed.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("military.history", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryHistory) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HasServed.Valid(); !ok {
		stack.Append("MilitaryHistory", err)
	}

	if entity.HasServed.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("MilitaryHistory", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryHistory) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasServedID, err := entity.HasServed.Save(context, account)
	if err != nil {
		return hasServedID, err
	}
	entity.HasServedID = hasServedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryHistory) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasServed.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryHistory) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasServedID != 0 {
		entity.HasServed = &Branch{ID: entity.HasServedID}
		if _, err := entity.HasServed.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *MilitaryHistory) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryHistory) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *MilitaryHistory) Find(context DatabaseService) error {
	context.Find(&MilitaryHistory{ID: entity.ID}, func(result interface{}) {
		previous := result.(*MilitaryHistory)
		if entity.HasServed == nil {
			entity.HasServed = &Branch{}
		}
		entity.HasServedID = previous.HasServedID
		entity.HasServed.ID = previous.HasServedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

// MilitaryDisciplinary represents the payload for the military disposition section.
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

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryDisciplinary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDisciplinary, err := entity.PayloadHasDisciplinary.Entity()
	if err != nil {
		return err
	}
	entity.HasDisciplinary = hasDisciplinary.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *MilitaryDisciplinary) Marshal() Payload {
	if entity.HasDisciplinary != nil {
		entity.PayloadHasDisciplinary = entity.HasDisciplinary.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("military.disciplinary", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryDisciplinary) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HasDisciplinary.Valid(); !ok {
		stack.Append("MilitaryDisciplinary", err)
	}

	if entity.HasDisciplinary.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("MilitaryDisciplinary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryDisciplinary) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasDisciplinaryID, err := entity.HasDisciplinary.Save(context, account)
	if err != nil {
		return hasDisciplinaryID, err
	}
	entity.HasDisciplinaryID = hasDisciplinaryID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryDisciplinary) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasDisciplinary.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryDisciplinary) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasDisciplinaryID != 0 {
		entity.HasDisciplinary = &Branch{ID: entity.HasDisciplinaryID}
		if _, err := entity.HasDisciplinary.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *MilitaryDisciplinary) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryDisciplinary) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *MilitaryDisciplinary) Find(context DatabaseService) error {
	context.Find(&MilitaryDisciplinary{ID: entity.ID}, func(result interface{}) {
		previous := result.(*MilitaryDisciplinary)
		if entity.HasDisciplinary == nil {
			entity.HasDisciplinary = &Branch{}
		}
		entity.HasDisciplinaryID = previous.HasDisciplinaryID
		entity.HasDisciplinary.ID = previous.HasDisciplinaryID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

// MilitaryForeign represents the payload for the military foreign section.
type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryForeign) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *MilitaryForeign) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("military.foreign", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryForeign) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.List.Valid(); !ok {
		stack.Append("MilitaryForeign", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryForeign) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryForeign) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryForeign) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *MilitaryForeign) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryForeign) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *MilitaryForeign) Find(context DatabaseService) error {
	context.Find(&MilitaryForeign{ID: entity.ID}, func(result interface{}) {
		previous := result.(*MilitaryForeign)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

// MilitaryComments represents the payload for the military comments section.
type MilitaryComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryComments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Text)

	return err
}

// Marshal to payload structure
func (entity *MilitaryComments) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("military.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *MilitaryComments) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return commentsID, err
	}
	entity.CommentsID = commentsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryComments) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryComments) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		entity.Comments = &Text{ID: entity.CommentsID}
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *MilitaryComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryComments) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *MilitaryComments) Find(context DatabaseService) error {
	context.Find(&MilitaryComments{ID: entity.ID}, func(result interface{}) {
		previous := result.(*MilitaryComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})
	return nil
}
