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
  Checkbox
} from '../../../../Form'

export default class ContinuingBenefit extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBegan = this.updateBegan.bind(this)
    this.updateEnd = this.updateEnd.bind(this)
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
      End: this.props.End,
      Frequency: this.props.Frequency,
      OtherFrequency: this.props.OtherFrequency,
      Country: this.props.Country,
      Value: this.props.Value,
      ValueEstimated: this.props.ValueEstimated,
      Reason: this.props.Reason,
      Obligated: this.props.Obligated,
      ObligatedExplanation: this.props.ObligatedExplanation,
      ...queue
    })
  }

  updateBegan(values) {
    this.update({
      Began: values
    })
  }

  updateEnd(values) {
    this.update({
      End: values
    })
  }

  updateFrequency(values) {
    this.update({
      Frequency: values
    })
  }

  updateOtherFrequency(values) {
    this.update({
      OtherFrequency: values
    })
  }

  updateCountry(values) {
    this.update({
      Country: values
    })
  }

  updateValue(values) {
    this.update({
      Value: values
    })
  }

  updateValueEstimated(values) {
    this.update({
      ValueEstimated: values
    })
  }

  updateReason(values) {
    this.update({
      Reason: values
    })
  }

  updateObligated(values) {
    this.update({
      Obligated: values
    })
  }

  updateObligatedExplanation(values) {
    this.update({
      ObligatedExplanation: values
    })
  }

  render() {
    return (
      <div className="continuing-benefit">
        <Field
          title={i18n.t('foreign.activities.benefit.continuing.heading.began')}
          help={'foreign.activities.benefit.continuing.help.began'}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Began"
            className="began"
            {...this.props.Began}
            label={i18n.t('foreign.activities.benefit.continuing.label.began')}
            onUpdate={this.updateBegan}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.continuing.heading.end')}
          help={'foreign.activities.benefit.continuing.help.end'}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="End"
            className="end"
            {...this.props.End}
            label={i18n.t('foreign.activities.benefit.continuing.label.end')}
            onUpdate={this.updateEnd}
            minDate={this.props.Began}
            noMaxDate={true}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'foreign.activities.benefit.continuing.heading.frequency'
          )}
          adjustFor="big-buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="frequency"
            onError={this.props.onError}
            required={this.props.required}
            selectedValue={(this.props.Frequency || {}).value}>
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.continuing.label.frequency.annually'
              )}
              value="Annually"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.continuing.label.frequency.quarterly'
              )}
              value="Quarterly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.continuing.label.frequency.monthly'
              )}
              value="Monthly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.continuing.label.frequency.weekly'
              )}
              value="Weekly"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
            <Radio
              name="benefit_frequency"
              label={i18n.m(
                'foreign.activities.benefit.continuing.label.frequency.other'
              )}
              value="Other"
              onUpdate={this.updateFrequency}
              onError={this.props.onError}
            />
          </RadioGroup>
          <Show when={(this.props.Frequency || {}).value === 'Other'}>
            <div>
              {i18n.m(
                'foreign.activities.benefit.continuing.para.frequencyOther'
              )}
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
          title={i18n.t(
            'foreign.activities.benefit.continuing.heading.country'
          )}
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.continuing.heading.value')}
          scrollIntoView={this.props.scrollIntoView}>
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
                'foreign.activities.benefit.continuing.label.valueEstimated'
              )}
              toggle="false"
              {...this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
              onError={this.props.onError}
            />
          </div>
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.continuing.heading.reason')}
          scrollIntoView={this.props.scrollIntoView}>
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
          label={i18n.t(
            'foreign.activities.benefit.continuing.heading.obligated'
          )}
          labelSize="h3"
          {...this.props.Obligated}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateObligated}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.Obligated || {}).value === 'Yes'}>
          <Field
            title={i18n.m(
              'foreign.activities.benefit.continuing.label.obligatedExplanation'
            )}
            titleSize="label"
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}>
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

ContinuingBenefit.defaultProps = {
  Obligated: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
