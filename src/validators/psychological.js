import { allHaveStatus, anyHasStatus } from './helpers'

export default class PsychologicalValidator {
  constructor (state, props = {}) {
    this.completed = props.Completed
  }

  completionStatus (status) {
    const toCheck = ['Competence', 'Consultations', 'Hospitalizations', 'Diagnoses', 'ExistingConditions']
    if (allHaveStatus(this.completed)(toCheck, status, true)) {
      return 'complete'
    } else if (anyHasStatus(this.completed)(toCheck, status, false)) {
      return 'incomplete'
    }
    return 'neutral'
  }
}
