import { allHaveStatus, anyHasStatus } from './helpers'

export default class IdentificationValidator {
  constructor(data = {}) {
    this.completed = data.Completed
  }

  completionStatus(status) {
    const toCheck = [
      'name',
      'birthdate',
      'birthplace',
      'contacts',
      'ssn',
      'physical',
      'othernames'
    ]
    if (allHaveStatus(this.completed)(toCheck, status, true)) {
      return 'complete'
    } else if (anyHasStatus(this.completed)(toCheck, status, false)) {
      return 'incomplete'
    }
    return 'neutral'
  }
}
