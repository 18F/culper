package api

import (
	"encoding/json"
	"strings"
)

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

// Special layout flags for e-QIP integration for Country elements with CountriesNoUS type
const (
	LayoutBirthPlaceWithoutCountyNoUS = "Birthplace without County CountriesNoUS"
	LayoutBirthPlaceNoUS              = "Birthplace CountriesNoUS"
)

// Location is a basic input.
type Location struct {
	ID              int    `json:"-"`
	Layout          string `json:"layout"`
	Street1         string `json:"street,omitempty"`
	Street2         string `json:"street2,omitempty"`
	City            string `json:"city,omitempty"`
	State           string `json:"state,omitempty"`
	Zipcode         string `json:"zipcode,omitempty"`
	County          string `json:"county,omitempty"`
	Country         string `json:"country,omitempty"`
	CountryComments string `json:"countryComments,omitempty"`
	Validated       bool   `json:"validated,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Location) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Location) Marshal() Payload {
	return MarshalPayloadEntity("location", entity)
}

// Save the location to data storage.
func (entity *Location) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the location from data storage.
func (entity *Location) Delete(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the location from data storage.
func (entity *Location) Get(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Valid checks the value(s) against an battery of tests.
func (entity *Location) Valid() (bool, error) {
	if entity.Validated {
		return true, nil
	}

	var stack ErrorStack
	domestic := entity.IsDomestic()
	postoffice := entity.IsPostOffice()
	international := !domestic && !postoffice

	switch entity.Layout {
	case LayoutBirthPlace:
		if domestic {
			stack = validateFields(entity, "city", "state", "county")
		} else {
			stack = validateFields(entity, "city", "county")
		}
	case LayoutBirthPlaceWithoutCounty:
		if domestic {
			stack = validateFields(entity, "city", "state")
		} else {
			stack = validateFields(entity, "city", "county")
		}
	case LayoutCountry:
		stack = validateFields(entity, "country")
	case LayoutUSCityStateInternationalCity:
		if domestic {
			stack = validateFields(entity, "city", "state")
		} else {
			stack = validateFields(entity, "city", "country")
		}
	case LayoutUSCityStateInternationalCityCountry:
		if domestic {
			stack = validateFields(entity, "city", "state")
		} else {
			stack = validateFields(entity, "city", "country")
		}
	case LayoutCityState:
		stack = validateFields(entity, "city", "state")
	case LayoutStreetCityCountry:
		stack = validateFields(entity, "street", "city", "country")
	case LayoutCityCountry:
		stack = validateFields(entity, "city", "country")
	case LayoutUSCityStateZipcodeInternationalCity:
		if domestic {
			stack = validateFields(entity, "city", "state", "zipcode")
		} else {
			stack = validateFields(entity, "city", "country")
		}
	case LayoutCityStateCountry:
		stack = validateFields(entity, "city", "state", "country")
	case LayoutUSAddress:
		stack = validateFields(entity, "street", "city", "state", "zipcode")
	case LayoutStreetCity:
		stack = validateFields(entity, "street", "city")
	default:
		if domestic || postoffice {
			stack = validateFields(entity, "street", "city", "state", "zipcode")
		}
		stack = validateFields(entity, "street", "city", "country")
	}

	geocode := entity.Layout == LayoutAddress || entity.Layout == LayoutUSAddress
	if !stack.HasErrors() && !international && geocode {
		// Perform geocoding
		results, err := Geocode.Validate(
			GeocodeValues{
				Street:  string(entity.Street1),
				Street2: string(entity.Street2),
				City:    string(entity.City),
				State:   string(entity.State),
				Zipcode: string(entity.Zipcode),
			})

		if err != nil {
			stack.Append("Location", ErrInvalidLocation{
				Message:     err.Error(),
				Suggestions: results,
			})
		}
	}

	return !stack.HasErrors(), stack
}

func validateFields(entity *Location, props ...string) ErrorStack {
	var stack ErrorStack

	for _, prop := range props {
		switch strings.ToLower(prop) {
		case "street":
			street1 := strings.TrimSpace(entity.Street1)
			if street1 == "" {
				stack.Append("Location", ErrFieldRequired{"Missing street"})
			}
		case "city":
			city := strings.TrimSpace(entity.City)
			if city == "" {
				stack.Append("Location", ErrFieldRequired{"Missing city"})
			}
		case "state":
			state := strings.TrimSpace(entity.State)
			if state == "" {
				stack.Append("Location", ErrFieldRequired{"Missing state"})
			} else if !has(state, states...) {
				stack.Append("Location", ErrFieldInvalid{"Invalid state"})
			}
		case "zipcode":
			zipcode := strings.TrimSpace(entity.Zipcode)
			if zipcode == "" {
				stack.Append("Location", ErrFieldRequired{"Missing ZIP code"})
			}
		case "county":
			county := strings.TrimSpace(entity.County)
			if county == "" {
				stack.Append("Location", ErrFieldRequired{"Missing county"})
			}
		case "country":
			country := strings.TrimSpace(entity.Country)
			if country == "" {
				stack.Append("Location", ErrFieldRequired{"Missing country"})
			} else if !has(country, countries...) {
				stack.Append("Location", ErrFieldInvalid{"Invalid country"})
			}
		}
	}

	return stack
}

func has(target string, options ...string) bool {
	for _, option := range options {
		if strings.EqualFold(target, option) {
			return true
		}
	}

	return false
}

// GetID returns the entity identifier.
func (entity *Location) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Location) SetID(id int) {
	entity.ID = id
}

// Find is not used for locations. Please use the `Get` method.
func (entity *Location) Find(context DatabaseService) error {
	return nil
}

// IsDomestic returns whether the location is in the United States.
func (entity *Location) IsDomestic() bool {
	return entity.Country == "United States" || entity.Layout == LayoutUSAddress
}

// IsPostOffice returns whether the location is APO, FPO, or DPO.
func (entity *Location) IsPostOffice() bool {
	return entity.Country == "POSTOFFICE"
}

// IsInternational returns whether the location is outside the United States and not a postal address.
func (entity *Location) IsInternational() bool {
	return !entity.IsDomestic() && !entity.IsPostOffice()
}

// TODO: Read `states` and `countries` from an external source.
var (
	states = []string{
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

	countries = []string{
		"POSTOFFICE",
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
		"South Sudan",
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
)
