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
			subsection: "ApplicantName",
			payload:    "identification.name",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Contacts",
			payload:    "identification.contacts",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "OtherNames",
			payload:    "identification.othernames",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicationBirthDate",
			payload:    "identification.birthdate",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicationBirthPlace",
			payload:    "identification.birthplace",
		},
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicationSSN",
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
			subsection: "Marital",
			payload:    "relationships.status.marital",
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Cohabitants",
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
			name:       "Citizenships",
			subsection: "Status",
			payload:    "citizenship.status",
		},
		sectionInformation{
			name:       "Citizenships",
			subsection: "Multiple",
			payload:    "citizenship.multiple",
		},
		sectionInformation{
			name:       "Citizenships",
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
			subsection: "BenefitActivity",
			payload:    "foreign.activities.benefits",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "DirectActivity",
			payload:    "foreign.activities.direct",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "IndirectActivity",
			payload:    "foreign.activities.indirect",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "RealEstateActivity",
			payload:    "foreign.activities.realestate",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Support",
			payload:    "foreign.activities.support",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Advice",
			payload:    "foreign.business.advice",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Conferences",
			payload:    "foreign.business.conferences",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Contact",
			payload:    "foreign.business.contact",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Employment",
			payload:    "foreign.business.employment",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Family",
			payload:    "foreign.business.family",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Political",
			payload:    "foreign.business.political",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Sponsorship",
			payload:    "foreign.business.sponsorship",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Ventures",
			payload:    "foreign.business.ventures",
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Voting",
			payload:    "foreign.business.voting",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugClearanceUses",
			payload:    "substance.drug.clearance",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "PrescriptionUses",
			payload:    "substance.drug.misuse",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "OrderedTreatments",
			payload:    "substance.drug.ordered",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugPublicSafetyUses",
			payload:    "substance.drug.publicsafety",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugInvolvements",
			payload:    "substance.drug.purchase",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugUses",
			payload:    "substance.drug.usage",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "VoluntaryTreatments",
			payload:    "substance.drug.voluntary",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "NegativeImpacts",
			payload:    "substance.alcohol.negative",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "OrderedCounselings",
			payload:    "substance.alcohol.ordered",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "VoluntaryCounselings",
			payload:    "substance.alcohol.voluntary",
		},
		sectionInformation{
			name:       "Substance",
			subsection: "ReceivedCounselings",
			payload:    "substance.alcohol.additional",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "ActivitiesToOverthrow",
			payload:    "legal.associations.activities-to-overthrow",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Advocating",
			payload:    "legal.associations.advocating",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "EngagedInTerrorism",
			payload:    "legal.associations.engaged-in-terrorism",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "MembershipOverthrow",
			payload:    "legal.associations.membership-overthrow",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "MembershipViolence",
			payload:    "legal.associations.membership-violence-or-force",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "TerrorismAssociation",
			payload:    "legal.associations.terrorism-association",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "TerroristOrganization",
			payload:    "legal.associations.terrorist-organization",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "NonCriminalCourtActions",
			payload:    "legal.court",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Debarred",
			payload:    "legal.investigations.debarred",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "History",
			payload:    "legal.investigations.history",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Revoked",
			payload:    "legal.investigations.revoked",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "PoliceOtherOffenses",
			payload:    "legal.police.additionaloffenses",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "PoliceDomesticViolence",
			payload:    "legal.police.domesticviolence",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "PoliceOffenses",
			payload:    "legal.police.offenses",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Manipulating",
			payload:    "legal.technology.manipulating",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Unauthorized",
			payload:    "legal.technology.unauthorized",
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Unlawful",
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
			subsection: "ExistingConditions",
			payload:    "psychological.conditions",
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Hospitalizations",
			payload:    "psychological.hospitalizations",
		},
	}
)

// Application returns the application state in JSON format.
func Application(context *db.DatabaseContext, account int) []byte {
	application := make(map[string]map[string]Payload)

	for _, section := range catalogue {
		payload := &Payload{
			Type: section.payload,
		}

		entity, err := payload.Entity()
		if err != nil {
			continue
		}

		if _, err = entity.Get(context, account); err != nil {
			continue
		}

		application[section.name] = subsection(section.subsection, entity.Marshal())
	}

	js, _ := json.MarshalIndent(application, "", "  ")
	return js
}

// PurgeAccountStorage removes all data associated with an account
func PurgeAccountStorage(context *db.DatabaseContext, account int) {
	for _, section := range catalogue {
		payload := &Payload{
			Type: section.payload,
		}

		entity, err := payload.Entity()
		if err != nil {
			continue
		}

		if _, err = entity.Delete(context, account); err != nil {
			continue
		}
	}
}

// Signature returns the computed hash checksum of the application state
func Signature(context *db.DatabaseContext, account int) [sha512.Size]byte {
	return sha512.Sum512(Application(context, account))
}

func subsection(name string, payload Payload) map[string]Payload {
	simple := make(map[string]Payload)
	simple[name] = payload
	return simple
}
