import React from 'react'
import { i18n } from '../../../../config'
import { Name, Address, DateRange, Text, Field } from '../../../Form'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class ForeignContact extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      Address: props.Address,
      Title: props.Title,
      Dates: props.Dates,
      Frequency: props.Frequency
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateName (value) {
    this.onUpdate('Name', value)
  }

  updateAddress (value) {
    this.onUpdate('Address', value)
  }

  updateTitle (value) {
    this.onUpdate('Title', value)
  }

  updateDates (value) {
    this.onUpdate('Dates', value)
  }

  updateFrequency (value) {
    this.onUpdate('Frequency', value)
  }

  render () {
    return (
      <div className="foreign-contact">
        <h3>{i18n.t('military.foreign.heading.contact.name')}</h3>
        <Name name="Name"
              className="foreign-contact-name"
              {...this.state.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              />

        <Field title={i18n.t('military.foreign.heading.contact.address')}
               adjustFor="address"
               shrink={true}>
          <Address name="Address"
                   className="foreign-contact-address"
                   {...this.state.Address}
                   onUpdate={this.updateAddress}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.title')}>
          <Text name="Title"
                {...this.state.Title}
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
                     {...this.state.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.frequency')}
               help="military.foreign.help.contact.frequency">
          <Text name="Frequency"
                {...this.state.Frequency}
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
