package postgresql

import (
	"encoding/json"
	"strings"
)

// Unmarshal bytes in to the entity properties.
func (entity *Location) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Location) Marshal() Payload {
	return MarshalPayloadEntity("location", entity)
}

func (entity *Location) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Location) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Location) Get(context *db.DatabaseContext, account int) (int, error) {
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

	var stack model.ErrorStack
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
		results, err := geo.Geocode.Validate(
			geo.Values{
				Street:  string(entity.Street1),
				Street2: string(entity.Street2),
				City:    string(entity.City),
				State:   string(entity.State),
				Zipcode: string(entity.Zipcode),
			})

		if err != nil {
			stack.Append("Location", model.ErrInvalidLocation{
				Message:     err.Error(),
				Suggestions: results,
			})
		}
	}

	return !stack.HasErrors(), stack
}

func validateFields(entity *Location, props ...string) model.ErrorStack {
	var stack model.ErrorStack

	for _, prop := range props {
		switch strings.ToLower(prop) {
		case "street":
			street1 := strings.TrimSpace(entity.Street1)
			if street1 == "" {
				stack.Append("Location", model.ErrFieldRequired{"Missing street"})
			}
		case "city":
			city := strings.TrimSpace(entity.City)
			if city == "" {
				stack.Append("Location", model.ErrFieldRequired{"Missing city"})
			}
		case "state":
			state := strings.TrimSpace(entity.State)
			if state == "" {
				stack.Append("Location", model.ErrFieldRequired{"Missing state"})
			} else if !has(state, states...) {
				stack.Append("Location", model.ErrFieldInvalid{"Invalid state"})
			}
		case "zipcode":
			zipcode := strings.TrimSpace(entity.Zipcode)
			if zipcode == "" {
				stack.Append("Location", model.ErrFieldRequired{"Missing ZIP code"})
			}
		case "county":
			county := strings.TrimSpace(entity.County)
			if county == "" {
				stack.Append("Location", model.ErrFieldRequired{"Missing county"})
			}
		case "country":
			country := strings.TrimSpace(entity.Country)
			if country == "" {
				stack.Append("Location", model.ErrFieldRequired{"Missing country"})
			} else if !has(country, countries...) {
				stack.Append("Location", model.ErrFieldInvalid{"Invalid country"})
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
