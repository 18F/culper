package api

import (
	"io/ioutil"
	"strings"
	"testing"
)

var badRawSection = []byte("{ ==)")

func TestUnmarshallEntities(t *testing.T) {

	tests := []struct {
		entity Marshaller
	}{
		{&AdditionalComments{}},
		{&Benefit{}},
		{&CivilUnion{}},
		{&ClearanceLevel{}},
		{&Collection{}},
		{&Contacts{}},
		{&CoOwners{}},
		{&DateRange{}},
		{&IdentificationName{}},
		{&IdentificationBirthDate{}},
		{&IdentificationContacts{}},
		{&IdentificationOtherNames{}},
		{&IdentificationBirthPlace{}},
		{&IdentificationSSN{}},
		{&IdentificationPhysical{}},
		{&FinancialBankruptcy{}},
		{&FinancialGambling{}},
		{&FinancialTaxes{}},
		{&FinancialCard{}},
		{&FinancialCredit{}},
		{&FinancialDelinquent{}},
		{&FinancialNonpayment{}},
		{&HistoryResidence{}},
		{&HistoryResidence{}},
		{&HistoryEmployment{}},
		{&HistoryEducation{}},
		{&HistoryFederal{}},
		{&Sentence{}},
		{&Signature{}},
		{&RelationshipsMarital{}},
		{&RelationshipsCohabitants{}},
		{&RelationshipsPeople{}},
		{&RelationshipsRelatives{}},
		{&CitizenshipStatus{}},
		{&CitizenshipMultiple{}},
		{&CitizenshipPassports{}},
		{&MilitarySelective{}},
		{&MilitaryHistory{}},
		{&MilitaryDisciplinary{}},
		{&MilitaryForeign{}},
		{&ForeignBornDocument{}},
		{&ForeignPassport{}},
		{&ForeignContacts{}},
		{&ForeignTravel{}},
		{&ForeignActivitiesBenefits{}},
		{&ForeignActivitiesDirect{}},
		{&ForeignActivitiesIndirect{}},
		{&ForeignActivitiesRealEstate{}},
		{&ForeignActivitiesSupport{}},
		{&ForeignBusinessAdvice{}},
		{&ForeignBusinessConferences{}},
		{&ForeignBusinessContact{}},
		{&ForeignBusinessEmployment{}},
		{&ForeignBusinessFamily{}},
		{&ForeignBusinessPolitical{}},
		{&ForeignBusinessSponsorship{}},
		{&ForeignBusinessVentures{}},
		{&ForeignBusinessVoting{}},
		{&SubmissionAdditionalComments{}},
		{&SubmissionGeneral{}},
		{&Submission{}},
		{&SubmissionAttachments{}},
		{&SubmissionCredit{}},
		{&SubmissionMedical{}},
		{&Supervisor{}},
		{&SubstanceDrugClearance{}},
		{&SubstanceDrugMisuse{}},
		{&SubstanceDrugOrdered{}},
		{&SubstanceDrugPublicSafety{}},
		{&SubstanceDrugPurchase{}},
		{&SubstanceDrugUsage{}},
		{&SubstanceDrugVoluntary{}},
		{&SubstanceAlcoholNegative{}},
		{&SubstanceAlcoholOrdered{}},
		{&SubstanceAlcoholVoluntary{}},
		{&SubstanceAlcoholAdditional{}},
		{&LegalAssociationsActivitiesToOverthrow{}},
		{&LegalAssociationsAdvocating{}},
		{&LegalAssociationsEngagedInTerrorism{}},
		{&LegalAssociationsMembershipOverthrow{}},
		{&LegalAssociationsMembershipViolence{}},
		{&LegalAssociationsTerrorismAssociation{}},
		{&LegalAssociationsTerroristOrganization{}},
		{&LegalCourt{}},
		{&LegalInvestigationsDebarred{}},
		{&LegalInvestigationsHistory{}},
		{&LegalInvestigationsRevoked{}},
		{&LegalPoliceAdditionalOffenses{}},
		{&LegalPoliceDomesticViolence{}},
		{&LegalPoliceOffenses{}},
		{&LegalTechnologyManipulating{}},
		{&LegalTechnologyUnauthorized{}},
		{&LegalTechnologyUnlawful{}},
		{&PhysicalAddress{}},
		{&PsychologicalCompetence{}},
		{&PsychologicalConsultations{}},
		{&PsychologicalDiagnoses{}},
		{&PsychologicalExisting{}},
		{&PsychologicalHospitalizations{}},
		{&ReasonLeft{}},
		{&Treatment{}},
	}

	for _, secTest := range tests {
		unmarshalErr := secTest.entity.Unmarshal(badRawSection)
		if unmarshalErr == nil {
			t.Logf("Should have received an error from Unmarshal, instead got nil for type %v", secTest.entity.Marshal().Type)
			t.Fail()
		}
	}
}

func TestClearancePayloadStrings(t *testing.T) {
	tests := []struct {
		path string
	}{
		{"testdata/clearancelevel.json"},
		{"testdata/civilunion.json"},
		{"testdata/foreignborndocument.json"},
		{"testdata/location.json"},
		{"testdata/physicaladdress.json"},
		{"testdata/reasonleft.json"},
		{"testdata/sentence.json"},
		{"testdata/signature.json"},
		{"testdata/ssn.json"},
		{"testdata/supervisor.json"},
		{"testdata/identification/identification-name.json"},
		{"testdata/identification/identification-contacts.json"},
		{"testdata/identification/identification-othernames.json"},
		{"testdata/identification/identification-othernames-unfinished.json"},
		{"testdata/identification/identification-birthdate.json"},
		{"testdata/identification/identification-birthplace.json"},
		{"testdata/identification/identification-birthplace-full.json"},
		{"testdata/identification/identification-ssn.json"},
		{"testdata/identification/identification-physical.json"},
		{"testdata/financial/financial-bankruptcy.json"},
		{"testdata/financial/financial-gambling.json"},
		{"testdata/financial/financial-taxes.json"},
		{"testdata/financial/financial-card.json"},
		{"testdata/financial/financial-credit.json"},
		{"testdata/financial/financial-delinquent.json"},
		{"testdata/financial/financial-nonpayment.json"},
		{"testdata/history/history-residence.json"},
		{"testdata/history/history-residence-unfinished-list.json"},
		{"testdata/history/history-employment.json"},
		{"testdata/history/history-employment-full.json"},
		{"testdata/history/history-education.json"},
		{"testdata/history/history-federal.json"},
		{"testdata/relationships/relationships-status-marital.json"},
		{"testdata/relationships/relationships-status-cohabitant.json"},
		{"testdata/relationships/relationships-people.json"},
		{"testdata/relationships/relationships-relatives.json"},
		{"testdata/citizenship/citizenship-status.json"},
		{"testdata/citizenship/citizenship-multiple.json"},
		{"testdata/citizenship/citizenship-passports.json"},
		{"testdata/citizenship/citizenship-passports-thin.json"},
		{"testdata/military/military-selective.json"},
		{"testdata/military/military-history.json"},
		{"testdata/military/military-disciplinary.json"},
		{"testdata/military/military-foreign.json"},
		{"testdata/foreign/foreign-passport.json"},
		{"testdata/foreign/foreign-contacts.json"},
		{"testdata/foreign/foreign-travel.json"},
		{"testdata/foreign/foreign-activities-benefits.json"},
		{"testdata/foreign/foreign-activities-direct.json"},
		{"testdata/foreign/foreign-activities-indirect.json"},
		{"testdata/foreign/foreign-activities-realestate.json"},
		{"testdata/foreign/foreign-business-advice.json"},
		{"testdata/foreign/foreign-business-conferences.json"},
		{"testdata/foreign/foreign-business-contact.json"},
		{"testdata/foreign/foreign-business-employment.json"},
		{"testdata/foreign/foreign-business-family.json"},
		{"testdata/foreign/foreign-business-political.json"},
		{"testdata/foreign/foreign-business-sponsorship.json"},
		{"testdata/foreign/foreign-business-ventures.json"},
		{"testdata/foreign/foreign-business-voting.json"},
		{"testdata/substance/substance-drug-clearance.json"},
		{"testdata/substance/substance-drug-misuse.json"},
		{"testdata/substance/substance-drug-ordered.json"},
		{"testdata/substance/substance-drug-publicsafety.json"},
		{"testdata/substance/substance-drug-purchase.json"},
		{"testdata/substance/substance-drug-usage.json"},
		{"testdata/substance/substance-drug-voluntary.json"},
		{"testdata/substance/substance-alcohol-negative.json"},
		{"testdata/substance/substance-alcohol-ordered.json"},
		{"testdata/substance/substance-alcohol-voluntary.json"},
		{"testdata/substance/substance-alcohol-additional.json"},
		{"testdata/legal/legal-associations-activities-to-overthrow.json"},
		{"testdata/legal/legal-associations-advocating.json"},
		{"testdata/legal/legal-associations-engaged-in-terrorism.json"},
		{"testdata/legal/legal-associations-membership-overthrow.json"},
		{"testdata/legal/legal-associations-membership-violence-or-force.json"},
		{"testdata/legal/legal-associations-terrorism-association.json"},
		{"testdata/legal/legal-associations-terrorist-organization.json"},
		{"testdata/legal/legal-court.json"},
		{"testdata/legal/legal-investigations-debarred.json"},
		{"testdata/legal/legal-investigations-history.json"},
		{"testdata/legal/legal-investigations-revoked.json"},
		{"testdata/legal/legal-police-additionaloffenses.json"},
		{"testdata/legal/legal-police-domesticviolence.json"},
		{"testdata/legal/legal-police-offenses.json"},
		{"testdata/legal/legal-technology-manipulating.json"},
		{"testdata/legal/legal-technology-unauthorized.json"},
		{"testdata/legal/legal-technology-unlawful.json"},
		{"testdata/psychological/psychological-competence.json"},
		{"testdata/psychological/psychological-consultations.json"},
		{"testdata/psychological/psychological-diagnoses.json"},
		{"testdata/psychological/psychological-conditions.json"},
		{"testdata/psychological/psychological-hospitalizations.json"},
		{"testdata/package/comments.json"},
		{"testdata/submission.json"},
	}

	for _, secTest := range tests {
		section, err := ioutil.ReadFile(secTest.path)
		if err != nil {
			t.Logf("Received error: %v", err)
			t.Fail()
		}
		// make a version of the content that will remain unaltered
		unchangedLines := strings.Split(string(section), "\n")
		// make a copy you can manipulate
		alteredLines := make([]string, len(unchangedLines))

		// Determine which lines should be changed
		linesOfInterest := selectLinesString(unchangedLines)
		if len(linesOfInterest) < 1 {
			t.Logf("Found no mentions of 'type' in JSON")
			t.Fail()
		}

		for targetIndex := range linesOfInterest {
			copy(alteredLines, unchangedLines)
			indexOfInterest := linesOfInterest[targetIndex]
			alteredLines[indexOfInterest] = strings.Replace(alteredLines[indexOfInterest], alteredLines[indexOfInterest], `"type": "unsinn",`, 1)
			replacedSection := strings.Join(alteredLines, "\n")

			// Try to unmarshall with the wrong type

			// Deserialize the initial payload from the replaced JSON
			payload := &Payload{}
			if err := payload.Unmarshal([]byte(replacedSection)); err != nil {
				t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", replacedSection, err)
			}

			// Extract the entity interface of the payload and validate it
			_, err := payload.Entity()
			if err == nil {
				t.Logf("Should have received an error from payload.Entity, instead got nil for type %v", payload.Type)
				t.Fail()
			}
		}
	}
}

func selectLinesString(lines []string) []int {
	var linesOfInterest []int
	leftBracket := 0
	rightBracket := 0
	for i, line := range lines {
		// THIS IS AN ALPTRAUM but the JSON's unstructured
		if strings.Contains(line, "[") && strings.Contains(line, "]") {
			continue
		}
		if strings.Contains(line, "[") {
			leftBracket++
			continue
		}
		if strings.Contains(line, "]") {
			rightBracket++
			continue
		}
		// Don't change lines that use type as part of the prop structure
		// (i.e. telephone type domestic)
		if leftBracket == rightBracket {
			if strings.Contains(line, `"type"`) && strings.Contains(lines[i+1], `"props"`) {
				linesOfInterest = append(linesOfInterest, i)
			}
			leftBracket = 0
			rightBracket = 0
		}

	}
	return linesOfInterest
}
