import React from 'react'
import { i18n } from '../../../../../config'
import {
  ValidationElement,
  Currency,
  Branch,
  Field,
  DateControl,
  Textarea,
  Country,
  Show,
  Checkbox
} from '../../../../Form'

export default class OneTimeBenefit extends ValidationElement {
  constructor(props) {
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

  update(queue) {
    this.props.onUpdate({
      Received: this.props.Received,
      Country: this.props.Country,
      Value: this.props.Value,
      ValueEstimated: this.props.ValueEstimated,
      Reason: this.props.Reason,
      Obligated: this.props.Obligated,
      ObligatedExplanation: this.props.ObligatedExplanation,
      ...queue
    })
  }

  updateReceived(values) {
    this.update({
      Received: values
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
      <div className="onetime-benefit">
        <Field
          title={i18n.t('foreign.activities.benefit.oneTime.heading.received')}
          help={'foreign.activities.benefit.oneTime.help.received'}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Received"
            className="received"
            {...this.props.Received}
            minDateEqualTo={true}
            label={i18n.t('foreign.activities.benefit.oneTime.label.received')}
            onUpdate={this.updateReceived}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.oneTime.heading.country')}
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
          title={i18n.t('foreign.activities.benefit.oneTime.heading.value')}
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
                'foreign.activities.benefit.oneTime.label.valueEstimated'
              )}
              toggle="false"
              {...this.props.ValueEstimated}
              onUpdate={this.updateValueEstimated}
              onError={this.props.onError}
            />
          </div>
        </Field>

        <Field
          title={i18n.t('foreign.activities.benefit.oneTime.heading.reason')}
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
          label={i18n.t('foreign.activities.benefit.oneTime.heading.obligated')}
          labelSize="h3"
          {...this.props.Obligated}
          onError={this.props.onError}
          required={this.props.required}
          onUpdate={this.updateObligated}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={(this.props.Obligated || {}).value === 'Yes'}>
          <Field
            title={i18n.t(
              'foreign.activities.benefit.oneTime.label.obligatedExplanation'
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

OneTimeBenefit.defaultProps = {
  Obligated: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
