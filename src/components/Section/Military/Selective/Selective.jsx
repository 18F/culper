import React from 'react'
import { i18n } from '../../../../config'
import { SelectiveServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Text, Textarea, Field } from '../../../Form'

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

export default class Selective extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      WasBornAfter: props.WasBornAfter,
      HasRegistered: props.HasRegistered,
      RegistrationNumber: props.RegistrationNumber,
      Explanation: props.Explanation
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
  }

  updateRegistered (value, event) {
    this.onUpdate('HasRegistered', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('RegistrationNumber', null)
    } else if (value === 'Yes') {
      this.onUpdate('Explanation', null)
    }
  }

  updateRegistrationNumber (value) {
    this.onUpdate('RegistrationNumber', value)
  }

  updateExplanation (value) {
    this.onUpdate('Explanation', value)
  }

  render () {
    return (
      <div className="selective">
        <Branch name="was_bornafter"
                className="born"
                value={this.state.WasBornAfter}
                help="military.selective.help.born"
                onUpdate={this.updateBornAfter}
                onError={this.handleError}>
        </Branch>

        <Show when={this.state.WasBornAfter === 'Yes'}>
          <div>
            <h3>{i18n.t('military.selective.heading.registered')}</h3>
            <Branch name="has_registered"
                    className="registered no-margin-bottom"
                    value={this.state.HasRegistered}
                    onUpdate={this.updateRegistered}
                    onError={this.handleError}>
            </Branch>

            <Show when={this.state.HasRegistered === 'Yes'}>
              <div>
                <Field title={i18n.t('military.selective.heading.number')}
                       className="no-margin-bottom"
                       adjustFor="labels">
                  <Text name="RegistrationNumber"
                        className="registration-number"
                        label={i18n.t('military.selective.label.number')}
                        {...this.state.RegistrationNumber}
                        onUpdate={this.updateRegistrationNumber}
                        onError={this.handleError}
                        />
                </Field>

                <div className="field">
                  <div className="table">
                    <div className="messages">
                      <div className="message help">
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
              </div>
            </Show>

            <Show when={this.state.HasRegistered === 'No'}>
              <Field help="military.selective.help.explanation"
                     className="no-margin-bottom"
                     adjustFor="labels">
                <Textarea name="Explanation"
                          className="explanation"
                          label={i18n.t('military.selective.label.explanation')}
                          {...this.state.Explanation}
                          onUpdate={this.updateExplanation}
                          onError={this.handleError}
                          />
              </Field>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Selective.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'selective',
  dispatch: () => {},
  validator: (state, props) => {
    return new SelectiveServiceValidator(state, props).isValid()
  }
}
