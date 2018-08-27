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
import ConferenceContacts from './ConferenceContacts'

export default class ConferencesItem extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateSponsor = this.updateSponsor.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updatePurpose = this.updatePurpose.bind(this)
    this.updateContacts = this.updateContacts.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Description: this.props.Description,
      Sponsor: this.props.Sponsor,
      City: this.props.City,
      Country: this.props.Country,
      Dates: this.props.Dates,
      Purpose: this.props.Purpose,
      Contacts: this.props.Contacts,
      ...queue
    })
  }

  updateDescription(values) {
    this.update({
      Description: values
    })
  }

  updateSponsor(values) {
    this.update({
      Sponsor: values
    })
  }

  updateCity(values) {
    this.update({
      City: values
    })
  }

  updateCountry(values) {
    this.update({
      Country: values
    })
  }

  updateDates(values) {
    this.update({
      Dates: values
    })
  }

  updatePurpose(values) {
    this.update({
      Purpose: values
    })
  }

  updateContacts(values) {
    this.update({
      Contacts: values
    })
  }

  render() {
    return (
      <div className="conferences-item">
        <Field
          title={i18n.t('foreign.business.conferences.heading.description')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Description"
            {...this.props.Description}
            onUpdate={this.updateDescription}
            onError={this.props.onError}
            className="conferences-description"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.conferences.heading.sponsor')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Sponsor"
            {...this.props.Sponsor}
            onUpdate={this.updateSponsor}
            onError={this.props.onError}
            className="conferences-sponsor"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.conferences.heading.city')}
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="City"
            {...this.props.City}
            onUpdate={this.updateCity}
            onError={this.props.onError}
            className="conferences-city"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.conferences.heading.country')}
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Country"
            {...this.props.Country}
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            className="conferences-country"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.conferences.heading.dates')}
          help="foreign.business.conferences.help.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            className="conferences-dates"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.conferences.heading.purpose')}
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Purpose"
            {...this.props.Purpose}
            onUpdate={this.updatePurpose}
            onError={this.props.onError}
            className="conferences-purpose"
            required={this.props.required}
          />
        </Field>

        <ConferenceContacts
          name="Contacts"
          {...this.props.Contacts}
          onUpdate={this.updateContacts}
          onError={this.props.onError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
      </div>
    )
  }
}

ConferencesItem.defaultProps = {
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
