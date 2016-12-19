package geo

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

const (
	// BingURI is the Bing REST API base uri
	BingURI = "http://dev.virtualearth.net/REST/v1/Locations"
)

// BingGeocoder is a geocoder that utilizes the Bing REST API
type BingGeocoder struct {
	apiKey string
}

// BirthPlace geocodes a person birthplace attributes
func (g BingGeocoder) BirthPlace(geoValues Values) (bool, Results, error) {
	results, err := g.Geocode(geoValues)
	return results.HasPartial(), results, err

}

// Geocode geocodes a set of geo values
func (g BingGeocoder) Geocode(geoValues Values) (results Results, err error) {

	v := url.Values{}
	if geoValues.County != "" || geoValues.State != "" {
		v.Set("adminDistrict", fmt.Sprintf("%v %v", geoValues.County, geoValues.State))
	}

	if geoValues.City != "" {
		v.Set("locality", geoValues.City)
	}
	return g.query(v, geoValues)
}

func (g BingGeocoder) query(v url.Values, geoValues Values) (results Results, err error) {
	v.Set("key", g.apiKey)

	var bingResp BingResponse
	uri := fmt.Sprintf("%v?%v", BingURI, v.Encode())
	fmt.Println(uri)

	// Make request
	resp, err := http.Get(uri)
	if err != nil {
		return nil, err
	}

	// Decode json
	if err := json.NewDecoder(resp.Body).Decode(&bingResp); err != nil {
		return nil, err
	}

	for _, r := range bingResp.ResourceSets {
		for _, resource := range r.Resources {
			result := resource.Result(geoValues)
			results = append(results, result)
		}
	}

	return results, err
}

// BingResponse represents the highest level container for a geocoding response
type BingResponse struct {
	ResourceSets []BingResourceSet `json:"resourceSets"`
	StatusCode   int
}

// BingResourceSet contains a listing of found geocoded resources
type BingResourceSet struct {
	EstimatedTotal int64
	Resources      []BingResource
	Confidence     string
}

// BingResource contains geolocation information for a specific resource containing an address
// MatchCodes contain the type of matching associated to the particular resultset
type BingResource struct {
	Address struct {
		AdminDistrict    string
		AdminDistrict2   string
		CountryRegion    string
		FormattedAddress string
		Locality         string
	}
	MatchCodes []string
}

// Result creates a normalized geo.Result struct from a BingResource
func (r BingResource) Result(geoValues Values) Result {
	result := Result{}

	result.City = r.Address.Locality
	result.County = r.Address.AdminDistrict2
	result.State = r.Address.AdminDistrict
	result.Country = r.Address.CountryRegion
	result.Formatted = r.Address.FormattedAddress

	for _, code := range r.MatchCodes {
		if code == "UpHierarchy" {
			result.Partial = true
			return result
		}
	}
	switch {
	case result.City != geoValues.City:
		fallthrough
	case result.State != geoValues.State:
		fallthrough
	case !result.CountyEqual(geoValues.County):
		result.Partial = true
	}

	return result
}

// NewBingGeocoder creates a new instance of geocoder that uses the Bing API
func NewBingGeocoder(apiKey string) *BingGeocoder {
	return &BingGeocoder{
		apiKey: apiKey,
	}
}
