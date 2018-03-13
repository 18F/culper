import { identificationName } from './identification-name'
import { identificationBirthdate } from './identification-birthdate'
import { identificationBirthplace } from './identification-birthplace'
import { identificationContacts } from './identification-contacts'
import { identificationOthernames } from './identification-othernames'
import { identificationPhysical } from './identification-physical'
import { identificationSSN } from './identification-ssn'
import { identificationComments } from './identification-comments'
import { financialBankruptcy } from './financial-bankruptcy'
import { financialCard } from './financial-card'
import { financialCredit } from './financial-credit'
import { financialDelinquent } from './financial-delinquent'
import { financialGambling } from './financial-gambling'
import { financialNonpayment } from './financial-nonpayment'
import { financialTaxes } from './financial-taxes'
import { financialComments } from './financial-comments'
import { foreignActivitiesBenefits } from './foreign-activities-benefits'
import { foreignActivitiesDirect } from './foreign-activities-direct'
import { foreignActivitiesIndirect } from './foreign-activities-indirect'
import { foreignActivitiesRealestate } from './foreign-activities-realestate'
import { foreignActivitiesSupport } from './foreign-activities-support'
import { foreignBusinessAdvice } from './foreign-business-advice'
import { foreignBusinessConferences } from './foreign-business-conferences'
import { foreignBusinessContact } from './foreign-business-contact'
import { foreignBusinessEmployment } from './foreign-business-employment'
import { foreignBusinessFamily } from './foreign-business-family'
import { foreignBusinessPolitical } from './foreign-business-political'
import { foreignBusinessSponsorship } from './foreign-business-sponsorship'
import { foreignBusinessVentures } from './foreign-business-ventures'
import { foreignBusinessVoting } from './foreign-business-voting'
import { foreignContacts } from './foreign-contacts'
import { foreignPassport } from './foreign-passport'
import { foreignTravel } from './foreign-travel'
import { foreignComments } from './foreign-comments'
import { legalAssociationsActivitiesToOverthrow } from './legal-associations-activities-to-overthrow'
import { legalAssociationsAdvocating } from './legal-associations-advocating'
import { legalAssociationsEngagedInTerrorism } from './legal-associations-engaged-in-terrorism'
import { legalAssociationsMembershipOverthrow } from './legal-associations-membership-overthrow'
import { legalAssociationsMembershipViolenceOrForce } from './legal-associations-membership-violence-or-force'
import { legalAssociationsTerrorismAssociation } from './legal-associations-terrorism-association'
import { legalAssociationsTerroristOrganization } from './legal-associations-terrorist-organization'
import { legalCourt } from './legal-court'
import { legalInvestigationsDebarred } from './legal-investigations-debarred'
import { legalInvestigationsHistory } from './legal-investigations-history'
import { legalInvestigationsRevoked } from './legal-investigations-revoked'
import { legalPoliceAdditionalOffenses } from './legal-police-additionaloffenses'
import { legalPoliceDomesticViolence } from './legal-police-domesticviolence'
import { legalPoliceOffenses } from './legal-police-offenses'
import { legalTechnologyManipulating } from './legal-technology-manipulating'
import { legalTechnologyUnauthorized } from './legal-technology-unauthorized'
import { legalTechnologyUnlawful } from './legal-technology-unlawful'
import { legalComments } from './legal-comments'
import { militaryDisciplinary } from './military-disciplinary'
import { militaryForeign } from './military-foreign'
import { militaryHistory } from './military-history'
import { militarySelective } from './military-selective'
import { militaryComments } from './military-comments'
import { psychologicalCompetence } from './psychological-competence'
import { psychologicalConsultations } from './psychological-consultations'
import { psychologicalDiagnoses } from './psychological-diagnoses'
import { psychologicalExisting } from './psychological-existing'
import { psychologicalHospitalizations } from './psychological-hospitalizations'
import { psychologicalComments } from './psychological-comments'
import { substanceAlcoholAdditional } from './substance-alcohol-additional'
import { substanceAlcoholNegative } from './substance-alcohol-negative'
import { substanceAlcoholOrdered } from './substance-alcohol-ordered'
import { substanceAlcoholVoluntary } from './substance-alcohol-voluntary'
import { substanceDrugClearance } from './substance-drug-clearance'
import { substanceDrugMisuse } from './substance-drug-misuse'
import { substanceDrugOrdered } from './substance-drug-ordered'
import { substanceDrugPublicSafety } from './substance-drug-publicsafety'
import { substanceDrugPurchase } from './substance-drug-purchase'
import { substanceDrugUsage } from './substance-drug-usage'
import { substanceDrugVoluntary } from './substance-drug-voluntary'
import { substanceComments } from './substance-comments'
import { citizenshipMultiple } from './citizenship-multiple'
import { citizenshipPassports } from './citizenship-passports'
import { citizenshipStatus } from './citizenship-status'
import { citizenshipComments } from './citizenship-comments'
import { relationshipsCohabitants } from './relationships-cohabitants'
import { relationshipsMarital } from './relationships-marital'
import { relationshipsPeople } from './relationships-people'
import { relationshipsRelatives } from './relationships-relatives'
import { relationshipsComments } from './relationships-comments'
import { historyEducation } from './history-education'
import { historyEmployment } from './history-employment'
import { historyFederal } from './history-federal'
import { historyResidence } from './history-residence'
import { historyComments } from './history-comments'
import { submission } from './submission'

export {
  identificationName,
  identificationBirthdate,
  identificationBirthplace,
  identificationContacts,
  identificationOthernames,
  identificationPhysical,
  identificationSSN,
  identificationComments,
  financialBankruptcy,
  financialCard,
  financialCredit,
  financialDelinquent,
  financialGambling,
  financialNonpayment,
  financialTaxes,
  financialComments,
  foreignActivitiesBenefits,
  foreignActivitiesDirect,
  foreignActivitiesIndirect,
  foreignActivitiesRealestate,
  foreignActivitiesSupport,
  foreignBusinessAdvice,
  foreignBusinessConferences,
  foreignBusinessContact,
  foreignBusinessEmployment,
  foreignBusinessFamily,
  foreignBusinessPolitical,
  foreignBusinessSponsorship,
  foreignBusinessVentures,
  foreignBusinessVoting,
  foreignContacts,
  foreignPassport,
  foreignTravel,
  foreignComments,
  legalAssociationsActivitiesToOverthrow,
  legalAssociationsAdvocating,
  legalAssociationsEngagedInTerrorism,
  legalAssociationsMembershipOverthrow,
  legalAssociationsMembershipViolenceOrForce,
  legalAssociationsTerrorismAssociation,
  legalAssociationsTerroristOrganization,
  legalCourt,
  legalInvestigationsDebarred,
  legalInvestigationsHistory,
  legalInvestigationsRevoked,
  legalPoliceAdditionalOffenses,
  legalPoliceDomesticViolence,
  legalPoliceOffenses,
  legalTechnologyManipulating,
  legalTechnologyUnauthorized,
  legalTechnologyUnlawful,
  legalComments,
  militaryDisciplinary,
  militaryForeign,
  militaryHistory,
  militarySelective,
  militaryComments,
  psychologicalCompetence,
  psychologicalConsultations,
  psychologicalDiagnoses,
  psychologicalExisting,
  psychologicalHospitalizations,
  psychologicalComments,
  substanceAlcoholAdditional,
  substanceAlcoholNegative,
  substanceAlcoholOrdered,
  substanceAlcoholVoluntary,
  substanceDrugClearance,
  substanceDrugMisuse,
  substanceDrugOrdered,
  substanceDrugPublicSafety,
  substanceDrugPurchase,
  substanceDrugUsage,
  substanceDrugVoluntary,
  substanceComments,
  citizenshipMultiple,
  citizenshipPassports,
  citizenshipStatus,
  citizenshipComments,
  relationshipsCohabitants,
  relationshipsMarital,
  relationshipsPeople,
  relationshipsRelatives,
  relationshipsComments,
  historyEducation,
  historyEmployment,
  historyFederal,
  historyResidence,
  historyComments,
  submission
}
