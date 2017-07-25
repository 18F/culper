package form

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/18F/e-QIP-prototype/api/geo"
)

// AddressField contains complete address information for an entity
type AddressField struct {
	Street  TextField
	Street2 TextField
	City    CityField
	State   StateField
	Zipcode ZipcodeField
	County  TextField
	Country CountryField
}

// Valid validates the location fields for an address
func (a AddressField) Valid() (bool, error) {

	var stack ErrorStack

	if ok, err := a.Street.Valid(); !ok {
		stack.Append("Address", err)
	}

	if ok, err := a.City.Valid(); !ok {
		stack.Append("City", err)
	}

	if ok, err := a.State.Valid(); !ok {
		stack.Append("State", err)
	}

	if ok, err := a.Country.Valid(); !ok {
		stack.Append("Country", err)
	}

	// Make sure non-geocoding validation checks are good
	if stack.HasErrors() {
		return false, stack
	}

	// Perform geocoding
	results, err := geo.Geocode.Validate(
		geo.Values{
			Street:  string(a.Street),
			Street2: string(a.Street2),
			City:    string(a.City),
			State:   string(a.State),
			Zipcode: string(a.Zipcode),
		})

	if err != nil {
		stack.Append("Address", ErrInvalidLocation{
			Message:     err.Error(),
			Suggestions: results,
		})
	}

	return !stack.HasErrors(), stack
}

// TextField is a generic container for required text
type TextField string

// Valid validates a TextField
func (t TextField) Valid() (bool, error) {
	if strings.TrimSpace(string(t)) == "" {
		return false, ErrFieldRequired{"TextField is required"}
	}
	return true, nil
}

// CityField stores city information
type CityField string

// Valid validates that a city value is valid. This includes that `unknown` is not entered and that
// the maximum number of characters is not exceeded
func (f CityField) Valid() (bool, error) {
	s := string(f)
	if strings.EqualFold(s, "unknown") {
		return false, ErrFieldInvalid{"unknown is an invalid value"}
	}

	if len([]rune(s)) > 100 {
		return false, ErrFieldInvalid{"exeeded the maximum number of characters"}
	}

	return true, nil
}

// StateField stores a state location
type StateField string

// Valid ensures that an appropriate state value is selected
func (f StateField) Valid() (bool, error) {
	s := string(f)
	for _, state := range stateList {
		if strings.EqualFold(state, s) {
			return true, nil
		}
	}

	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid state", s)}
}

var stateList = [...]string{
	"",
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
	"AS",
	"FQ",
	"GU",
	"HQ",
	"DQ",
	"JQ",
	"KQ",
	"MH",
	"FM",
	"MQ",
	"BQ",
	"MP",
	"PW",
	"LQ",
	"PR",
	"VI",
	"WQ",
	"AE",
	"AP",
	"AA",
}

// ZipcodeField stores a properly formatted zipcode
type ZipcodeField string

func (f ZipcodeField) Valid() (bool, error) {
	zip := string(f)
	if string(zip) == "" {
		return false, ErrFieldRequired{"Zipcode is required"}
	} else {
		if ok, _ := regexp.MatchString("^\\d{5}$", zip); !ok {
			return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid Zipcode", zip)}
		}
	}

	return true, nil
}

// CountryField stores a country location
type CountryField string

// Valid ensures that an appropriate county is selected
func (f CountryField) Valid() (bool, error) {
	s := string(f)
	for _, country := range countryList {
		if s == country {
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid country", s)}
}

var countryList = [...]string{
	"",
	"United States",
	"Afghanistan",
	"Akrotiri Sovereign Base Area",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Anguill",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Ashmore and Cartier Islands",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas, The",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Bassas da India",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burma",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Clipperton Island",
	"Cocos Keeling Islands",
	"Colombia",
	"Comoros",
	"Congo",
	"Congo, Democratic Republic of the",
	"Cook Islands",
	"Coral Sea Islands",
	"Costa Rica",
	"Ivoire",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Dhekelia Sovereign Base Area",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Etorofu, Habomai, Kunashiri And Shikotan Islands",
	"Europa Island",
	"Falkland Islands Islas Malvinas",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern and Antarctic Lands",
	"Gabon",
	"Gambia, The",
	"Gaza Strip",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Glorioso Islands",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Jan Mayen",
	"Japan",
	"Jersey",
	"Jordan",
	"Juan de Nova Island",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macau",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia, Federated States of",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"Netherlands Antilles",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"North Korea",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Panama",
	"Papua New Guinea",
	"Paracel Islands",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn Islands",
	"Poland",
	"Portugal",
	"Qatar",
	"Reunion",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Barthelemy",
	"Saint Helena",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Korea",
	"Spain",
	"Spratly Islands",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tromelin Island",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican City",
	"Venezuela",
	"Vietnam",
	"Wallis and Futuna",
	"West Bank",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
}
