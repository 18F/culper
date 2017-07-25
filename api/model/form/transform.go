package form

// transform provides a library of possible transformations to
// be made on a JSON structure converting it in to an Entity
// interface.
var transform = map[string]func() Entity{
	"checkbox":      func() Entity { return &Checkbox{} },
	"datecontrol":   func() Entity { return &DateControl{} },
	"daterange":     func() Entity { return &DateRange{} },
	"email":         func() Entity { return &Email{} },
	"location":      func() Entity { return &Location{} },
	"name":          func() Entity { return &Name{} },
	"notapplicable": func() Entity { return &NotApplicable{} },
	"number":        func() Entity { return &Number{} },
	"radio":         func() Entity { return &Radio{} },
	"ssn":           func() Entity { return &SSN{} },
	"telephone":     func() Entity { return &Telephone{} },
	"text":          func() Entity { return &Text{} },
	"textarea":      func() Entity { return &Textarea{} },
}
