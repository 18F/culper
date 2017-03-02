import React from 'react'
import { i18n } from '../../../../config'
import { SelectiveServiceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Text, Textarea, Help, HelpIcon } from '../../../Form'

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

export default class Selective extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      WasBornAfter: props.WasBornAfter,
      HasRegistered: props.HasRegistered,
      RegistrationNumber: props.RegistrationNumber,
      Explanation: props.Explanation,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateBornAfter = this.updateBornAfter.bind(this)
    this.updateRegistered = this.updateRegistered.bind(this)
    this.updateRegistrationNumber = this.updateRegistrationNumber.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateBornAfter (value, event) {
    this.onUpdate('WasBornAfter', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('HasRegistered', null)
      this.onUpdate('RegistrationNumber', null)
      this.onUpdate('Explanation', null)
    }

    // Force validation checks
    this.handleValidation(event, null, null)
  }

  updateRegistered (value, event) {
    this.onUpdate('HasRegistered', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('RegistrationNumber', null)
    } else if (value === 'Yes') {
      this.onUpdate('Explanation', null)
    }

    // Force validation checks
    this.handleValidation(event, null, null)
  }

  updateRegistrationNumber (value) {
    this.onUpdate('RegistrationNumber', value)
  }

  updateExplanation (value) {
    this.onUpdate('Explanation', value)
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
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new SelectiveServiceValidator(this.state, null).isValid()
  }

  render () {
    return (
      <div className="selective">
        <Branch name="was_bornafter"
                className="eapp-field-wrap"
                value={this.state.WasBornAfter}
                help="military.selective.help.born"
                onUpdate={this.updateBornAfter}>
        </Branch>

        <Show when={this.state.WasBornAfter === 'Yes'}>
          <div>
            <h3>{i18n.t('military.selective.heading.registered')}</h3>
            <Branch name="has_registered"
                    className="eapp-field-wrap"
                    value={this.state.HasRegistered}
                    help="military.selective.help.registered"
                    onUpdate={this.updateRegistered}>
            </Branch>

            <Show when={this.state.HasRegistered === 'Yes'}>
              <div>
                <h4>{i18n.t('military.selective.heading.number')}</h4>
                <div className="eapp-field-wrap">
                  <Help id="military.selective.help.number">
                    <Text name="RegistrationNumber"
                          className="registration-number"
                          label={i18n.t('military.selective.label.number')}
                          onValidate={this.updateRegistrationNumber}
                          />
                  </Help>
                </div>
              </div>
            </Show>

            <Show when={this.state.HasRegistered === 'No'}>
              <div>
                <div className="eapp-field-wrap">
                  <Help id="military.selective.help.explanation">
                    <Textarea name="Explanation"
                              className="explanation"
                              label={i18n.t('military.selective.label.explanation')}
                              onValidate={this.updateExplanation}
                              />
                  </Help>
                </div>
              </div>
            </Show>

            <div className="eapp-field-wrap">
              <div className="help">
                <div className="message eapp-help-message">
                  <i className="fa fa-question"></i>
                  <h5>{i18n.m('military.selective.help.remember.title')}</h5>
                  {i18n.m('military.selective.help.remember.message')}
                  <div>
                    <p>
                      <a href="https://www.sss.gov/Registration/Check-a-Registration/Verification-Form" target="_blank">
                        https://www.sss.gov/Registration/Check-a-Registration/Verification-Form
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </div>
    )
  }
}
