import React from 'react'
import { i18n } from '../../../../config'
import {
  DateRange,
  ValidationElement,
  Field,
  Textarea,
  DateControl
} from '../../../Form'

export default class NegativeImpact extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateOccurred = this.updateOccurred.bind(this)
    this.updateCircumstances = this.updateCircumstances.bind(this)
    this.updateNegativeImpact = this.updateNegativeImpact.bind(this)
    this.updateUsed = this.updateUsed.bind(this)
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Occurred: this.props.Occurred,
        Circumstances: this.props.Circumstances,
        NegativeImpact: this.props.NegativeImpact,
        Used: this.props.Used,
        ...updateValues
      })
    }
  }

  updateOccurred(values) {
    this.update({ Occurred: values })
  }

  updateCircumstances(values) {
    this.update({ Circumstances: values })
  }

  updateNegativeImpact(values) {
    this.update({ NegativeImpact: values })
  }

  updateUsed(values) {
    this.update({ Used: values })
  }

  render() {
    return (
      <div className="negative-impact">
        <Field
          title={i18n.t('substance.alcohol.negativeImpact.heading.occurred')}
          help={'substance.alcohol.negativeImpact.help.occurred'}
          adjustFor="labels"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Occurred"
            className="occurred"
            {...this.props.Occurred}
            label={i18n.t('substance.alcohol.negativeImpact.label.occurred')}
            hideDay={true}
            minDate={this.props.Used}
            minDateEqualTo={true}
            onUpdate={this.updateOccurred}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.alcohol.negativeImpact.heading.circumstances'
          )}
          className="no-margin-bottom"
        />

        <Field
          title={i18n.t('substance.alcohol.negativeImpact.label.circumstances')}
          titleSize="label"
          className="no-margin-bottom"
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Circumstances"
            className="circumstances"
            {...this.props.Circumstances}
            onUpdate={this.updateCircumstances}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.alcohol.negativeImpact.label.negativeImpact'
          )}
          titleSize="label"
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="textarea">
          <Textarea
            name="NegativeImpact"
            className="negative-impact-explanation"
            {...this.props.NegativeImpact}
            onUpdate={this.updateNegativeImpact}
            required={this.props.required}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('substance.alcohol.negativeImpact.heading.used')}
          help={'substance.alcohol.negativeImpact.help.used'}
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Used"
            className="used"
            {...this.props.Used}
            minDateEqualTo={true}
            onUpdate={this.updateUsed}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

NegativeImpact.defaultProps = {
  onError: (value, arr) => {
    return arr
  }
}
