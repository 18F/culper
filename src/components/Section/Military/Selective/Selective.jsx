import React from 'react'
import { i18n } from '../../../../config'
import { SelectiveServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Text, Textarea, Field } from '../../../Form'

export default class Selective extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBornAfter = this.updateBornAfter.bind(this)
    this.updateRegistered = this.updateRegistered.bind(this)
    this.updateRegistrationNumber = this.updateRegistrationNumber.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      WasBornAfter: this.props.WasBornAfter,
      HasRegistered: this.props.HasRegistered,
      RegistrationNumber: this.props.RegistrationNumber,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateBornAfter (value, event) {
    let values = {
      WasBornAfter: value
    }

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      values.HasRegistered = null
      values.RegistrationNumber = null
      values.Explanation = null
    }

    this.update(values)
  }

  updateRegistered (value, event) {
    // If there is no history clear out any previously entered data
    this.update({
      HasRegistered: value,
      RegistrationNumber: value === 'Yes' ? this.props.RegistrationNumber : null,
      Explanation: value === 'Yes' ? null : this.props.Explanation
    })
  }

  updateRegistrationNumber (value) {
    this.update({
      RegistrationNumber: value
    })
  }

  updateExplanation (value) {
    this.update({
      Explanation: value
    })
  }

  render () {
    return (
      <div className="selective">
        <Branch name="was_bornafter"
                className="born"
                value={this.props.WasBornAfter}
                help="military.selective.help.born"
                warning={true}
                onUpdate={this.updateBornAfter}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.WasBornAfter === 'Yes'}>
          <div>
            <h3>{i18n.t('military.selective.heading.registered')}</h3>
            <Branch name="has_registered"
                    className="registered no-margin-bottom"
                    value={this.props.HasRegistered}
                    warning={true}
                    onUpdate={this.updateRegistered}
                    onError={this.handleError}>
            </Branch>

            <Show when={this.props.HasRegistered === 'Yes'}>
              <div>
                <Field title={i18n.t('military.selective.heading.number')}
                       className="no-margin-bottom"
                       adjustFor="labels">
                  <Text name="RegistrationNumber"
                        className="registration-number"
                        label={i18n.t('military.selective.label.number')}
                        {...this.props.RegistrationNumber}
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

            <Show when={this.props.HasRegistered === 'No'}>
              <Field help="military.selective.help.explanation"
                     className="no-margin-bottom"
                     adjustFor="labels">
                <Textarea name="Explanation"
                          className="explanation"
                          label={i18n.t('military.selective.label.explanation')}
                          {...this.props.Explanation}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'selective',
  dispatch: () => {},
  validator: (state, props) => {
    return new SelectiveServiceValidator(props, props).isValid()
  }
}
