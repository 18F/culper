import React from 'react'
import { i18n } from '../../../../../config'
import {
  ValidationElement,
  Currency,
  Branch,
  Field,
  DateControl,
  Textarea,
  Radio,
  Country,
  RadioGroup,
  Show,
  Checkbox,
} from '../../../../Form'

export default class FutureBenefit extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBegan = this.updateBegan.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
    this.updateOtherFrequency = this.updateOtherFrequency.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateValueEstimated = this.updateValueEstimated.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateObligated = this.updateObligated.bind(this)
    this.updateObligatedExplanation = this.updateObligatedExplanation.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Began: this.props.Began,
      Frequency: this.props.Frequency,
      OtherFrequency: this.props.OtherFrequency,
      Country: this.props.Country,
      Value: this.props.Value,
      ValueEstimated: this.props.ValueEstimated,
      Reason: this.props.Reason,
      Obligated: this.props.Obligated,
      ObligatedExplanation: this.props.ObligatedExplanation,
      ...queue,
    })
  }

  updateBegan(values) {
    this.update({
      Began: values,
    })
  }

  updateFrequency(values) {
    this.update({
      Frequency: values,
    })
  }

  updateOtherFrequency(values) {
    this.update({
      OtherFrequency: values,
    })
  }

  updateCountry(values) {
    this.update({
      Country: values,
    })
  }

  updateValue(values) {
    this.update({
      Value: values,
    })
  }

  updateValueEstimated(values) {
    this.update({
      ValueEstimated: values,
    })
  }

  updateReason(values) {
    this.update({
      Reason: values,
    })
  }

  updateObligated(values) {
    this.update({
      Obligated: values,
    })
  }

  updateObligatedExplanation(values) {
    this.update({
      ObligatedExplanation: values,
    })
  }

  render() {
    // TODO
    // One of the things to go back and fix is the grammar.
    // The backend is expecting Began, which is past tense
    // Future should be Begin
    return (
      <div className="future-benefit">
        <Field
          title={i18n.t('foreign.activities.benefit.future.heading.begin')}
          help="foreign.activities.benefit.future.help.begin"
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="Began"
            className="began"
            {...this.props.Began}
            onUpdate={this.updateBegan}
            onError={this.props.onError}
            noMaxDate
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.future.heading.frequency')}
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}
        >
          <RadioGroup
            className="frequency option-list option-list-vertical"
            selectedValue={(this.props.Frequency || {}).value}
            onError={this.props.onError}
            required={this.props.required}
          >
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.future.label.frequency.annually'
              )}
              value="Annually"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.future.label.frequency.quarterly'
              )}
              value="Quarterly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.future.label.frequency.monthly'
              )}
              value="Monthly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.future.label.frequency.weekly'
              )}
              value="Weekly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.future.label.frequency.other'
              )}
              value="Other"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
          </RadioGroup>
          <Show when={(this.props.Frequency || {}).value === 'Other'}>
            <div>
              {i18n.m('foreign.activities.benefit.future.para.frequencyOther')}
              <Textarea
                name="OtherFrequency"
                className="other-frequency"
                {...this.props.OtherFrequency}
                onUpdate={this.updateOtherFrequency}
                onError={this.props.onError}
                required={this.props.required}
              />
            </div>
          </Show>
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.future.heading.country')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Country
            name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.future.heading.value')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Currency
            name="Value"
            className="value"
            {...this.props.Value}
            min="0"
            onUpdate={this.updateValue}
            onError={this.props.onError}
            required={this.props.required}
          />
          <div className="flags">
            <Checkbox
              name="ValueEstimated"
              label={i18n.t(
                'foreign.activities.benefit.future.label.valueEstimated'
              )}
              toggle="false"
              {...this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
              onError={this.props.onError}
            />
          </div>
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.future.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="Reason"
            className="reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Branch
          name="Obligated"
          className="obligated no-margin-bottom"
          label={i18n.t('foreign.activities.benefit.future.heading.obligated')}
          labelSize="h4"
          {...this.props.Obligated}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateObligated}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.Obligated || {}).value === 'Yes'}>
          <Field
            title={i18n.t(
              'foreign.activities.benefit.future.label.obligatedExplanation'
            )}
            titleSize="label"
            adjustFor="textarea"
          >
            <Textarea
              name="Explanation"
              className="explanation"
              {...this.props.ObligatedExplanation}
              onUpdate={this.updateObligatedExplanation}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

FutureBenefit.defaultProps = {
  Obligated: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
