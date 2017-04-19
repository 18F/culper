import { allHaveStatus, anyHasStatus } from './helpers'

export default class RelationshipsValidator {
  constructor (state, props = {}) {
    this.completed = props.Completed
    this.relationships = props.Relationships
  }

  completionStatus (status) {
    let toCheck = ['relatives', 'marital', 'cohabitants', 'friends']

    if (allHaveStatus(this.completed)(toCheck, status, true)) {
      return 'complete'
    } else if (anyHasStatus(this.completed)(toCheck, status, false)) {
      return 'incomplete'
    }
    return 'neutral'
  }
}
