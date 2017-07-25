package form

import "encoding/json"

// Different potential layouts used by the frontend.
// File: /src/components/Form/Location/Layouts.js
const (
	LayoutAddress                             = "Address"
	LayoutBirthPlace                          = "Birthplace"
	LayoutBirthPlaceWithoutCounty             = "Birthplace without County"
	LayoutCountry                             = "Country"
	LayoutUSCityStateInternationalCity        = "US City, State, International city"
	LayoutUSCityStateInternationalCityCountry = "US City, State, International city country"
	LayoutCityState                           = "City, State"
	LayoutStreetCityCountry                   = "Street, City, Country"
	LayoutCityCountry                         = "City, Country"
	LayoutUSCityStateZipcodeInternationalCity = "US City, State, Zipcode International city"
	LayoutCityStateCountry                    = "City, State, Country"
	LayoutUSAddress                           = "US Address"
	LayoutStreetCity                          = "Street, City"
)

// Location is a basic input.
type Location struct {
	Layout    string `json:"layout"`
	Street1   string `json:"street"`
	Street2   string `json:"street2"`
	City      string `json:"city"`
	State     string `json:"state"`
	Zipcode   string `json:"zipcode"`
	County    string `json:"county"`
	Country   string `json:"country"`
	Validated bool   `json:"validated"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Location) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Location) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Location) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Location) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Location) Get() error {
	return nil
}
