package form

import "fmt"

// HairColorField stores the persons hair color
type HairColorField string

// Valid validates that a persons hair color matches one of the hair colors
func (f HairColorField) Valid() (bool, error) {
	hairColor := string(f)
	for _, color := range hairColors {
		if color == hairColor {
			return true, nil
		}
	}

	// Check if from enum of hair color
	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid hair color", hairColor)}
}

var hairColors = [...]string{
	"",
	"Bald",
	"Black",
	"Blonde or Strawberry",
	"Brown",
	"Gray or Partially Gray",
	"Red or Auburn",
	"Sandy",
	"White",
	"Blue",
	"Green",
	"Orange",
	"Pink",
	"Purple",
	"Unspecified or unknown",
}
