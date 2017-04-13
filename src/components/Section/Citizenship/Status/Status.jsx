import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Field, RadioGroup, Radio } from '../../../Form'

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

export default class Status extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      CitizenshipStatus: props.CitizenshipStatus,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateCitizenshipStatus = this.updateCitizenshipStatus.bind(this)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new CitizenshipValidator(this.state, null).isValid()
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateCitizenshipStatus (event) {
    this.onUpdate('CitizenshipStatus', event.target.value)
  }

  render () {
    return (
      <div className="status">
        <Field title={i18n.t('citizenship.status.heading.citizenshipstatus')}
               help="citizenship.status.help.citizenshipstatus"
               adjustFor="buttons">
          <RadioGroup className="citizenship-status"
                      selectedValue={this.state.CitizenshipStatus}>
            <Radio name="citizenship-status-citizen"
                   label={i18n.t('citizenship.status.label.citizenshipstatus.citizen')}
                   value="Citizen"
                   className="citizenship-status-citizen"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-foreignborn"
                   label={i18n.t('citizenship.status.label.citizenshipstatus.foreignborn')}
                   value="ForeignBorn"
                   className="citizenship-status-foreignborn"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-naturalized"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.naturalized')}
                   value="Naturalized"
                   className="citizenship-status-naturalized"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-derived"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.derived')}
                   value="Derived"
                   className="citizenship-status-derived"
                   onChange={this.updateCitizenshipStatus}
                   />
            <Radio name="citizenship-status-notcitizen"
                   label={i18n.m('citizenship.status.label.citizenshipstatus.notcitizen')}
                   value="NotCitizen"
                   className="citizenship-status-notcitizen"
                   onChange={this.updateCitizenshipStatus}
                   />
          </RadioGroup>
        </Field>

        <Show when={this.state.CitizenshipStatus === 'ForeignBorn'}>
          <div></div>
        </Show>

        <Show when={this.state.CitizenshipStatus === 'Naturalized'}>
          <div></div>
        </Show>

        <Show when={this.state.CitizenshipStatus === 'Derived'}>
          <div></div>
        </Show>

        <Show when={this.state.CitizenshipStatus === 'NotCitizen'}>
          <div></div>
        </Show>
      </div>
    )
  }
}

Status.defaultProps = {
  CitizenshipStatus: ''
}
