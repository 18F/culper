import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Branch, Field, Text, DateControl, Textarea, Radio, Country, RadioGroup, Show, Checkbox, CheckboxGroup } from '../../../../Form'

export default class OneTimeBenefit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateReceived = this.updateReceived.bind(this)
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
        Received: this.props.Received,
        Country: this.props.Country,
        Value: this.props.Value,
        ValueEstimated: this.props.Value,
        Reason: this.props.Reason,
        Obligated: this.props.Obligated,
        ObligatedExplanation: this.props.ObligatedExplanation,
        [field]: values
      })
    }
  }

  updateReceived (values) {
    this.update('Received', values)
  }

  updateCountry (values) {
    this.update('Country', values)
  }

  updateValue (values) {
    this.update('Value', values)
  }

  updateValueEstimated (values) {
    this.update('ValueEstimated', values)
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
      <div className="onetime-benefit">
        <Field title={i18n.t('foreign.activities.benefit.oneTime.heading.received')}
          help={'foreign.activities.benefit.oneTime.help.received'}
          adjustFor="labels">

          <DateControl name="Received"
            className="received"
            {...this.props.Received}
            label={i18n.t('foreign.activities.benefit.oneTime.label.received')}
            prefix={this.props.prefix}
            onUpdate={this.updateReceived}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.oneTime.heading.country')}
          help={'foreign.activities.benefit.oneTime.help.country'}>
          <Country name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.oneTime.heading.value')}
          help={'foreign.activities.benefit.oneTime.help.value'}>
          <Currency name="Value"
            className="value"
            {...this.props.Value}
            onUpdate={this.updateValue}
            onValidate={this.props.onValidate}
          />
          <div className="flags">
            <Checkbox name="ValueEstimated"
              label={i18n.t('foreign.activities.benefit.oneTime.label.valueEstimated')}
              toggle="false"
              checked={this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
            />
          </div>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.oneTime.heading.reason')}
          help={'foreign.activities.benefit.oneTime.help.value'}>
          <Textarea name="Reason"
            className="reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Branch name="Obligated"
          className="obligated"
          label={i18n.t('foreign.activities.benefit.oneTime.heading.obligated')}
          labelSize="h3"
          value={this.props.Obligated}
          onValidate={this.handleValidation}
          onUpdate={this.updateObligated}>
        </Branch>

        <Show when={this.props.Obligated === 'Yes'}>
          <div>
            {i18n.m('foreign.activities.benefit.oneTime.label.obligatedExplanation')}
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
