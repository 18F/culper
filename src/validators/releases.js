import { STATUS_SUBMITTED } from 'constants/enums/applicationStatuses'
import SignatureValidator from './signature'

export const hideHippa = (store = {}) => {
  const psych = store.Psychological || {}
  const flagged = question => question && question.value === 'Yes'

  const tests = [
    (psych.Competence || {}).IsIncompetent,
    (psych.Consultations || {}).Consulted,
    (psych.Diagnoses || {}).Diagnosed,
    (psych.Hospitalizations || {}).Hospitalized,
    (psych.ExistingConditions || {}).HasCondition,
  ]

  const showHippa = tests.some(x => flagged(x))
  return !showHippa
}

export const formIsSigned = (signatures = {}, hideHippaSection) => {
  const medical = !hideHippaSection
    ? new SignatureValidator(signatures.Medical).isValid()
    : true

  return (
    new SignatureValidator(signatures.AdditionalComments).isValid()
    && new SignatureValidator(signatures.General).isValid()
    && new SignatureValidator(signatures.Credit).isValid()
    && medical
  )
}

export const formIsLocked = (store = {}) => {
  const settings = store.Settings || {}
  return settings.status === STATUS_SUBMITTED
}
