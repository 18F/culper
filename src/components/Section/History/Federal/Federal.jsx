import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show } from '../../../Form'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Federal extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasFederalService: props.HasFederalService,
      List: props.List || []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateBranch (value) {
    this.onUpdate('HasFederalService', value)
    if (value === 'No') {
      this.onUpdate('List', [])
    }
  }

  render () {
    return (
      <div className="federal">
        <h3>{i18n.t('history.federal.heading.branch')}</h3>
        <Branch name="has_federalservice"
                className="eapp-field-wrap"
                value={this.state.HasFederalService}
                help="history.federal.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasFederalService === 'Yes'}>
          <div className="collection"></div>
        </Show>
      </div>
    )
  }
}
