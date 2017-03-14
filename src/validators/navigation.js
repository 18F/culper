export default class NavigationValidator {
  constructor (state, props) {
    this.completed = props.completed
    this.crumbs = props.crumbs
  }

  /**
   * Validates that a section is marked as complete
   */
  isValid () {
    for (let section in this.completed) {
      if (section !== this.crumbs[0]) {
        continue
      }

      if (this.crumbs.length === 1) {
        return this.completed[section].status === 'complete'
      }
    }

    return false
  }
}
