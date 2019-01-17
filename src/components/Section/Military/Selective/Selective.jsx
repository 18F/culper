import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { SelectiveServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import {
  Branch,
  Show,
  Text,
  Textarea,
  Field,
  NotApplicable
} from '../../../Form'

export default class Selective extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBornAfter = this.updateBornAfter.bind(this)
    this.updateRegistered = this.updateRegistered.bind(this)
    this.updateRegisteredNotApplicable = this.updateRegisteredNotApplicable.bind(
      this
    )
    this.updateRegistrationNumber = this.updateRegistrationNumber.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      WasBornAfter: this.props.WasBornAfter,
      HasRegistered: this.props.HasRegistered,
      HasRegisteredNotApplicable: this.props.HasRegisteredNotApplicable,
      RegistrationNumber: this.props.RegistrationNumber,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateBornAfter(values) {
    const emptyValue = { value: '' }
    // If there is no history clear out any previously entered data
    this.update({
      WasBornAfter: values,
      HasRegistered:
        values.value === 'Yes' ? this.props.HasRegistered : emptyValue,
      RegistrationNumber:
        values.value === 'Yes' ? this.props.RegistrationNumber : emptyValue,
      Explanation: values.value === 'Yes' ? this.props.Explanation : emptyValue
    })
  }

  updateRegistered(values) {
    const emptyValue = { value: '' }
    // If there is no history clear out any previously entered data
    this.update({
      HasRegistered: values,
      RegistrationNumber:
        values.value === 'Yes' ? this.props.RegistrationNumber : emptyValue,
      Explanation: values.value === 'Yes' ? emptyValue : this.props.Explanation
    })
  }

  updateRegisteredNotApplicable(values) {
    const emptyValue = { value: '' }
    // If there is no history clear out any previously entered data
    this.update({
      HasRegistered: emptyValue,
      HasRegisteredNotApplicable: values,
      RegistrationNumber: emptyValue,
      Explanation: values.applicable ? emptyValue : this.props.Explanation
    })
  }

  updateRegistrationNumber(value) {
    this.update({
      RegistrationNumber: value
    })
  }

  updateExplanation(value) {
    this.update({
      Explanation: value
    })
  }

  render() {
    return (
      <div
        className="section-content selective"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="was_bornafter"
          label={i18n.t('military.selective.heading.born')}
          labelSize="h4"
          className="born"
          {...this.props.WasBornAfter}
          help="military.selective.help.born"
          warning={true}
          onUpdate={this.updateBornAfter}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.WasBornAfter.value === 'Yes'}>
          <div>
            <NotApplicable
              {...this.props.HasRegisteredNotApplicable}
              name="HasRegisteredNotApplicable"
              label={i18n.t('military.selective.label.idk')}
              or={i18n.m('military.selective.para.or')}
              onError={this.props.onError}
              onUpdate={this.updateRegisteredNotApplicable}>
              <Branch
                name="has_registered"
                className="registered"
                label={i18n.t('military.selective.heading.registered')}
                labelSize="h4"
                {...this.props.HasRegistered}
                warning={true}
                onUpdate={this.updateRegistered}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}
              />
            </NotApplicable>

            <Show when={this.props.HasRegistered.value === 'Yes'}>
              <div>
                <Field
                  title={i18n.t('military.selective.heading.number')}
                  className="no-margin-bottom"
                  adjustFor="labels"
                  scrollIntoView={this.props.scrollIntoView}>
                  <Text
                    name="RegistrationNumber"
                    className="registration-number"
                    label={i18n.t('military.selective.label.number')}
                    {...this.props.RegistrationNumber}
                    pattern="^\d*$"
                    prefix="selective"
                    onUpdate={this.updateRegistrationNumber}
                    onError={this.handleError}
                    required={this.props.required}
                  />
                </Field>

                <div className="field">
                  <div className="table">
                    <div className="messages">
                      <div className="message help">
                        <strong>
                          {i18n.t('military.selective.help.remember.title')}
                        </strong>
                        {i18n.m('military.selective.help.remember.message')}
                        <div>
                          <p>
                            <a
                              href="https://www.sss.gov/Registration/Check-a-Registration/Verification-Form"
                              target="_blank"
                              rel="noopener noreferrer">
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

            <Show
              when={
                this.props.HasRegistered.value === 'No' ||
                !(this.props.HasRegisteredNotApplicable || {}).applicable
              }>
              <Field
                title={i18n.t('military.selective.label.explanation')}
                titleSize="h4"
                help="military.selective.help.explanation"
                adjustFor="textarea"
                scrollIntoView={this.props.scrollIntoView}>
                <Textarea
                  name="Explanation"
                  className="explanation"
                  {...this.props.Explanation}
                  onUpdate={this.updateExplanation}
                  onError={this.handleError}
                  required={this.props.required}
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
  WasBornAfter: {},
  HasRegistered: { value: '' },
  HasRegisteredNotApplicable: { applicable: true },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'military',
  subsection: 'selective',
  dispatch: () => {},
  validator: data => {
    return validate(schema('military.selective', data))
  }
}
