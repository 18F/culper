import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field,
         Textarea, Country, DateControl, Name, Location } from '../../../Form'
import SubsequentContacts from './SubsequentContacts'

export default class ContactItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateGovernments = this.updateGovernments.bind(this)
    this.updateEstablishment = this.updateEstablishment.bind(this)
    this.updateRepresentatives = this.updateRepresentatives.bind(this)
    this.updatePurpose = this.updatePurpose.bind(this)
    this.updateSubsequentContacts = this.updateSubsequentContacts.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Location: this.props.Location,
      Date: this.props.Date,
      Governments: this.props.Governments,
      Establishment: this.props.Establishment,
      Representatives: this.props.Representatives,
      Purpose: this.props.Purpose,
      SubsequentContacts: this.props.SubsequentContacts,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateLocation (values) {
    this.update({
      Location: values
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  updateGovernments (values) {
    this.update({
      Governments: values
    })
  }

  updateEstablishment (values) {
    this.update({
      Establishment: values
    })
  }

  updateRepresentatives (values) {
    this.update({
      Representatives: values
    })
  }

  updatePurpose (values) {
    this.update({
      Purpose: values
    })
  }

  updateSubsequentContacts (values) {
    this.update({
      SubsequentContacts: values
    })
  }

  render () {
    return (
      <div className="foreign-business-contact-item">
        <Field title={i18n.t('foreign.business.contact.heading.name')}
               optional={true}
               filterErrors={Name.requiredErrorsOnly}
               scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                className="foreign-business-contact-name"
                required={this.props.required}
                />
        </Field>
        <Field title={i18n.t('foreign.business.contact.heading.location')}
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Location"
                    {...this.props.Location}
                    onUpdate={this.updateLocation}
                    onError={this.props.onError}
                    layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
                    help=""
                    label={i18n.t('foreign.business.contact.label.location')}
                    cityPlaceholder={i18n.t('foreign.business.contact.placeholder.city')}
                    countryPlaceholder={i18n.t('foreign.business.contact.placeholder.country')}
                    className="birthplace foreign-business-contact-location"
                    addressBooks={this.props.addressBooks}
                    addressBook="ForeignNational"
                    dispatch={this.props.dispatch}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.business.contact.heading.date')}
               help="foreign.business.contact.help.date"
               adjustFor="datecontrol"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Date"
                       {...this.props.Date}
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       className="foreign-business-contact-date"
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('foreign.business.contact.heading.governments')}
               help="foreign.business.contact.help.governments"
               adjustFor="country"
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Governments"
                   {...this.props.Governments}
                   onUpdate={this.updateGovernments}
                   onError={this.props.onError}
                   className="foreign-business-contact-governments"
                   multiple={true}
                   required={this.props.required}
                   />
        </Field>

        <Field title={i18n.t('foreign.business.contact.heading.establishment')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Establishment"
                    {...this.props.Establishment}
                    onUpdate={this.updateEstablishment}
                    onError={this.props.onError}
                    className="foreign-business-contact-establishment"
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.business.contact.heading.representatives')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Representatives"
                    {...this.props.Representatives}
                    onUpdate={this.updateRepresentatives}
                    onError={this.props.onError}
                    className="foreign-business-contact-representatives"
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('foreign.business.contact.heading.purpose')}
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Purpose"
                    {...this.props.Purpose}
                    onUpdate={this.updatePurpose}
                    onError={this.props.onError}
                    className="foreign-business-contact-purpose"
                    required={this.props.required}
                    />
        </Field>

        <SubsequentContacts {...this.props.SubsequentContacts}
                            onUpdate={this.updateSubsequentContacts}
                            onError={this.props.onError}
                            name="SubsequentContacts"
                            required={this.props.required}
                            scrollIntoView={this.props.scrollIntoView}
                            />
      </div>
    )
  }
}

ContactItem.defaultProps = {
  Name: {},
  Location: {},
  Date: {},
  Governments: {},
  Establishment: {},
  Representatives: {},
  Purpose: {},
  SubsequentContacts: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
