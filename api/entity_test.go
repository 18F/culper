package api

import (
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
