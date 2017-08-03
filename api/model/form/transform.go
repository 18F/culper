package form

import (
	"github.com/18F/e-QIP-prototype/api/model"
)

// transform provides a library of possible transformations to
// be made on a JSON structure converting it in to an Entity
// interface.
var transform = map[string]func() model.Entity{
	"branch":                    func() model.Entity { return &Branch{} },
	"checkbox":                  func() model.Entity { return &Checkbox{} },
	"checkboxgroup":             func() model.Entity { return &CheckboxGroup{} },
	"collection":                func() model.Entity { return &Collection{} },
	"datecontrol":               func() model.Entity { return &DateControl{} },
	"daterange":                 func() model.Entity { return &DateRange{} },
	"email":                     func() model.Entity { return &Email{} },
	"height":                    func() model.Entity { return &Height{} },
	"location":                  func() model.Entity { return &Location{} },
	"name":                      func() model.Entity { return &Name{} },
	"notapplicable":             func() model.Entity { return &NotApplicable{} },
	"number":                    func() model.Entity { return &Number{} },
	"radio":                     func() model.Entity { return &Radio{} },
	"ssn":                       func() model.Entity { return &SSN{} },
	"telephone":                 func() model.Entity { return &Telephone{} },
	"text":                      func() model.Entity { return &Text{} },
	"textarea":                  func() model.Entity { return &Textarea{} },
	"identification.name":       func() model.Entity { return &IdentificationName{} },
	"identification.contacts":   func() model.Entity { return &IdentificationContacts{} },
	"identification.othernames": func() model.Entity { return &IdentificationOtherNames{} },
	"identification.birthdate":  func() model.Entity { return &IdentificationBirthDate{} },
	"identification.birthplace": func() model.Entity { return &IdentificationBirthPlace{} },
	"identification.ssn":        func() model.Entity { return &IdentificationSSN{} },
	"identification.physical":   func() model.Entity { return &IdentificationPhysical{} },
	"financial.bankruptcy":      func() model.Entity { return &FinancialBankruptcy{} },
	"financial.gambling":        func() model.Entity { return &FinancialGambling{} },
	"financial.taxes":           func() model.Entity { return &FinancialTaxes{} },
	"financial.card":            func() model.Entity { return &FinancialCard{} },
	"financial.credit":          func() model.Entity { return &FinancialCredit{} },
	"financial.delinquent":      func() model.Entity { return &FinancialDelinquent{} },
	"financial.nonpayment":      func() model.Entity { return &FinancialNonpayment{} },
}
