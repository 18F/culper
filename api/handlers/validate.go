package handlers

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var (
	ErrInvalidSSN      = errors.New("Invalid Social Security Number")
	ErrInvalidPassport = errors.New("Invalid Passport Number")
	ErrInvalidAddress  = errors.New("Invalid address")
	ErrInvalidCity     = errors.New("Invalid city")
	ErrInvalidState    = errors.New("Invalid state")
	ErrInvalidZipcode  = errors.New("Invalid zipcode")
)

// Address candidate is a full address to be validated
type AddressCandidate struct {
	Address string
	City    string
	State   string
	Zipcode string
	Country string
}

// ValidationResult contains basic validation information for determining if a validation
// is valid and if not, an error message associated to it
type ValidationResult struct {
	Valid bool
	Error string
}

// AddressValidationResuls determines if an address validation request is valid, returns
// possible options and an error associated to it. The error is an interface{} to allow
// for any possible datatype to be used. e.g., maps, slices, text
type AddressValidationResult struct {
	Valid bool
	Error interface{}
	// Possible alternatives for a given address.
	Candidates interface{}
}

// ValidateSSN checks if a social security number is valid
func ValidateSSN(w http.ResponseWriter, r *http.Request) {
	ssn := mux.Vars(r)["ssn"]
	log.Println(fmt.Sprintf("Validating SSN: [%v]\n", ssn))

	EncodeJSON(w, ValidationResult{
		Valid: false,
		Error: ErrInvalidSSN.Error(),
	})
}

// ValidatePassport checks if a passport number is valid
func ValidatePassport(w http.ResponseWriter, r *http.Request) {
	passport := mux.Vars(r)["passport"]
	log.Println(fmt.Sprintf("Validating Passport Number: [%v]\n", passport))

	EncodeJSON(w, ValidationResult{
		Valid: true,
		Error: ErrInvalidPassport.Error(),
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
