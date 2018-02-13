import React from 'react'
import { i18n } from '../../../../config'
import { Name, Location, DateRange, Text, Field } from '../../../Form'

export default class ForeignContact extends React.Component {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Address: this.props.Address,
      Title: this.props.Title,
      Dates: this.props.Dates,
      Frequency: this.props.Frequency,
      ...queue
    })
  }

  updateName (value) {
    this.update({
      Name: value
    })
  }

  updateAddress (value) {
    this.update({
      Address: value
    })
  }

  updateTitle (value) {
    this.update({
      Title: value
    })
  }

  updateDates (value) {
    this.update({
      Dates: value
    })
  }

  updateFrequency (value) {
    this.update({
      Frequency: value
    })
  }

  render () {
    return (
      <div className="foreign-contact">
        <Field title={i18n.t('military.foreign.heading.contact.name')}
               optional={true}
               scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
                className="foreign-contact-name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.address')}
               optional={true}
               help="military.foreign.help.contact.address"
               adjustFor="address"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    className="foreign-contact-address"
                    {...this.props.Address}
                    addressBooks={this.props.addressBooks}
                    addressBook="ForeignNational"
                    dispatch={this.props.dispatch}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.title')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Title"
                {...this.props.Title}
                className="foreign-contact-title"
                maxlength="100"
                onUpdate={this.updateTitle}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.dates')}
               help="military.foreign.help.contact.dates"
               adjustFor="daterange"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     className="foreign-contact-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.frequency')}
               help="military.foreign.help.contact.frequency"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Frequency"
                {...this.props.Frequency}
                className="foreign-contact-frequency"
                maxlength="100"
                onUpdate={this.updateFrequency}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>
      </div>
    )
  }
}

ForeignContact.defaultProps = {
  Name: {},
  Address: {},
  Title: {},
  Dates: {},
  Frequency: {},
  addressBooks: {},
  dispatch: (action) => {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
