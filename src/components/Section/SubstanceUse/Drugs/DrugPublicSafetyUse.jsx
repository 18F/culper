import React from 'react'
import { i18n } from '../../../../config'
import {
  Field,
  ValidationElement,
  Text,
  Textarea,
  DateRange
} from '../../../Form'

export default class DrugPublicSafetyUse extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateInvolvementDates = this.updateInvolvementDates.bind(this)
    this.updateEstimatedUse = this.updateEstimatedUse.bind(this)
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Description: this.props.Description,
        InvolvementDates: this.props.InvolvementDates,
        EstimatedUse: this.props.EstimatedUse,
        ...updateValues
      })
    }
  }

  updateDescription(values) {
    this.update({ Description: values })
  }

  updateInvolvementDates(values) {
    this.update({ InvolvementDates: values })
  }

  updateEstimatedUse(values) {
    this.update({ EstimatedUse: values })
  }

  render() {
    return (
      <div className="drug-public-safety-use">
        <Field
          title={i18n.t('substance.drugs.publicSafety.heading.description')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Description"
            className="description"
            {...this.props.Description}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(
            'substance.drugs.publicSafety.heading.involvementDates'
          )}
          adjustFor="daterange"
          help={'substance.drugs.publicSafety.help.involvementDates'}
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="InvolvementDates"
            className="involvement-dates"
            minDateEqualTo={true}
            {...this.props.InvolvementDates}
            onUpdate={this.updateInvolvementDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('substance.drugs.publicSafety.heading.estimatedUse')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="EstimatedUse"
            className="estimated-use"
            {...this.props.EstimatedUse}
            onUpdate={this.updateEstimatedUse}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

DrugPublicSafetyUse.defaultProps = {
  onError: (value, arr) => {
    return arr
  }
}
