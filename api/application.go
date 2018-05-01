package api

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"html/template"
)

type sectionInformation struct {
	name       string
	subsection string
	payload    string
	hashable   bool
}

var (
	catalogue = []sectionInformation{
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicantName",
			payload:    "identification.name",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Contacts",
			payload:    "identification.contacts",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "OtherNames",
			payload:    "identification.othernames",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicantBirthDate",
			payload:    "identification.birthdate",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicantBirthPlace",
			payload:    "identification.birthplace",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "ApplicantSSN",
			payload:    "identification.ssn",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Physical",
			payload:    "identification.physical",
			hashable:   true,
		},
		sectionInformation{
			name:       "Identification",
			subsection: "Comments",
			payload:    "identification.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Bankruptcy",
			payload:    "financial.bankruptcy",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Gambling",
			payload:    "financial.gambling",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Taxes",
			payload:    "financial.taxes",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Card",
			payload:    "financial.card",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Credit",
			payload:    "financial.credit",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Delinquent",
			payload:    "financial.delinquent",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Nonpayment",
			payload:    "financial.nonpayment",
			hashable:   true,
		},
		sectionInformation{
			name:       "Financial",
			subsection: "Comments",
			payload:    "financial.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "History",
			subsection: "Residence",
			payload:    "history.residence",
			hashable:   true,
		},
		sectionInformation{
			name:       "History",
			subsection: "Employment",
			payload:    "history.employment",
			hashable:   true,
		},
		sectionInformation{
			name:       "History",
			subsection: "Education",
			payload:    "history.education",
			hashable:   true,
		},
		sectionInformation{
			name:       "History",
			subsection: "Federal",
			payload:    "history.federal",
			hashable:   true,
		},
		sectionInformation{
			name:       "History",
			subsection: "Comments",
			payload:    "history.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Marital",
			payload:    "relationships.status.marital",
			hashable:   true,
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Cohabitants",
			payload:    "relationships.status.cohabitant",
			hashable:   true,
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "People",
			payload:    "relationships.people",
			hashable:   true,
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Relatives",
			payload:    "relationships.relatives",
			hashable:   true,
		},
		sectionInformation{
			name:       "Relationships",
			subsection: "Comments",
			payload:    "relationships.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Status",
			payload:    "citizenship.status",
			hashable:   true,
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Multiple",
			payload:    "citizenship.multiple",
			hashable:   true,
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Passports",
			payload:    "citizenship.passports",
			hashable:   true,
		},
		sectionInformation{
			name:       "Citizenship",
			subsection: "Comments",
			payload:    "citizenship.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Military",
			subsection: "Selective",
			payload:    "military.selective",
			hashable:   true,
		},
		sectionInformation{
			name:       "Military",
			subsection: "History",
			payload:    "military.history",
			hashable:   true,
		},
		sectionInformation{
			name:       "Military",
			subsection: "Disciplinary",
			payload:    "military.disciplinary",
			hashable:   true,
		},
		sectionInformation{
			name:       "Military",
			subsection: "Foreign",
			payload:    "military.foreign",
			hashable:   true,
		},
		sectionInformation{
			name:       "Military",
			subsection: "Comments",
			payload:    "military.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Passport",
			payload:    "foreign.passport",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Contacts",
			payload:    "foreign.contacts",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Travel",
			payload:    "foreign.travel",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "BenefitActivity",
			payload:    "foreign.activities.benefits",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "DirectActivity",
			payload:    "foreign.activities.direct",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "IndirectActivity",
			payload:    "foreign.activities.indirect",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "RealEstateActivity",
			payload:    "foreign.activities.realestate",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Support",
			payload:    "foreign.activities.support",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Advice",
			payload:    "foreign.business.advice",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Conferences",
			payload:    "foreign.business.conferences",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Contact",
			payload:    "foreign.business.contact",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Employment",
			payload:    "foreign.business.employment",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Family",
			payload:    "foreign.business.family",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Political",
			payload:    "foreign.business.political",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Sponsorship",
			payload:    "foreign.business.sponsorship",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Ventures",
			payload:    "foreign.business.ventures",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Voting",
			payload:    "foreign.business.voting",
			hashable:   true,
		},
		sectionInformation{
			name:       "Foreign",
			subsection: "Comments",
			payload:    "foreign.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugClearanceUses",
			payload:    "substance.drugs.clearance",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "PrescriptionUses",
			payload:    "substance.drugs.misuse",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "OrderedTreatments",
			payload:    "substance.drugs.ordered",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugPublicSafetyUses",
			payload:    "substance.drugs.publicsafety",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugInvolvements",
			payload:    "substance.drugs.purchase",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "DrugUses",
			payload:    "substance.drugs.usage",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "VoluntaryTreatments",
			payload:    "substance.drugs.voluntary",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "NegativeImpacts",
			payload:    "substance.alcohol.negative",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "OrderedCounselings",
			payload:    "substance.alcohol.ordered",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "VoluntaryCounselings",
			payload:    "substance.alcohol.voluntary",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "ReceivedCounselings",
			payload:    "substance.alcohol.additional",
			hashable:   true,
		},
		sectionInformation{
			name:       "Substance",
			subsection: "Comments",
			payload:    "substance.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "ActivitiesToOverthrow",
			payload:    "legal.associations.activities-to-overthrow",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Advocating",
			payload:    "legal.associations.advocating",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "EngagedInTerrorism",
			payload:    "legal.associations.engaged-in-terrorism",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "MembershipOverthrow",
			payload:    "legal.associations.membership-overthrow",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "MembershipViolence",
			payload:    "legal.associations.membership-violence-or-force",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "TerrorismAssociation",
			payload:    "legal.associations.terrorism-association",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "TerroristOrganization",
			payload:    "legal.associations.terrorist-organization",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "NonCriminalCourtActions",
			payload:    "legal.court",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Debarred",
			payload:    "legal.investigations.debarred",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "History",
			payload:    "legal.investigations.history",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Revoked",
			payload:    "legal.investigations.revoked",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "PoliceOtherOffenses",
			payload:    "legal.police.additionaloffenses",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "PoliceDomesticViolence",
			payload:    "legal.police.domesticviolence",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "PoliceOffenses",
			payload:    "legal.police.offenses",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Manipulating",
			payload:    "legal.technology.manipulating",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Unauthorized",
			payload:    "legal.technology.unauthorized",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Unlawful",
			payload:    "legal.technology.unlawful",
			hashable:   true,
		},
		sectionInformation{
			name:       "Legal",
			subsection: "Comments",
			payload:    "legal.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Competence",
			payload:    "psychological.competence",
			hashable:   true,
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Consultations",
			payload:    "psychological.consultations",
			hashable:   true,
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Diagnoses",
			payload:    "psychological.diagnoses",
			hashable:   true,
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "ExistingConditions",
			payload:    "psychological.conditions",
			hashable:   true,
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Hospitalizations",
			payload:    "psychological.hospitalizations",
			hashable:   true,
		},
		sectionInformation{
			name:       "Psychological",
			subsection: "Comments",
			payload:    "psychological.comments",
			hashable:   true,
		},
		sectionInformation{
			name:       "Submission",
			subsection: "Releases",
			payload:    "submission.releases",
			hashable:   false,
		},
	}
)

type FormMetadata struct {
	Locked bool
	Hash   string
}

func Metadata(context DatabaseService, account int, locked bool) []byte {
	hash := Hash(context, account)
	meta := &FormMetadata{
		Locked: locked,
		Hash:   hex.EncodeToString(hash[:]),
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
func Package(context DatabaseService, xml XmlService, account int, hashable bool) template.HTML {
	jsonBytes := Application(context, account, hashable)
	var js map[string]interface{}
	if err := json.Unmarshal(jsonBytes, &js); err != nil {
		// NOTE: Maybe do something else here.
		return template.HTML("")
	}
	return xml.DefaultTemplate("application.xml", js)
}

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

// Hash returns the computed hash checksum of the application state
func Hash(context DatabaseService, account int) [sha256.Size]byte {
	return sha256.Sum256(Application(context, account, true))
}

func subsection(name string, payload Payload) map[string]Payload {
	simple := make(map[string]Payload)
	simple[name] = payload
	return simple
}
