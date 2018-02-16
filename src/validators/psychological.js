import { allHaveStatus, anyHasStatus } from './helpers'

export default class PsychologicalValidator {
  constructor (data = {}) {
    this.completed = data.Completed
    this.psychological = data.Psychological
  }

  completionStatus (status) {
    let toCheck = ['Competence', 'Consultations', 'Hospitalizations', 'Diagnoses']

    if (showQuestion21E(this.psychological)) {
      toCheck.push('ExistingConditions')
    }

    if (allHaveStatus(this.completed)(toCheck, status, true)) {
      return 'complete'
    } else if (anyHasStatus(this.completed)(toCheck, status, false)) {
      return 'incomplete'
    }
    return 'neutral'
  }
}

const defaultPsychologicalState = {
  Competence: null,
  Consultation: null,
  Diagnoses: null,
  Hospitalization: null
}

/**
 * Determines if Question 21 E should be rendered. The following subsections must have branch values of No.
 *   - Competence
 *   - Consultations
 *   - Hospitalizations
 *   - Diagnoses
 */
export const showQuestion21E = (psychological = defaultPsychologicalState) => {
  const { Competence, Consultations, Diagnoses, Hospitalizations } = psychological

  // We need values for everything before we can do anything
  if (!Competence || !Consultations || !Diagnoses || !Hospitalizations) {
    return false
  }

  // We show question 21 if all other subsections have been marked with No
  return (Competence.IsIncompetent.value === 'No' &&
    Consultations.Consulted.value === 'No' &&
    Diagnoses.Diagnosed.value === 'No' &&
    Hospitalizations.Hospitalized.value === 'No')
}

export const hideExistingConditions = (application = {}) => {
  return !showQuestion21E(application.Psychological)
}
