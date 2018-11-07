import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  Text,
  Textarea,
  Country,
  DateControl
} from '../../../Form'

export default class VotingItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateEligibility = this.updateEligibility.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Date: this.props.Date,
      Country: this.props.Country,
      Reason: this.props.Reason,
      Eligibility: this.props.Eligibility,
      ...queue
    })
  }

  updateDate(values) {
    this.update({
      Date: values
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
      <div className="foreign-business-voting-item">
        <Field
          title={i18n.t('foreign.business.voting.heading.date')}
          help="foreign.business.voting.help.date"
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Date"
            {...this.props.Date}
            minDateEqualTo={true}
            onUpdate={this.updateDate}
            onError={this.props.onError}
            className="foreign-business-voting-date"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.voting.heading.country')}
          adjustFor="country"
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            className="foreign-business-voting-country"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.voting.heading.reason')}
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Reason"
            {...this.props.Reason}
            onUpdate={this.updateReason}
            onError={this.props.onError}
            className="foreign-business-voting-reason"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.voting.heading.eligibility')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Eligibility"
            {...this.props.Eligibility}
            onUpdate={this.updateEligibility}
            onError={this.props.onError}
            className="foreign-business-voting-eligibility"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

VotingItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
