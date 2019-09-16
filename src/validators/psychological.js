import { allHaveStatus, anyHasStatus } from './helpers'

const defaultPsychologicalState = {
  Competence: null,
  Consultation: null,
  Diagnoses: null,
  Hospitalization: null,
}

/**
 * Determines if Question 21 E should be rendered.
 * The following subsections must have branch values of No.
 *   - Competence
 *   - Consultations
 *   - Hospitalizations
 *   - Diagnoses
 */
export const showQuestion21E = (psychological = defaultPsychologicalState) => {
  const {
    Competence,
    Consultations,
    Diagnoses,
    Hospitalizations,
  } = psychological

  // We need values for everything before we can do anything
  if (!Competence || !Consultations || !Diagnoses || !Hospitalizations) {
    return false
  }

  // We show question 21 if all other subsections have been marked with No
  return (
    Competence.IsIncompetent.value === 'No' &&
    Consultations.Consulted.value === 'No' &&
    Diagnoses.Diagnosed.value === 'No' &&
    Hospitalizations.Hospitalized.value === 'No'
  )
}

export const hideExistingConditions = (application = {}) => {
  return !showQuestion21E(application.Psychological)
}
