package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Address candidate is a full address to be validated
type AddressCandidate struct {
	Address string
	City    string
	State   string
	Zipcode string
	Country string
}

// AddressValidationResuls determines if an address validation request is valid, returns
// possible options and an error associated to it.
type AddressValidationResult struct {
	Valid  bool
	Errors error
	// Possible alternatives for a given address.
	Candidates interface{}
}

// ErrInvalidAddress allows for custom data to be sent across. Just
// for prototype purposes. TODO
type ErrInvalidAddress struct {
	Errors []string
}

func (e ErrInvalidAddress) Error() string {
	return "Errors"
}

func (e *ErrInvalidAddress) Add(invalid string) {
	e.Errors = append(e.Errors, invalid)
}

// ValidateSSN checks if a social security number is valid
func ValidateSSN(w http.ResponseWriter, r *http.Request) {
	ssn := mux.Vars(r)["ssn"]
	log.Println(fmt.Sprintf("Validating SSN: [%v]\n", ssn))

	EncodeJSON(w, AddressValidationResult{
		Valid: true,
	})
}

// ValidatePassport checks if a passport number is valid
func ValidatePassport(w http.ResponseWriter, r *http.Request) {
	passport := mux.Vars(r)["passport"]
	log.Println(fmt.Sprintf("Validating Passport Number: [%v]\n", passport))

	EncodeJSON(w, AddressValidationResult{
		Valid: true,
	})
}

// ValidateAddress checks if an entire address is valid
func ValidateAddress(w http.ResponseWriter, r *http.Request) {
	var candidate AddressCandidate

	DecodeJSON(r.Body, &candidate)

	EncodeJSON(w, AddressValidationResult{
		Valid:      true,
		Candidates: candidate,
	})
}

// ValidateCity checks if a city is valid
func ValidateCity(w http.ResponseWriter, r *http.Request) {
	city := mux.Vars(r)["city"]
	log.Println(fmt.Sprintf("Validating City: [%v]\n", city))

	// TODO: Just to demonstrate error possibilities
	if city == "error" {
		cityErr := ErrInvalidAddress{}
		cityErr.Add("Error description 1")
		cityErr.Add("Error description 2")

		EncodeJSON(w, AddressValidationResult{
			Valid:  true,
			Errors: cityErr,
		})
		return
	}

	EncodeJSON(w, AddressValidationResult{
		Valid: true,
	})
}

// ValidateZipcode checks if a zipcode is valid
func ValidateZipcode(w http.ResponseWriter, r *http.Request) {
	zipcode := mux.Vars(r)["zipcode"]
	log.Println(fmt.Sprintf("Validating Zipcode: [%v]\n", zipcode))

	EncodeJSON(w, AddressValidationResult{
		Valid: true,
	})
}

// ValidateState checks if a state is valid
func ValidateState(w http.ResponseWriter, r *http.Request) {
	state := mux.Vars(r)["state"]

	log.Println(fmt.Sprintf("Validating State: [%v]\n", state))

	EncodeJSON(w, AddressValidationResult{
		Valid: true,
	})
}
