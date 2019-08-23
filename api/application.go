package api

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api/eqip"
)

// Application represents a single SF application
type Application struct {
	AccountID   int
	formType    string
	formVersion string
	sections    map[string]Section
}

// BlankApplication returns a constructed Application
func BlankApplication(accountID int, formType string, formVersion string) Application {
	return Application{
		AccountID:   accountID,
		formType:    formType,
		formVersion: formVersion,
	}
}

// Section returns a single section of the application, by identifier
func (a Application) Section(identifier string) Section {
	return a.sections[identifier]
}

// SetSection sets a section in the application
func (a *Application) SetSection(section Section) {
	sectionPayload := section.Marshal()
	id := sectionPayload.Type

	if a.sections == nil {
		a.sections = make(map[string]Section)
	}

	a.sections[id] = section
}

// MarshalJSON implements json.Marshaller to custom marshal our JSON.
func (a Application) MarshalJSON() ([]byte, error) {
	applicationPayload := make(map[string]map[string]Payload)

	for _, section := range catalogue {
		entity := a.Section(section.Payload)
		if entity == nil {
			continue
		}

		if _, ok := applicationPayload[section.Name]; !ok {
			applicationPayload[section.Name] = make(map[string]Payload)
		}
		applicationPayload[section.Name][section.Subsection] = entity.Marshal()
	}

	// set the metadata for the form
	metadata := make(map[string]string)
	metadata["type"] = "metadata"

	metadata["form_type"] = a.formType
	metadata["form_version"] = a.formVersion

	// Since `applicationPayload` is typed to have a Payload as the map value and we
	// want to have a simpler metatadata section, we have to copy to a less-typed
	// map and then add the metadata.
	unsafeApplication := make(map[string]interface{})
	for k := range applicationPayload {
		unsafeApplication[k] = applicationPayload[k]
	}
	unsafeApplication["Metadata"] = metadata

	return json.Marshal(unsafeApplication)

}

// UnmarshalJSON implements json.Unmarshaller
func (a *Application) UnmarshalJSON(bytes []byte) error {
	unsafeApplication := map[string]map[string]json.RawMessage{}

	unErr := json.Unmarshal(bytes, &unsafeApplication)
	if unErr != nil {
		return unErr
	}

	for _, section := range catalogue {

		nameSection, ok := unsafeApplication[section.Name]
		if !ok {
			continue
		}

		rawPayload, ok := nameSection[section.Subsection]
		if !ok {
			continue
		}

		var payload Payload
		payloadErr := json.Unmarshal(rawPayload, &payload)
		if payloadErr != nil {
			return payloadErr
		}

		entity, entityErr := payload.Entity()
		if entityErr != nil {
			return entityErr
		}

		//TODO: Make this cleaner.
		section, ok := entity.(Section)
		if !ok {
			return errors.New("We unmarshalled a section that was not a section")
		}

		a.SetSection(section)

	}

	return nil
}

func (a Application) FormType() string {
	return a.formType
}

func (a Application) FormVersion() string {
	return a.formVersion
}

// Hash returns the SHA256 hash of the application state in hexadecimal
func (a *Application) Hash() (string, error) {
	jsonBytes, jsonErr := json.Marshal(a)
	if jsonErr != nil {
		return "", errors.Wrap(jsonErr, "Unable to generate hash")
	}

	// TODO: do we care about excluding some sections from the hash? Here would be where.
	hash := sha256.Sum256(jsonBytes)
	return hex.EncodeToString(hash[:]), nil
}

// ClearNoBranches clears all the branches answered "No" that must be
// re answered after rejection
func (a *Application) ClearNoBranches() error {

	for _, sectionInfo := range catalogue {
		section := a.Section(sectionInfo.Payload)

		clearable, ok := section.(Rejector)
		if ok {
			clearErr := clearable.ClearNoBranches()
			if clearErr != nil {
				return errors.Wrap(clearErr, fmt.Sprintf("Error clearing the 'No' responses from %s", sectionInfo.Payload))
			}
		}
	}
	return nil
}

// SectionInformation represents a structure to quickly organize the different
// sections and subsections with the payload type(s).
type SectionInformation struct {
	Name       string
	Subsection string
	Payload    string
	hashable   bool
}

var (
	catalogue = []SectionInformation{
		{
			Name:       "Identification",
			Subsection: "ApplicantName",
			Payload:    "identification.name",
			hashable:   true,
		},
		{
			Name:       "Identification",
			Subsection: "Contacts",
			Payload:    "identification.contacts",
			hashable:   true,
		},
		{
			Name:       "Identification",
			Subsection: "OtherNames",
			Payload:    "identification.othernames",
			hashable:   true,
		},
		{
			Name:       "Identification",
			Subsection: "ApplicantBirthDate",
			Payload:    "identification.birthdate",
			hashable:   true,
		},
		{
			Name:       "Identification",
			Subsection: "ApplicantBirthPlace",
			Payload:    "identification.birthplace",
			hashable:   true,
		},
		{
			Name:       "Identification",
			Subsection: "ApplicantSSN",
			Payload:    "identification.ssn",
			hashable:   true,
		},
		{
			Name:       "Identification",
			Subsection: "Physical",
			Payload:    "identification.physical",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Bankruptcy",
			Payload:    "financial.bankruptcy",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Gambling",
			Payload:    "financial.gambling",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Taxes",
			Payload:    "financial.taxes",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Card",
			Payload:    "financial.card",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Credit",
			Payload:    "financial.credit",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Delinquent",
			Payload:    "financial.delinquent",
			hashable:   true,
		},
		{
			Name:       "Financial",
			Subsection: "Nonpayment",
			Payload:    "financial.nonpayment",
			hashable:   true,
		},
		{
			Name:       "History",
			Subsection: "Residence",
			Payload:    "history.residence",
			hashable:   true,
		},
		{
			Name:       "History",
			Subsection: "Employment",
			Payload:    "history.employment",
			hashable:   true,
		},
		{
			Name:       "History",
			Subsection: "Education",
			Payload:    "history.education",
			hashable:   true,
		},
		{
			Name:       "History",
			Subsection: "Federal",
			Payload:    "history.federal",
			hashable:   true,
		},
		{
			Name:       "Relationships",
			Subsection: "Marital",
			Payload:    "relationships.status.marital",
			hashable:   true,
		},
		{
			Name:       "Relationships",
			Subsection: "Cohabitants",
			Payload:    "relationships.status.cohabitant",
			hashable:   true,
		},
		{
			Name:       "Relationships",
			Subsection: "People",
			Payload:    "relationships.people",
			hashable:   true,
		},
		{
			Name:       "Relationships",
			Subsection: "Relatives",
			Payload:    "relationships.relatives",
			hashable:   true,
		},
		{
			Name:       "Citizenship",
			Subsection: "Status",
			Payload:    "citizenship.status",
			hashable:   true,
		},
		{
			Name:       "Citizenship",
			Subsection: "Multiple",
			Payload:    "citizenship.multiple",
			hashable:   true,
		},
		{
			Name:       "Citizenship",
			Subsection: "Passports",
			Payload:    "citizenship.passports",
			hashable:   true,
		},
		{
			Name:       "Military",
			Subsection: "Selective",
			Payload:    "military.selective",
			hashable:   true,
		},
		{
			Name:       "Military",
			Subsection: "History",
			Payload:    "military.history",
			hashable:   true,
		},
		{
			Name:       "Military",
			Subsection: "Disciplinary",
			Payload:    "military.disciplinary",
			hashable:   true,
		},
		{
			Name:       "Military",
			Subsection: "Foreign",
			Payload:    "military.foreign",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Passport",
			Payload:    "foreign.passport",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Contacts",
			Payload:    "foreign.contacts",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Travel",
			Payload:    "foreign.travel",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "BenefitActivity",
			Payload:    "foreign.activities.benefits",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "DirectActivity",
			Payload:    "foreign.activities.direct",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "IndirectActivity",
			Payload:    "foreign.activities.indirect",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "RealEstateActivity",
			Payload:    "foreign.activities.realestate",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Support",
			Payload:    "foreign.activities.support",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Advice",
			Payload:    "foreign.business.advice",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Conferences",
			Payload:    "foreign.business.conferences",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Contact",
			Payload:    "foreign.business.contact",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Employment",
			Payload:    "foreign.business.employment",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Family",
			Payload:    "foreign.business.family",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Political",
			Payload:    "foreign.business.political",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Sponsorship",
			Payload:    "foreign.business.sponsorship",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Ventures",
			Payload:    "foreign.business.ventures",
			hashable:   true,
		},
		{
			Name:       "Foreign",
			Subsection: "Voting",
			Payload:    "foreign.business.voting",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "DrugClearanceUses",
			Payload:    "substance.drugs.clearance",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "PrescriptionUses",
			Payload:    "substance.drugs.misuse",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "OrderedTreatments",
			Payload:    "substance.drugs.ordered",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "DrugPublicSafetyUses",
			Payload:    "substance.drugs.publicsafety",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "DrugInvolvements",
			Payload:    "substance.drugs.purchase",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "DrugUses",
			Payload:    "substance.drugs.usage",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "VoluntaryTreatments",
			Payload:    "substance.drugs.voluntary",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "NegativeImpacts",
			Payload:    "substance.alcohol.negative",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "OrderedCounselings",
			Payload:    "substance.alcohol.ordered",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "VoluntaryCounselings",
			Payload:    "substance.alcohol.voluntary",
			hashable:   true,
		},
		{
			Name:       "Substance",
			Subsection: "ReceivedCounselings",
			Payload:    "substance.alcohol.additional",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "ActivitiesToOverthrow",
			Payload:    "legal.associations.activities-to-overthrow",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "Advocating",
			Payload:    "legal.associations.advocating",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "EngagedInTerrorism",
			Payload:    "legal.associations.engaged-in-terrorism",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "MembershipOverthrow",
			Payload:    "legal.associations.membership-overthrow",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "MembershipViolence",
			Payload:    "legal.associations.membership-violence-or-force",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "TerrorismAssociation",
			Payload:    "legal.associations.terrorism-association",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "TerroristOrganization",
			Payload:    "legal.associations.terrorist-organization",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "NonCriminalCourtActions",
			Payload:    "legal.court",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "Debarred",
			Payload:    "legal.investigations.debarred",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "History",
			Payload:    "legal.investigations.history",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "Revoked",
			Payload:    "legal.investigations.revoked",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "PoliceOtherOffenses",
			Payload:    "legal.police.additionaloffenses",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "PoliceDomesticViolence",
			Payload:    "legal.police.domesticviolence",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "PoliceOffenses",
			Payload:    "legal.police.offenses",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "Manipulating",
			Payload:    "legal.technology.manipulating",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "Unauthorized",
			Payload:    "legal.technology.unauthorized",
			hashable:   true,
		},
		{
			Name:       "Legal",
			Subsection: "Unlawful",
			Payload:    "legal.technology.unlawful",
			hashable:   true,
		},
		{
			Name:       "Psychological",
			Subsection: "Competence",
			Payload:    "psychological.competence",
			hashable:   true,
		},
		{
			Name:       "Psychological",
			Subsection: "Consultations",
			Payload:    "psychological.consultations",
			hashable:   true,
		},
		{
			Name:       "Psychological",
			Subsection: "Diagnoses",
			Payload:    "psychological.diagnoses",
			hashable:   true,
		},
		{
			Name:       "Psychological",
			Subsection: "ExistingConditions",
			Payload:    "psychological.conditions",
			hashable:   true,
		},
		{
			Name:       "Psychological",
			Subsection: "Hospitalizations",
			Payload:    "psychological.hospitalizations",
			hashable:   true,
		},
		{
			Name:       "Package",
			Subsection: "Comments",
			Payload:    "package.comments",
			hashable:   false,
		},
		{
			Name:       "Submission",
			Subsection: "Releases",
			Payload:    "submission.releases",
			hashable:   false,
		},
	}
)

// Catalogue eturns an array of the sub-sections of the form
func Catalogue() []SectionInformation {
	c := make([]SectionInformation, len(catalogue))
	copy(c, catalogue)
	return c
}

// EqipClient returns a new eqip.Client, configured with the WS_* environment variables.
func EqipClient(env Settings) (*eqip.Client, error) {
	url := env.String(WsURL)
	if url == "" {
		return nil, fmt.Errorf(WebserviceMissingURL)
	}
	key := env.String(WsKey)
	if key == "" {
		return nil, fmt.Errorf(WebserviceMissingKey)
	}

	return eqip.NewClient(url, key), nil
}

// EqipRequest returns a new eqip.ImportRequest, configured with the WS_* environment variables.
func EqipRequest(env Settings, application map[string]interface{}, xmlContent string) (*eqip.ImportRequest, error) {
	var ciAgencyUserPseudoSSN bool
	var agencyID int
	var agencyGroupID int

	ciAgencyIDEnv := env.String(WsCallerinfoAgencyID)
	if ciAgencyIDEnv == "" {
		return nil, fmt.Errorf(WebserviceMissingCallerInfoAgencyID)
	}
	ciAgencyUserSSNEnv := env.String(WsCallerinfoAgencyUserSSN)
	if ciAgencyUserSSNEnv == "" {
		return nil, fmt.Errorf(WebserviceMissingCallerInfoAgencySSN)
	}
	// Parse agency id
	agencyIDEnv := env.String(WsAgencyID)
	if agencyIDEnv == "" {
		return nil, fmt.Errorf(WebserviceMissingAgencyID)
	}
	i, err := strconv.Atoi(agencyIDEnv)
	if err != nil {
		return nil, err
	}
	agencyID = i

	// Parse agency group id if necessary
	agencyGroupIDEnv := env.String(WsAgencyGroupID)
	if agencyGroupIDEnv != "" {
		i, err := strconv.Atoi(agencyGroupIDEnv)
		if err != nil {
			return nil, err
		}
		agencyGroupID = i
	}

	ciAgencyUserPseudoSSNEnv := env.String(WsCallerinfoAgencyUserPseudossn)
	if ciAgencyUserPseudoSSNEnv == "" {
		return nil, fmt.Errorf(WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	b, err := strconv.ParseBool(ciAgencyUserPseudoSSNEnv)
	if err != nil {
		return nil, fmt.Errorf(WebserviceMissingCallerInfoAgencyPseudoSSN)
	}
	ciAgencyUserPseudoSSN = b

	ci := eqip.NewCallerInfo(ciAgencyIDEnv, ciAgencyUserPseudoSSN, ciAgencyUserSSNEnv)
	return eqip.NewImportRequest(ci, agencyID, agencyGroupID, application, xmlContent)
}
