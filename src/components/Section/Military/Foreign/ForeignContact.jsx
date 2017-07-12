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
        <h3>{i18n.t('military.foreign.heading.contact.name')}</h3>
        <Name name="Name"
              className="foreign-contact-name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              />

        <Field title={i18n.t('military.foreign.heading.contact.address')}
               adjustFor="address"
               shrink={true}>
          <Location name="Address"
                    className="foreign-contact-address"
                    {...this.props.Address}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.title')}>
          <Text name="Title"
                {...this.props.Title}
                className="foreign-contact-title"
                maxlength="100"
                onUpdate={this.updateTitle}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.dates')}
               help="military.foreign.help.contact.dates"
               adjustFor="daterange"
               shrink={true}>
          <DateRange name="Dates"
                     className="foreign-contact-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.frequency')}
               help="military.foreign.help.contact.frequency">
          <Text name="Frequency"
                {...this.props.Frequency}
                className="foreign-contact-frequency"
                maxlength="100"
                onUpdate={this.updateFrequency}
                onError={this.props.onError}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
