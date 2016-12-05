package form

import (
	"fmt"
	"testing"
)

type CustomTextField struct {
	Firstname TextField `minLength:"4"`
}

func TestRule(t *testing.T) {

	v, ok := MinLength("Firstname", CustomTextField{})
	if ok {
		fmt.Println(v)
	}

}
