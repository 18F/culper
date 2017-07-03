import { sectionsTotal, sectionsCompleted } from './navigation'
import { hideExistingConditions } from './psychological'

export const hideReleases = (store = {}) => {
  return sectionsTotal() > sectionsCompleted(store.Completed, { application: store })
}

export const hideHippa = (store = {}) => {
  const psych = store.Psychological || {}
  const tests = [
    {
      affirmative: (psych, store) => { return (psych.Competence || {}).IsIncompetent !== 'Yes' }
    },
    {
      affirmative: (psych, store) => { return (psych.Consultation || {}).Consulted !== 'Yes' }
    },
    {
      affirmative: (psych, store) => { return (psych.Diagnoses || {}).Diagnosed !== 'Yes' }
    },
    {
      affirmative: (psych, store) => { return (psych.Hospitalization || {}).Hospitalized !== 'Yes' }
    },
    {
      affirmative: (psych, store) => { return hideExistingConditions(store) || (psych.ExistingConditions || {}).HasCondition !== 'Yes' }
    }
  ]

  return tests.every(x => x.affirmative(psych, store))
}
