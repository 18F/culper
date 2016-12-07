package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/truetandem/e-QIP-prototype/api/model/form"
)

// ValidateAddress checks if an entire address is valid
func ValidateAddress(w http.ResponseWriter, r *http.Request) {
	log.Println(fmt.Sprintf("Validating Full Address: [%v]\n"))

	var address form.AddressField
	DecodeJSON(r.Body, &address)
	log.Println(fmt.Sprintf("Validating Full Address: [%v]\n", address))

	_, err := address.Valid()
	EncodeErrJSON(w, err)
}

// ValidateCity checks if a city is valid
func ValidateCity(w http.ResponseWriter, r *http.Request) {
	city := mux.Vars(r)["city"]
	log.Println(fmt.Sprintf("Validating City: [%v]\n", city))
	_, err := form.CityField(city).Valid()
	stack := form.NewErrorStack("City", err)
	EncodeErrJSON(w, stack)
}

// ValidateZipcode checks if a zipcode is valid
func ValidateZipcode(w http.ResponseWriter, r *http.Request) {
	zipcode := mux.Vars(r)["zipcode"]
	log.Println(fmt.Sprintf("Validating Zipcode: [%v]\n", zipcode))

	_, err := form.ZipcodeField(zipcode).Valid()
	stack := form.NewErrorStack("Zipcode", err)
	EncodeErrJSON(w, stack)
}

// ValidateState checks if a state is valid
func ValidateState(w http.ResponseWriter, r *http.Request) {
	state := mux.Vars(r)["state"]
	log.Println(fmt.Sprintf("Validating State: [%v]\n", state))

	_, err := form.StateField(state).Valid()
	stack := form.NewErrorStack("State", err)
	EncodeErrJSON(w, stack)
}

// ValidateSSN checks if a social security number is valid
func ValidateSSN(w http.ResponseWriter, r *http.Request) {
	//ssn := mux.Vars(r)["ssn"]
	ssn := form.SSNField{}

	_, err := ssn.Valid()
	stack := form.NewErrorStack("SSN", err)
	EncodeErrJSON(w, stack)
}

// ValidatePassport checks if a passport number is valid
func ValidatePassport(w http.ResponseWriter, r *http.Request) {
	passport := mux.Vars(r)["passport"]
	log.Println(fmt.Sprintf("Validating Passport Number: [%v]\n", passport))

	_, err := form.PassportField(passport).Valid()
	stack := form.NewErrorStack("Passport", err)
	EncodeErrJSON(w, stack)
}
