package api

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"html/template"
)

// sectionInformation represents a structure to quickly organize the different
// sections and subsections with the payload type(s).
type sectionInformation struct {
	name       string
	subsection string
	payload    string
	hashable   bool
}

var (
	catalogue = []sectionInformation{
		{
			name:       "Identification",
			subsection: "ApplicantName",
			payload:    "identification.name",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "Contacts",
			payload:    "identification.contacts",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "OtherNames",
			payload:    "identification.othernames",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "ApplicantBirthDate",
			payload:    "identification.birthdate",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "ApplicantBirthPlace",
			payload:    "identification.birthplace",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "ApplicantSSN",
			payload:    "identification.ssn",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "Physical",
			payload:    "identification.physical",
			hashable:   true,
		},
		{
			name:       "Identification",
			subsection: "Comments",
			payload:    "identification.comments",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Bankruptcy",
			payload:    "financial.bankruptcy",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Gambling",
			payload:    "financial.gambling",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Taxes",
			payload:    "financial.taxes",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Card",
			payload:    "financial.card",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Credit",
			payload:    "financial.credit",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Delinquent",
			payload:    "financial.delinquent",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Nonpayment",
			payload:    "financial.nonpayment",
			hashable:   true,
		},
		{
			name:       "Financial",
			subsection: "Comments",
			payload:    "financial.comments",
			hashable:   true,
		},
		{
			name:       "History",
			subsection: "Residence",
			payload:    "history.residence",
			hashable:   true,
		},
		{
			name:       "History",
			subsection: "Employment",
			payload:    "history.employment",
			hashable:   true,
		},
		{
			name:       "History",
			subsection: "Education",
			payload:    "history.education",
			hashable:   true,
		},
		{
			name:       "History",
			subsection: "Federal",
			payload:    "history.federal",
			hashable:   true,
		},
		{
			name:       "History",
			subsection: "Comments",
			payload:    "history.comments",
			hashable:   true,
		},
		{
			name:       "Relationships",
			subsection: "Marital",
			payload:    "relationships.status.marital",
			hashable:   true,
		},
		{
			name:       "Relationships",
			subsection: "Cohabitants",
			payload:    "relationships.status.cohabitant",
			hashable:   true,
		},
		{
			name:       "Relationships",
			subsection: "People",
			payload:    "relationships.people",
			hashable:   true,
		},
		{
			name:       "Relationships",
			subsection: "Relatives",
			payload:    "relationships.relatives",
			hashable:   true,
		},
		{
			name:       "Relationships",
			subsection: "Comments",
			payload:    "relationships.comments",
			hashable:   true,
		},
		{
			name:       "Citizenship",
			subsection: "Status",
			payload:    "citizenship.status",
			hashable:   true,
		},
		{
			name:       "Citizenship",
			subsection: "Multiple",
			payload:    "citizenship.multiple",
			hashable:   true,
		},
		{
			name:       "Citizenship",
			subsection: "Passports",
			payload:    "citizenship.passports",
			hashable:   true,
		},
		{
			name:       "Citizenship",
			subsection: "Comments",
			payload:    "citizenship.comments",
			hashable:   true,
		},
		{
			name:       "Military",
			subsection: "Selective",
			payload:    "military.selective",
			hashable:   true,
		},
		{
			name:       "Military",
			subsection: "History",
			payload:    "military.history",
			hashable:   true,
		},
		{
			name:       "Military",
			subsection: "Disciplinary",
			payload:    "military.disciplinary",
			hashable:   true,
		},
		{
			name:       "Military",
			subsection: "Foreign",
			payload:    "military.foreign",
			hashable:   true,
		},
		{
			name:       "Military",
			subsection: "Comments",
			payload:    "military.comments",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Passport",
			payload:    "foreign.passport",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Contacts",
			payload:    "foreign.contacts",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Travel",
			payload:    "foreign.travel",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "BenefitActivity",
			payload:    "foreign.activities.benefits",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "DirectActivity",
			payload:    "foreign.activities.direct",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "IndirectActivity",
			payload:    "foreign.activities.indirect",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "RealEstateActivity",
			payload:    "foreign.activities.realestate",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Support",
			payload:    "foreign.activities.support",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Advice",
			payload:    "foreign.business.advice",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Conferences",
			payload:    "foreign.business.conferences",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Contact",
			payload:    "foreign.business.contact",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Employment",
			payload:    "foreign.business.employment",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Family",
			payload:    "foreign.business.family",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Political",
			payload:    "foreign.business.political",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Sponsorship",
			payload:    "foreign.business.sponsorship",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Ventures",
			payload:    "foreign.business.ventures",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Voting",
			payload:    "foreign.business.voting",
			hashable:   true,
		},
		{
			name:       "Foreign",
			subsection: "Comments",
			payload:    "foreign.comments",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "DrugClearanceUses",
			payload:    "substance.drugs.clearance",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "PrescriptionUses",
			payload:    "substance.drugs.misuse",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "OrderedTreatments",
			payload:    "substance.drugs.ordered",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "DrugPublicSafetyUses",
			payload:    "substance.drugs.publicsafety",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "DrugInvolvements",
			payload:    "substance.drugs.purchase",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "DrugUses",
			payload:    "substance.drugs.usage",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "VoluntaryTreatments",
			payload:    "substance.drugs.voluntary",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "NegativeImpacts",
			payload:    "substance.alcohol.negative",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "OrderedCounselings",
			payload:    "substance.alcohol.ordered",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "VoluntaryCounselings",
			payload:    "substance.alcohol.voluntary",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "ReceivedCounselings",
			payload:    "substance.alcohol.additional",
			hashable:   true,
		},
		{
			name:       "Substance",
			subsection: "Comments",
			payload:    "substance.comments",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "ActivitiesToOverthrow",
			payload:    "legal.associations.activities-to-overthrow",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Advocating",
			payload:    "legal.associations.advocating",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "EngagedInTerrorism",
			payload:    "legal.associations.engaged-in-terrorism",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "MembershipOverthrow",
			payload:    "legal.associations.membership-overthrow",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "MembershipViolence",
			payload:    "legal.associations.membership-violence-or-force",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "TerrorismAssociation",
			payload:    "legal.associations.terrorism-association",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "TerroristOrganization",
			payload:    "legal.associations.terrorist-organization",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "NonCriminalCourtActions",
			payload:    "legal.court",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Debarred",
			payload:    "legal.investigations.debarred",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "History",
			payload:    "legal.investigations.history",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Revoked",
			payload:    "legal.investigations.revoked",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "PoliceOtherOffenses",
			payload:    "legal.police.additionaloffenses",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "PoliceDomesticViolence",
			payload:    "legal.police.domesticviolence",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "PoliceOffenses",
			payload:    "legal.police.offenses",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Manipulating",
			payload:    "legal.technology.manipulating",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Unauthorized",
			payload:    "legal.technology.unauthorized",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Unlawful",
			payload:    "legal.technology.unlawful",
			hashable:   true,
		},
		{
			name:       "Legal",
			subsection: "Comments",
			payload:    "legal.comments",
			hashable:   true,
		},
		{
			name:       "Psychological",
			subsection: "Competence",
			payload:    "psychological.competence",
			hashable:   true,
		},
		{
			name:       "Psychological",
			subsection: "Consultations",
			payload:    "psychological.consultations",
			hashable:   true,
		},
		{
			name:       "Psychological",
			subsection: "Diagnoses",
			payload:    "psychological.diagnoses",
			hashable:   true,
		},
		{
			name:       "Psychological",
			subsection: "ExistingConditions",
			payload:    "psychological.conditions",
			hashable:   true,
		},
		{
			name:       "Psychological",
			subsection: "Hospitalizations",
			payload:    "psychological.hospitalizations",
			hashable:   true,
		},
		{
			name:       "Psychological",
			subsection: "Comments",
			payload:    "psychological.comments",
			hashable:   true,
		},
		{
			name:       "Submission",
			subsection: "Releases",
			payload:    "submission.releases",
			hashable:   false,
		},
	}
)

// FormMetadata represents extra information associated with the application
// regarding its current state.
type FormMetadata struct {
	Locked bool
	Hash   string
}

// Metadata returns the application metadata.
func Metadata(context DatabaseService, account int, locked bool) []byte {
	meta := &FormMetadata{
		Locked: locked,
		Hash:   Hash(context, account),
	}
	js, _ := json.Marshal(meta)
	return js
}

// Application returns the application state in JSON format.
func Application(context DatabaseService, account int, hashable bool) []byte {
	application := make(map[string]map[string]Payload)

	for _, section := range catalogue {
		// If we only want hashable content but the section is not
		// considered hashable then go to the next item.
		if hashable && !section.hashable {
			continue
		}

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

		// application[section.name] = subsection(section.subsection, entity.Marshal())
		if _, ok := application[section.name]; !ok {
			application[section.name] = make(map[string]Payload)
		}
		application[section.name][section.subsection] = entity.Marshal()
	}

	js, _ := json.Marshal(application)
	return js
}

// Package an application for transmitting to cold storage
func Package(context DatabaseService, xml XMLService, account int, hashable bool) (template.HTML, error) {
	jsonBytes := Application(context, account, hashable)
	var js map[string]interface{}
	if err := json.Unmarshal(jsonBytes, &js); err != nil {
		return template.HTML(""), err
	}
	return xml.DefaultTemplate("application.xml", js)
}

// ApplicationData returns the entire application in a JSON structure.
func ApplicationData(context DatabaseService, account int, hashable bool) (map[string]interface{}, error) {
	jsonBytes := Application(context, account, hashable)
	var js map[string]interface{}
	if err := json.Unmarshal(jsonBytes, &js); err != nil {
		return nil, err
	}
	return js, nil
}

// PurgeAccountStorage removes all data associated with an account
func PurgeAccountStorage(context DatabaseService, account int) {
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

// Hash returns the SHA256 hash of the application state in hexadecimal
func Hash(context DatabaseService, account int) string {
	hash := sha256.Sum256(Application(context, account, true))
	return hex.EncodeToString(hash[:])
}

// subsection is a helper function to transform a payload in to a type easily
// converted to JSON.
func subsection(name string, payload Payload) map[string]Payload {
	simple := make(map[string]Payload)
	simple[name] = payload
	return simple
}
