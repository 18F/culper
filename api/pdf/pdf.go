package pdf

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io/ioutil"
	"path"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/Jeffail/gabs"
)

var (
	DocumentTypes = []api.ArchivalPdf{
		{"Certification", "certification-SF86-November2016.template.pdf", "AdditionalComments", "CER"},
		{"Fair Credit Reporting", "credit-SF86-November2016.template.pdf", "Credit", "FCR"},
		{"Medical Release", "medical-SF86-November2016.template.pdf", "Medical", "MEL"},
		{"General Release", "general-SF86-November2016.template.pdf", "General", "REL"},
	}
)

// A PdfField represents the fixed-width placeholder in a ArchivalPdf template.
type field struct {
	name     string // field identifier as it appears in the template
	length   int    // the fixed-width length of the field
	getValue func(*gabs.Container) string
}

type Service struct {
	Env api.Settings
	Log api.LogService
}

// CreatePdf populates a template PDF with values from the application, using basic text subsitution.
// Field names (e.g., SSN) are replaced with application values, space padded to a fixed length to
// ensure that PDF object/xref byte offsets do not need to be updated. Assumes values are ASCII.
func (service Service) CreatePdf(application map[string]interface{}, pdfType api.ArchivalPdf, hash [sha256.Size]byte) ([]byte, error) {
	// Get application data into easily queryable form
	json, _ := gabs.Consume(application)

	signedOn := func(json *gabs.Container) string {
		return getSignedOn(json, pdfType.Section)
	}

	hexHash := func(json *gabs.Container) string {
		return hex.EncodeToString(hash[:])
	}

	// Field widths are based on monospaced font and fixed point size
	// used in PDF templates and their layout.
	fields := []field{
		{"SSN", 11, getSsn},
		{"FIRST_MIDDLE_LAST", 64, getFullName},
		{"SIGNED_ON", 10, signedOn},
		{"OTHER_NAMES", 77, getOtherNames},
		{"CITY_COUNTRY", 26, getCityCountry},
		{"STATE", 6, getState},
		{"ZIP_CODE", 10, getZipCode},
		{"DOB", 10, getDob},
		{"TELEPHONE", 20, getTelephone},
		{"STREET_ADDRESS", 40, getStreetAddress},
		{"APPLICATION_SHA256_HASH", 64, hexHash},
	}

	dat, err := ioutil.ReadFile(path.Join("pdf/templates", pdfType.Template))
	if err != nil {
		return nil, err
	}
	str := string(dat)

	for _, f := range fields {
		// PDF template field names are followed by one or more spaces
		re := f.name + "  *"

		// Pad field values with spaces to preserve PDF object/xref byte offsets
		format := "%-" + strconv.Itoa(f.length) + "s"

		str = regexp.MustCompile(re).ReplaceAllString(str, fmt.Sprintf(format, f.getValue(json)))
	}

	return []byte(str), nil
}

func (service Service) SignatureAvailable(application map[string]interface{}, pdfType api.ArchivalPdf) (*time.Time, bool) {
	json, _ := gabs.Consume(application)
	d := getSignedOnParts(json, pdfType.Section)
	// Ensure all date parts are non-empty
	if len(d) == 3 && d[0] != "" && d[1] != "" && d[2] != "" {
		year, _ := strconv.Atoi(d[2])
		month, _ := strconv.Atoi(d[0])
		day, _ := strconv.Atoi(d[1])

		signedOn := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
		return &signedOn, true
	}
	return nil, false
}

func getPath(json *gabs.Container, path string) string {
	value, _ := json.Path(path).Data().(string)
	return value
}

func getPaths(json *gabs.Container, prefix string, keys []string) []string {
	if prefix[len(prefix)-1:] != "." {
		prefix = prefix + "."
	}

	values := []string{}
	for _, k := range keys {
		values = append(values, getPath(json, prefix+k))
	}
	return values
}

// Location fields are one of few structures that are not persisted
// in JSON structure or database if they are empty; see location.go.
func getFullAddress(json *gabs.Container) (*gabs.Container, error) {
	path := "History.Residence.props.List.props.items"
	children, _ := json.Path(path).Children()
	for _, child := range children {
		present, _ := child.Path("Item.Dates.props.present").Data().(bool)
		if present == true {
			return child, nil
		}
	}
	return nil, errors.New("No address indicated as `present`")
}

func getStreetAddress(json *gabs.Container) string {
	full, err := getFullAddress(json)
	if err != nil {
		return ""
	}

	street := getPath(full, "Item.Address.props.street")
	street2 := getPath(full, "Item.Address.props.street2")

	if street2 != "" {
		street = street + ", " + street2
	}

	return street
}

func getTelephone(json *gabs.Container) string {
	path := "Identification.Contacts.props.PhoneNumbers.props.items"
	children, _ := json.Path(path).Children()
	for _, child := range children {
		// Return the first telephone phone number in the list

		prefix := "Item.Telephone.props."
		numberType := getPath(child, prefix+"type")
		number := getPath(child, prefix+"number")
		extension := getPath(child, prefix+"extension")
		if extension != "" {
			extension = " x" + extension
		}

		if numberType != "Domestic" {
			return number + extension
		}

		return fmt.Sprintf("(%s) %s-%s%s",
			number[0:3], number[3:6], number[6:], extension)
	}

	return ""
}

func getDob(json *gabs.Container) string {
	prefix := "Identification.ApplicantBirthDate.props.Date.props"
	keys := []string{"month", "day", "year"}
	values := getPaths(json, prefix, keys)

	return strings.Join(values, "/")
}

func getZipCode(json *gabs.Container) string {
	full, err := getFullAddress(json)
	if err != nil {
		return ""
	}

	return getPath(full, "Item.Address.props.zipcode")
}

func getState(json *gabs.Container) string {
	full, err := getFullAddress(json)
	if err != nil {
		return ""
	}
	return getPath(full, "Item.Address.props.state")
}

func getCityCountry(json *gabs.Container) string {
	full, err := getFullAddress(json)
	if err != nil {
		return ""
	}

	city := getPath(full, "Item.Address.props.city")
	country := getPath(full, "Item.Address.props.country")

	if country == "" || country == "United States" {
		return city
	}
	return city + ", " + country
}

func getOtherNames(json *gabs.Container) string {
	names := []string{}

	path := "Identification.OtherNames.props.List.props.items"
	children, _ := json.Path(path).Children()
	for _, child := range children {
		keys := []string{"first", "middle", "last"}
		values := getPaths(child, "Item.Name.props", keys)
		n := strings.Join(values, " ")
		names = append(names, n)
	}
	return strings.Join(names, ", ")
}

func getSignedOnParts(json *gabs.Container, docSubsection string) []string {
	prefix := "Submission.Releases.props." + docSubsection + ".props.Signature.props.Date.props"
	keys := []string{"month", "day", "year"}
	return getPaths(json, prefix, keys)
}

func getSignedOn(json *gabs.Container, docSubsection string) string {
	values := getSignedOnParts(json, docSubsection)
	return strings.Join(values, "/")
}

func getSsn(json *gabs.Container) string {
	prefix := "Identification.ApplicantSSN.props.ssn.props"
	keys := []string{"first", "middle", "last"}
	values := getPaths(json, prefix, keys)

	return strings.Join(values, "-")
}

func getFullName(json *gabs.Container) string {
	prefix := "Identification.ApplicantName.props.Name.props"
	keys := []string{"first", "middle", "last"}
	values := getPaths(json, prefix, keys)

	suffix := getPath(json, prefix+"suffix")
	if suffix == "Other" {
		suffix = getPath(json, prefix+"suffixOther")
	}
	if suffix != "" {
		values = append(values, suffix)
	}

	return strings.Join(values, " ")
}
