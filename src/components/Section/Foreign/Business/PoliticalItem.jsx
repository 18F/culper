import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  Text,
  Textarea,
  Country,
  DateRange
} from '../../../Form'

export default class PoliticalItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateEligibility = this.updateEligibility.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Position: this.props.Position,
      Dates: this.props.Dates,
      Country: this.props.Country,
      Reason: this.props.Reason,
      Eligibility: this.props.Eligibility,
      ...queue
    })
  }

  updatePosition(values) {
    this.update({
      Position: values
    })
  }

  updateDates(values) {
    this.update({
      Dates: values
    })
  }

  updateCountry(values) {
    this.update({
      Country: values
    })
  }

  updateReason(values) {
    this.update({
      Reason: values
    })
  }

  updateEligibility(values) {
    this.update({
      Eligibility: values
    })
  }

  render() {
    return (
      <div className="foreign-business-political-item">
        <Field
          title={i18n.t('foreign.business.political.heading.position')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Position"
            {...this.props.Position}
            onUpdate={this.updatePosition}
            onError={this.props.onError}
            className="foreign-business-political-position"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.political.heading.dates')}
          help="foreign.business.political.help.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            minDate={(this.props.Birthdate || {}).date}
            minDateEqualTo={true}
            maxDate={(this.props.minDate || {}).date}
            maxDateEqualTo={true}
            className="foreign-business-political-dates"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.political.heading.country')}
          adjustFor="country"
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            className="foreign-business-political-country"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.political.heading.reason')}
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            className="foreign-business-political-reason"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.political.heading.eligibility')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Eligibility"
            {...this.props.Eligibility}
            onUpdate={this.updateEligibility}
            onError={this.props.onError}
            className="foreign-business-political-eligibility"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

PoliticalItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
