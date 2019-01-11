// import {
//   sectionsTotal,
//   sectionsCompleted
// } from '../components/Navigation/navigation-helpers'
import SignatureValidator from './signature'
import { hideExistingConditions } from './psychological'

// export const hideReleases = (store = {}) => {
//   return (
//     sectionsTotal() > sectionsCompleted(store.Completed, { application: store })
//   )
// }

export const hideHippa = (store = {}) => {
  const psych = store.Psychological || {}
  const flagged = (question) => {
    return question && question.value === 'Yes'
  }

  const tests = [
    (psych.Competence || {}).IsIncompetent,
    (psych.Consultations || {}).Consulted,
    (psych.Diagnoses || {}).Diagnosed,
    (psych.Hospitalizations || {}).Hospitalized,
    (psych.ExistingConditions || {}).HasCondition
  ]

  const showHippa = tests.some(x => flagged(x))
  return !showHippa
}

export const formIsSigned = (store = {}) => {
  const releases = (store.Submission || {}).Releases || {}
  const medical = !releases.hideHippa
    ? new SignatureValidator(releases.Medical).isValid()
    : true

  return (
    new SignatureValidator(releases.AdditionalComments).isValid() &&
    new SignatureValidator(releases.General).isValid() &&
    new SignatureValidator(releases.Credit).isValid() &&
    medical
  )
}

export const formIsLocked = (store = {}) => {
  const settings = store.Settings || {}
  return settings.locked
}
