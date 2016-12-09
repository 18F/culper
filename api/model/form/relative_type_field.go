package form

// RelativeTypeField represents different types of relatives.
// Mother Father Stepmother Stepfather FosterParent Child Stepchild Brother
// Sister Stepbrother Stepsister HalfBrother HalfSister FatherInLaw MotherInLaw
// Guardian
type RelativeTypeField string

func (f RelativeTypeField) Valid() (bool, error) {
	return true, nil
}
