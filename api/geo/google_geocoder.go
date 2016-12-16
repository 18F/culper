package geo

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

const (
	GmapsURI = "https://maps.googleapis.com/maps/api/geocode/json"
)

// GoogleGeocoder is a geocoder that uses the Google Maps Geocoding API
type GoogleGeocoder struct {
	apiKey string
}

// BirthPlace geocodes a person birth place
func (g GoogleGeocoder) BirthPlace(geoValues Values) (bool, []Result, error) {
	gmapValues := GmapValues{}

	if geoValues.County != "" {
		gmapValues.AddAdminArea(geoValues.County)
	}

	if geoValues.City != "" {
		gmapValues.AddLocality(geoValues.City)
	}

	if geoValues.State != "" {
		gmapValues.AddAdminArea(geoValues.State)
	}

	if geoValues.Country != "" {
		gmapValues.AddCountry(geoValues.Country)
	}

	v := url.Values{}
	v.Set("components", gmapValues.Encode())

	return g.query(v)
}

// query executes a query using the url parameters
func (g GoogleGeocoder) query(v url.Values) (partial bool, results []Result, err error) {
	v.Set("key", g.apiKey)
	// Execute query
	gResp, err := queryGmapGeocoder(v)
	if err != nil {
		return false, nil, err
	}

	for _, r := range gResp.Results {
		result := r.Result()
		result.Formatted = r.FormattedAddress
		results = append(results, result)

		if r.PartialMatch {
			partial = true
		}
	}

	return partial, results, err
}

// GmapValues stores component parameters that are defined for component filtering
// https://developers.google.com/maps/documentation/geocoding/intro#ComponentFiltering
type GmapValues []string

// AddAdminArea adds a filter that matches all administrative area levels
func (v *GmapValues) AddAdminArea(value string) {
	*v = append(*v, fmt.Sprintf("administrative_area:%s", value))
}

// AddLocality adds a filter that matches locality and sublocality
func (v *GmapValues) AddLocality(value string) {
	*v = append(*v, fmt.Sprintf("locality:%s", value))
}

// AddCountry adds a filter that matches on a country name or a two letter ISO 3166-1 country code.
func (v *GmapValues) AddCountry(value string) {
	*v = append(*v, fmt.Sprintf("country:%s", value))
}

// Encode converts the component filters into a formatted string in the following format:
// {filter0}:{value0}|{filter1}:{value1}
func (v GmapValues) Encode() string {
	return strings.Join(v, "|")
}

// GmapResponse stores the contents of a google maps api response
type GmapResponse struct {
	Results []GmapResult
	Status  string
}

// AddressComponent contains the structure for a Google Geocoding API address component
type AddressComponent struct {
	LongName  string `json:"long_name"`
	ShortName string `json:"short_name"`
	Types     []string
}

// GmapResult contains the structure for a google maps geocoding response
type GmapResult struct {
	AddressComponents []AddressComponent `json:"address_components"`
	FormattedAddress  string             `json:"formatted_address"`
	PartialMatch      bool               `json:"partial_match"`
}

// Result converts the Google result into a geo Result. The address types can be found at
// https://developers.google.com/maps/documentation/geocoding/intro#Types
func (r GmapResult) Result() Result {
	result := Result{}
	for _, addr := range r.AddressComponents {
		for _, t := range addr.Types {
			switch t {
			case "locality":
				result.City = addr.LongName
			case "administrative_area_level_2":
				result.County = addr.LongName
			case "administrative_area_level_1":
				result.State = addr.LongName
			case "country":
				result.Country = addr.LongName
			case "postal_code":
				result.Zipcode = addr.LongName
			}
		}
	}
	return result
}

// NewGoogleGeocoder creates a new Geocoder
func NewGoogleGeocoder(apiKey string) *GoogleGeocoder {
	return &GoogleGeocoder{
		apiKey: apiKey,
	}
}

func queryGmapGeocoder(v url.Values) (gResp GmapResponse, err error) {
	uri := fmt.Sprintf("%v?%v", GmapsURI, v.Encode())
	fmt.Println(uri)
	resp, err := http.Get(uri)
	if err != nil {
		return gResp, err
	}

	if err := json.NewDecoder(resp.Body).Decode(&gResp); err != nil {
		return gResp, err
	}

	switch gResp.Status {
	case "OK":
		return gResp, nil
	case "ZERO_RESULTS":
		return gResp, fmt.Errorf("No results found")
	case "OVER_QUERY_LIMIT":
		return gResp, fmt.Errorf("Over query limit")
	case "REQUEST_DENIED":
		return gResp, fmt.Errorf("Request was denied")
	case "INVALID_REQUEST":
		return gResp, fmt.Errorf("Request was invalid")
	case "UNKNOWN_ERROR":
		return gResp, fmt.Errorf("Unknown error has occurred")
	}

	return gResp, err
}
