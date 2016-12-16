package geo

import (
	"fmt"
	"testing"
)

func TestGoogleGeocoder(t *testing.T) {
	g := NewGoogleGeocoder("AIzaSyB8Q_CBEVZ6IwKIHqn5Czt0EsWEACodot0")
	partial, results, err := g.BirthPlace(Values{
		County: "Loudoun County",
		City:   "Woodbridge",
		State:  "VA",
	})
	if err != nil {
		t.Error(err)
	}

	fmt.Println(partial)
	fmt.Println(results)

}
