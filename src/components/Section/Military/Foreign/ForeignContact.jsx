import React from 'react'
import { i18n } from '../../../../config'
import { Name, Address, DateRange, Text, Field } from '../../../Form'

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
    if (this.props.onUpdate) {
      let obj = {
        Name: this.props.Name,
        Address: this.props.Address,
        Title: this.props.Title,
        Dates: this.props.Dates,
        Frequency: this.props.Frequency
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateName (value) {
    this.update([
      { name: 'Name', value: value }
    ])
  }

  updateAddress (value) {
    this.update([
      { name: 'Address', value: value }
    ])
  }

  updateTitle (value) {
    this.update([
      { name: 'Title', value: value }
    ])
  }

  updateDates (value) {
    this.update([
      { name: 'Dates', value: value }
    ])
  }

  updateFrequency (value) {
    this.update([
      { name: 'Frequency', value: value }
    ])
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
          <Address name="Address"
                   className="foreign-contact-address"
                   {...this.props.Address}
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
  onError: (value, arr) => { return arr }
}
