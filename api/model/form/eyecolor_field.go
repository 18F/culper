package form

import "fmt"

// EyeColorField stores the persons eye color
type EyeColorField string

// Valid validates that a person eye color matches against one of the eye color items
func (f EyeColorField) Valid() (bool, error) {
	eyeColor := string(f)
	for _, color := range hairColors {
		if color == eyeColor {
			return true, nil
		}
	}

	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid eye color", eyeColor)}
}

var eyeColors = [...]string{
	"",
	"Black",
	"Blue",
	"Brown",
	"Gray",
	"Green",
	"Hazel",
	"Maroon",
	"Multicolored",
	"Pink",
	"Unknown",
}
