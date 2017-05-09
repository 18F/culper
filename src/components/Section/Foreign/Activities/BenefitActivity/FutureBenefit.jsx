import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Branch, Field, Text, DateControl, Textarea, Radio, Country, RadioGroup, Show, Checkbox, CheckboxGroup } from '../../../../Form'

export default class FutureBenefit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBegin = this.updateBegin.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
    this.updateOtherFrequency = this.updateOtherFrequency.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateValueEstimated = this.updateValueEstimated.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateObligated = this.updateObligated.bind(this)
    this.updateObligatedExplanation = this.updateObligatedExplanation.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Begin: this.props.Begin,
        Frequency: this.props.Frequency,
        OtherFrequency: this.props.OtherFrequency,
        Country: this.props.Country,
        Value: this.props.Value,
        ValueEstimated: this.props.ValueEstimated,
        Reason: this.props.Reason,
        Obligated: this.props.Obligated,
        ObligatedExplanation: this.props.ObligatedExplanation,
        [field]: values
      })
    }
  }

  updateBegin (values) {
    this.update('Begin', values)
  }

  updateFrequency (cb) {
    this.update('Frequency', cb.value)
  }

  updateOtherFrequency (values) {
    this.update('OtherFrequency', values)
  }

  updateCountry (values) {
    this.update('Country', values)
  }

  updateValue (values) {
    this.update('Value', values)
  }

  updateValueEstimated (cb) {
    this.update('ValueEstimated', cb.checked)
  }

  updateReason (values) {
    this.update('Reason', values)
  }

  updateObligated (values) {
    this.update('Obligated', values)
  }

  updateObligatedExplanation (values) {
    this.update('ObligatedExplanation', values)
  }

  render () {
    return (
      <div className="future-benefit">
        <Field title={i18n.t('foreign.activities.benefit.future.heading.begin')}
          help={'foreign.activities.benefit.future.help.begin'}
          adjustFor="labels">

          <DateControl name="Begin"
            className="begin"
            {...this.props.Begin}
            label={i18n.t('foreign.activities.benefit.future.label.begin')}
            prefix={this.props.prefix}
            onUpdate={this.updateBegin}
            onValidate={this.props.onValidate}
            maxDate={null}
          />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.future.heading.frequency')}
               help={'foreign.activities.benefit.future.help.frequency'}
               adjustFor="big-buttons">

          <RadioGroup className="frequency" selectedValue={this.props.Frequency}>
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.future.label.frequency.annually')}
              value="Annually"
              onUpdate={this.updateFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.future.label.frequency.quarterly')}
              value="Quarterly"
              onUpdate={this.updateFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.future.label.frequency.monthly')}
              value="Monthly"
              onUpdate={this.updateFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.future.label.frequency.weekly')}
              value="Weekly"
              onUpdate={this.updateFrequency}
              onValidate={this.props.onValidate}
            />
            <Radio name="benefit_frequency"
              label={i18n.m('foreign.activities.benefit.future.label.frequency.other')}
              value="Other"
              onUpdate={this.updateFrequency}
              onValidate={this.props.onValidate}
            />
          </RadioGroup>
          <Show when={this.props.Frequency === 'Other'}>
            <div>
              {i18n.m('foreign.activities.benefit.future.para.frequencyOther')}
              <Textarea name="OtherFrequency"
                className="other-frequency"
                {...this.props.OtherFrequency}
                onUpdate={this.updateOtherFrequency}
                onValidate={this.props.onValidate}
              />
            </div>
          </Show>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.future.heading.country')}
          help={'foreign.activities.benefit.future.help.country'}>
          <Country name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.future.heading.value')}
          help={'foreign.activities.benefit.future.help.value'}>
          <Currency name="Value"
            className="value"
            {...this.props.Value}
            onUpdate={this.updateValue}
            onValidate={this.props.onValidate}
          />
          <div className="flags">
            <Checkbox name="ValueEstimated"
              label={i18n.t('foreign.activities.benefit.future.label.valueEstimated')}
              toggle="false"
              checked={this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
              onValidate={this.props.onValidate}
            />
          </div>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.future.heading.reason')}
          help={'foreign.activities.benefit.future.help.value'}>
          <Textarea name="Reason"
            className="reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Branch name="Obligated"
          className="obligated"
          label={i18n.t('foreign.activities.benefit.future.heading.obligated')}
          labelSize="h3"
          value={this.props.Obligated}
          onValidate={this.props.onValidate}
          onUpdate={this.updateObligated}>
        </Branch>

        <Show when={this.props.Obligated === 'Yes'}>
          <div>
            {i18n.m('foreign.activities.benefit.future.label.obligatedExplanation')}
            <Textarea name="Explanation"
              className="explanation"
              {...this.props.ObligatedExplanation}
              onUpdate={this.updateObligatedExplanation}
              onValidate={this.props.onValidate}
            />
          </div>
        </Show>
      </div>
    )
  }
}
