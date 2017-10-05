package form

import (
	"crypto/sha512"
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

type sectionInformation struct {
	name       string
	subsection string
	payload    string
}

// TODO: Fix the section/subsections to align appropriately
var (
	catalogue = []sectionInformation{
		sectionInformation{
			name:       "Identification",
			subsection: "Name",
			payload:    "identification.name",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Contacts",
			payload:    "identification.contacts",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Othernames",
			payload:    "identification.othernames",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Birthdate",
			payload:    "identification.birthdate",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Birthplace",
			payload:    "identification.birthplace",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Ssn",
			payload:    "identification.ssn",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Physical",
			payload:    "identification.physical",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Bankruptcy",
			payload:    "financial.bankruptcy",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Gambling",
			payload:    "financial.gambling",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Taxes",
			payload:    "financial.taxes",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Card",
			payload:    "financial.card",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Credit",
			payload:    "financial.credit",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Delinquent",
			payload:    "financial.delinquent",
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Nonpayment",
			payload:    "financial.nonpayment",
		},
		sectionInformation{
			name:       "History",
			subsection: "Residence",
			payload:    "history.residence",
		},
		sectionInformation{
			name:       "History",
			subsection: "Employment",
			payload:    "history.employment",
		},
		sectionInformation{
			name:       "History",
			subsection: "Education",
			payload:    "history.education",
		},
		sectionInformation{
			name:       "History",
			subsection: "Federal",
			payload:    "history.federal",
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Status",
			payload:    "relationships.status.marital",
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Status",
			payload:    "relationships.status.cohabitant",
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "People",
			payload:    "relationships.people",
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Relatives",
			payload:    "relationships.relatives",
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Status",
			payload:    "citizenship.status",
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Multiple",
			payload:    "citizenship.multiple",
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Passports",
			payload:    "citizenship.passports",
		},
		sectionInformation{
			name:       "Military",
			subsection: "Selective",
			payload:    "military.selective",
		},
		sectionInformation{
			name:       "Military",
			subsection: "History",
			payload:    "military.history",
		},
		sectionInformation{
			name:       "Military",
			subsection: "Disciplinary",
			payload:    "military.disciplinary",
		},
		sectionInformation{
			name:       "Military",
			subsection: "Foreign",
			payload:    "military.foreign",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Passport",
			payload:    "foreign.passport",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Contacts",
			payload:    "foreign.contacts",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Travel",
			payload:    "foreign.travel",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Activities",
			payload:    "foreign.activities.benefits",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Activities",
			payload:    "foreign.activities.direct",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Activities",
			payload:    "foreign.activities.indirect",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Activities",
			payload:    "foreign.activities.realestate",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Activities",
			payload:    "foreign.activities.support",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.advice",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.conferences",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.contact",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.employment",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.family",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.political",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.sponsorship",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.ventures",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Business",
			payload:    "foreign.business.voting",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.clearance",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.misuse",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.ordered",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.publicsafety",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.purchase",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.usage",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Drug",
			payload:    "substance.drug.voluntary",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Alcohol",
			payload:    "substance.alcohol.negative",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Alcohol",
			payload:    "substance.alcohol.ordered",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Alcohol",
			payload:    "substance.alcohol.voluntary",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Alcohol",
			payload:    "substance.alcohol.additional",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.activities-to-overthrow",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.advocating",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.engaged-in-terrorism",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.membership-overthrow",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.membership-violence-or-force",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.terrorism-association",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Associations",
			payload:    "legal.associations.terrorist-organization",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Court",
			payload:    "legal.court",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Investigations",
			payload:    "legal.investigations.debarred",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Investigations",
			payload:    "legal.investigations.history",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Investigations",
			payload:    "legal.investigations.revoked",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Police",
			payload:    "legal.police.additionaloffenses",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Police",
			payload:    "legal.police.domesticviolence",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Police",
			payload:    "legal.police.offenses",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Technology",
			payload:    "legal.technology.manipulating",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Technology",
			payload:    "legal.technology.unauthorized",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Technology",
			payload:    "legal.technology.unlawful",
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Competence",
			payload:    "psychological.competence",
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Consultations",
			payload:    "psychological.consultations",
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Diagnoses",
			payload:    "psychological.diagnoses",
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Conditions",
			payload:    "psychological.conditions",
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Hospitalizations",
			payload:    "psychological.hospitalizations",
		},
	}
)

// Application represents all of the state.
type Application map[string][]byte

// GetState returns the application state in JSON format.
func (application *Application) GetState(context *db.DatabaseContext, account int) []byte {
	for _, section := range catalogue {
		payload := &Payload{
			Type: section.payload,
		}

		entity, err := payload.Entity()
		if err != nil {
			application[section.name] = subsection(section.subsection, `{}`)
			continue
		}

		if _, err = entity.Get(context, account); err != nil {
			application[section.name] = subsection(section.subsection, `{}`)
			continue
		}

		application[section.name] = subsection(section.subsection, entity.Marshal())
	}

	js, _ := json.Marshal(entity)
	return js
}

// Signature returns the computed hash checksum of the application state
func (application *Application) Signature(context *db.DatabaseContext, account int) []byte {
	return sha512.Sum512(application.GetState(context, account))
}

func subsection(name string, payload Payload) []byte {
	var simple map[string]Payload
	simple[name] = payload
	raw, _ := json.Marshal(simple)
	return raw
}
