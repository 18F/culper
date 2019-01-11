// import { navigationWalker } from '../../config'
// import {
//   updateApplication,
//   reportCompletion
// } from '../../actions/ApplicationActions'
// import { api } from '../../services'
// import schema from '../../schema'

/**
 *
 * To run this put the following reference in Login.jsx
 *
 *   import { preload } from './preload'
 *
 * and then inside of `componentDidMount()`
 *
 *   window.tt = {
 *     dispatch: this.props.dispatch,
 *     preload: preload
 *   }
 */

/**
 * All functions have been commented out because none of these functions
 * are getting invoked. I'm commenting out to reduce confusion.
 * Uncomment if there is a use case
 */
// export const validate = (dispatch, application = {}) => {
//   navigationWalker((path, child) => {
//     if (path.length && path[0].store && child.store && child.validator) {
//       const sectionName = path[0].url
//       const data = application[path[0].store][child.store] || {}

//       let subsectionName = child.url
//       if (path.length > 1) {
//         for (let i = path.length - 1; i > 0; i--) {
//           subsectionName = `${path[i].url}/${subsectionName}`
//         }
//       }

//       let valid = null
//       try {
//         // eslint-disable-next-line new-cap
//         valid = new child.validator(data, data).isValid()
//       } catch (e) {
//         valid = null
//       }

//       dispatch(
//         reportCompletion(
//           sectionName.toLowerCase(),
//           subsectionName.toLowerCase(),
//           valid
//         )
//       )
//     }
//   })
// }

// export const persist = (dispatch, application = {}) => {
//   navigationWalker((path, child) => {
//     if (path.length && path[0].store && child.store && child.validator) {
//       const sectionName = path[0].url
//       const data = application[path[0].store][child.store] || {}

//       let subsectionName = child.url
//       if (path.length > 1) {
//         for (let i = path.length - 1; i > 0; i--) {
//           subsectionName = `${path[i].url}/${subsectionName}`
//         }
//       }

//       if (data) {
//         api.save(
//           schema(
//             `${sectionName.toLowerCase()}/${subsectionName.toLowerCase()}`.replace(
//               /\//g,
//               '.'
//             ),
//             data,
//             false
//           )
//         )
//       }
//     }
//   })
// }

// export const preload = (dispatch, application = {}) => {
//   if (
//     application.Identification &&
//     application.Identification.ApplicantBirthDate
//   ) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'ApplicantBirthDate',
//         application.Identification.ApplicantBirthDate
//       )
//     )
//   }
//   if (
//     application.Identification &&
//     application.Identification.ApplicantBirthPlace
//   ) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'ApplicantBirthPlace',
//         application.Identification.ApplicantBirthPlace
//       )
//     )
//   }
//   if (application.Identification && application.Identification.Contacts) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'Contacts',
//         application.Identification.Contacts
//       )
//     )
//   }
//   if (application.Identification && application.Identification.ApplicantName) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'ApplicantName',
//         application.Identification.ApplicantName
//       )
//     )
//   }
//   if (application.Identification && application.Identification.OtherNames) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'OtherNames',
//         application.Identification.OtherNames
//       )
//     )
//   }
//   if (application.Identification && application.Identification.Physical) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'Physical',
//         application.Identification.Physical
//       )
//     )
//   }
//   if (application.Identification && application.Identification.ApplicantSSN) {
//     dispatch(
//       updateApplication(
//         'Identification',
//         'ApplicantSSN',
//         application.Identification.ApplicantSSN
//       )
//     )
//   }
//   if (application.Financial && application.Financial.Bankruptcy) {
//     dispatch(
//       updateApplication(
//         'Financial',
//         'Bankruptcy',
//         application.Financial.Bankruptcy
//       )
//     )
//   }
//   if (application.Financial && application.Financial.Gambling) {
//     dispatch(
//       updateApplication('Financial', 'Gambling', application.Financial.Gambling)
//     )
//   }
//   if (application.Financial && application.Financial.Taxes) {
//     dispatch(
//       updateApplication('Financial', 'Taxes', application.Financial.Taxes)
//     )
//   }
//   if (application.Financial && application.Financial.Card) {
//     dispatch(updateApplication('Financial', 'Card', application.Financial.Card))
//   }
//   if (application.Financial && application.Financial.Credit) {
//     dispatch(
//       updateApplication('Financial', 'Credit', application.Financial.Credit)
//     )
//   }
//   if (application.Financial && application.Financial.Delinquent) {
//     dispatch(
//       updateApplication(
//         'Financial',
//         'Delinquent',
//         application.Financial.Delinquent
//       )
//     )
//   }
//   if (application.Financial && application.Financial.Nonpayment) {
//     dispatch(
//       updateApplication(
//         'Financial',
//         'Nonpayment',
//         application.Financial.Nonpayment
//       )
//     )
//   }
//   if (application.History && application.History.Education) {
//     dispatch(
//       updateApplication('History', 'Education', application.History.Education)
//     )
//   }
//   if (application.History && application.History.Employment) {
//     dispatch(
//       updateApplication('History', 'Employment', application.History.Employment)
//     )
//   }
//   if (application.History && application.History.Federal) {
//     dispatch(
//       updateApplication('History', 'Federal', application.History.Federal)
//     )
//   }
//   if (application.History && application.History.Residence) {
//     dispatch(
//       updateApplication('History', 'Residence', application.History.Residence)
//     )
//   }
//   if (application.Relationships && application.Relationships.Marital) {
//     dispatch(
//       updateApplication(
//         'Relationships',
//         'Marital',
//         application.Relationships.Marital
//       )
//     )
//   }
//   if (application.Relationships && application.Relationships.Cohabitants) {
//     dispatch(
//       updateApplication(
//         'Relationships',
//         'Cohabitants',
//         application.Relationships.Cohabitants
//       )
//     )
//   }
//   if (application.Relationships && application.Relationships.People) {
//     dispatch(
//       updateApplication(
//         'Relationships',
//         'People',
//         application.Relationships.People
//       )
//     )
//   }
//   if (application.Relationships && application.Relationships.Relatives) {
//     dispatch(
//       updateApplication(
//         'Relationships',
//         'Relatives',
//         application.Relationships.Relatives
//       )
//     )
//   }
//   if (application.Citizenship && application.Citizenship.Multiple) {
//     dispatch(
//       updateApplication(
//         'Citizenship',
//         'Multiple',
//         application.Citizenship.Multiple
//       )
//     )
//   }
//   if (application.Citizenship && application.Citizenship.Passports) {
//     dispatch(
//       updateApplication(
//         'Citizenship',
//         'Passports',
//         application.Citizenship.Passports
//       )
//     )
//   }
//   if (application.Citizenship && application.Citizenship.Status) {
//     dispatch(
//       updateApplication('Citizenship', 'Status', application.Citizenship.Status)
//     )
//   }
//   if (application.Military && application.Military.Selective) {
//     dispatch(
//       updateApplication('Military', 'Selective', application.Military.Selective)
//     )
//   }
//   if (application.Military && application.Military.History) {
//     dispatch(
//       updateApplication('Military', 'History', application.Military.History)
//     )
//   }
//   if (application.Military && application.Military.Disciplinary) {
//     dispatch(
//       updateApplication(
//         'Military',
//         'Disciplinary',
//         application.Military.Disciplinary
//       )
//     )
//   }
//   if (application.Military && application.Military.Foreign) {
//     dispatch(
//       updateApplication('Military', 'Foreign', application.Military.Foreign)
//     )
//   }
//   if (application.Foreign && application.Foreign.BenefitActivity) {
//     dispatch(
//       updateApplication(
//         'Foreign',
//         'BenefitActivity',
//         application.Foreign.BenefitActivity
//       )
//     )
//   }
//   if (application.Foreign && application.Foreign.DirectActivity) {
//     dispatch(
//       updateApplication(
//         'Foreign',
//         'DirectActivity',
//         application.Foreign.DirectActivity
//       )
//     )
//   }
//   if (application.Foreign && application.Foreign.IndirectActivity) {
//     dispatch(
//       updateApplication(
//         'Foreign',
//         'IndirectActivity',
//         application.Foreign.IndirectActivity
//       )
//     )
//   }
//   if (application.Foreign && application.Foreign.RealEstateActivity) {
//     dispatch(
//       updateApplication(
//         'Foreign',
//         'RealEstateActivity',
//         application.Foreign.RealEstateActivity
//       )
//     )
//   }
//   if (application.Foreign && application.Foreign.Support) {
//     dispatch(
//       updateApplication('Foreign', 'Support', application.Foreign.Support)
//     )
//   }
//   if (application.Foreign && application.Foreign.Advice) {
//     dispatch(updateApplication('Foreign', 'Advice', application.Foreign.Advice))
//   }
//   if (application.Foreign && application.Foreign.Conferences) {
//     dispatch(
//       updateApplication(
//         'Foreign',
//         'Conferences',
//         application.Foreign.Conferences
//       )
//     )
//   }
//   if (application.Foreign && application.Foreign.Contact) {
//     dispatch(
//       updateApplication('Foreign', 'Contact', application.Foreign.Contact)
//     )
//   }
//   if (application.Foreign && application.Foreign.Employment) {
//     dispatch(
//       updateApplication('Foreign', 'Employment', application.Foreign.Employment)
//     )
//   }
//   if (application.Foreign && application.Foreign.Family) {
//     dispatch(updateApplication('Foreign', 'Family', application.Foreign.Family))
//   }
//   if (application.Foreign && application.Foreign.Political) {
//     dispatch(
//       updateApplication('Foreign', 'Political', application.Foreign.Political)
//     )
//   }
//   if (application.Foreign && application.Foreign.Sponsorship) {
//     dispatch(
//       updateApplication(
//         'Foreign',
//         'Sponsorship',
//         application.Foreign.Sponsorship
//       )
//     )
//   }
//   if (application.Foreign && application.Foreign.Ventures) {
//     dispatch(
//       updateApplication('Foreign', 'Ventures', application.Foreign.Ventures)
//     )
//   }
//   if (application.Foreign && application.Foreign.Voting) {
//     dispatch(updateApplication('Foreign', 'Voting', application.Foreign.Voting))
//   }
//   if (application.Foreign && application.Foreign.Contacts) {
//     dispatch(
//       updateApplication('Foreign', 'Contacts', application.Foreign.Contacts)
//     )
//   }
//   if (application.Foreign && application.Foreign.Passport) {
//     dispatch(
//       updateApplication('Foreign', 'Passport', application.Foreign.Passport)
//     )
//   }
//   if (application.Foreign && application.Foreign.Travel) {
//     dispatch(updateApplication('Foreign', 'Travel', application.Foreign.Travel))
//   }
//   if (application.Substance && application.Substance.ReceivedCounselings) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'ReceivedCounselings',
//         application.Substance.ReceivedCounselings
//       )
//     )
//   }
//   if (application.Substance && application.Substance.NegativeImpacts) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'NegativeImpacts',
//         application.Substance.NegativeImpacts
//       )
//     )
//   }
//   if (application.Substance && application.Substance.OrderedCounselings) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'OrderedCounselings',
//         application.Substance.OrderedCounselings
//       )
//     )
//   }
//   if (application.Substance && application.Substance.VoluntaryCounselings) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'VoluntaryCounselings',
//         application.Substance.VoluntaryCounselings
//       )
//     )
//   }
//   if (application.Substance && application.Substance.DrugClearanceUses) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'DrugClearanceUses',
//         application.Substance.DrugClearanceUses
//       )
//     )
//   }
//   if (application.Substance && application.Substance.PrescriptionUses) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'PrescriptionUses',
//         application.Substance.PrescriptionUses
//       )
//     )
//   }
//   if (application.Substance && application.Substance.OrderedTreatments) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'OrderedTreatments',
//         application.Substance.OrderedTreatments
//       )
//     )
//   }
//   if (application.Substance && application.Substance.DrugPublicSafetyUses) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'DrugPublicSafetyUses',
//         application.Substance.DrugPublicSafetyUses
//       )
//     )
//   }
//   if (application.Substance && application.Substance.DrugInvolvements) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'DrugInvolvements',
//         application.Substance.DrugInvolvements
//       )
//     )
//   }
//   if (application.Substance && application.Substance.DrugUses) {
//     dispatch(
//       updateApplication('Substance', 'DrugUses', application.Substance.DrugUses)
//     )
//   }
//   if (application.Substance && application.Substance.VoluntaryTreatments) {
//     dispatch(
//       updateApplication(
//         'Substance',
//         'VoluntaryTreatments',
//         application.Substance.VoluntaryTreatments
//       )
//     )
//   }
//   if (application.Legal && application.Legal.ActivitiesToOverthrow) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'ActivitiesToOverthrow',
//         application.Legal.ActivitiesToOverthrow
//       )
//     )
//   }
//   if (application.Legal && application.Legal.Advocating) {
//     dispatch(
//       updateApplication('Legal', 'Advocating', application.Legal.Advocating)
//     )
//   }
//   if (application.Legal && application.Legal.EngagedInTerrorism) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'EngagedInTerrorism',
//         application.Legal.EngagedInTerrorism
//       )
//     )
//   }
//   if (application.Legal && application.Legal.MembershipOverthrow) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'MembershipOverthrow',
//         application.Legal.MembershipOverthrow
//       )
//     )
//   }
//   if (application.Legal && application.Legal.MembershipViolence) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'MembershipViolence',
//         application.Legal.MembershipViolence
//       )
//     )
//   }
//   if (application.Legal && application.Legal.TerrorismAssociation) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'TerrorismAssociation',
//         application.Legal.TerrorismAssociation
//       )
//     )
//   }
//   if (application.Legal && application.Legal.TerroristOrganization) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'TerroristOrganization',
//         application.Legal.TerroristOrganization
//       )
//     )
//   }
//   if (application.Legal && application.Legal.NonCriminalCourtActions) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'NonCriminalCourtActions',
//         application.Legal.NonCriminalCourtActions
//       )
//     )
//   }
//   if (application.Legal && application.Legal.Debarred) {
//     dispatch(updateApplication('Legal', 'Debarred', application.Legal.Debarred))
//   }
//   if (application.Legal && application.Legal.History) {
//     dispatch(updateApplication('Legal', 'History', application.Legal.History))
//   }
//   if (application.Legal && application.Legal.Revoked) {
//     dispatch(updateApplication('Legal', 'Revoked', application.Legal.Revoked))
//   }
//   if (application.Legal && application.Legal.PoliceOtherOffenses) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'PoliceOtherOffenses',
//         application.Legal.PoliceOtherOffenses
//       )
//     )
//   }
//   if (application.Legal && application.Legal.PoliceDomesticViolence) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'PoliceDomesticViolence',
//         application.Legal.PoliceDomesticViolence
//       )
//     )
//   }
//   if (application.Legal && application.Legal.PoliceOffenses) {
//     dispatch(
//       updateApplication(
//         'Legal',
//         'PoliceOffenses',
//         application.Legal.PoliceOffenses
//       )
//     )
//   }
//   if (application.Legal && application.Legal.Manipulating) {
//     dispatch(
//       updateApplication('Legal', 'Manipulating', application.Legal.Manipulating)
//     )
//   }
//   if (application.Legal && application.Legal.Unauthorized) {
//     dispatch(
//       updateApplication('Legal', 'Unauthorized', application.Legal.Unauthorized)
//     )
//   }
//   if (application.Legal && application.Legal.Unlawful) {
//     dispatch(updateApplication('Legal', 'Unlawful', application.Legal.Unlawful))
//   }
//   if (application.Psychological && application.Psychological.Competence) {
//     dispatch(
//       updateApplication(
//         'Psychological',
//         'Competence',
//         application.Psychological.Competence
//       )
//     )
//   }
//   if (
//     application.Psychological &&
//     application.Psychological.ExistingConditions
//   ) {
//     dispatch(
//       updateApplication(
//         'Psychological',
//         'ExistingConditions',
//         application.Psychological.ExistingConditions
//       )
//     )
//   }
//   if (application.Psychological && application.Psychological.Consultations) {
//     dispatch(
//       updateApplication(
//         'Psychological',
//         'Consultations',
//         application.Psychological.Consultations
//       )
//     )
//   }
//   if (application.Psychological && application.Psychological.Diagnoses) {
//     dispatch(
//       updateApplication(
//         'Psychological',
//         'Diagnoses',
//         application.Psychological.Diagnoses
//       )
//     )
//   }
//   if (application.Psychological && application.Psychological.Hospitalizations) {
//     dispatch(
//       updateApplication(
//         'Psychological',
//         'Hospitalizations',
//         application.Psychological.Hospitalizations
//       )
//     )
//   }

//   validate(dispatch, application)
//   persist(dispatch, application)
// }
