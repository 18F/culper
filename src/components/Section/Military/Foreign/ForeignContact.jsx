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
              onValidate={this.props.onValidate}
              />

        <Field title={i18n.t('military.foreign.heading.contact.address')}
               help="military.foreign.help.contact.address"
               adjustFor="big-buttons"
               shrink={true}>
          <Address name="Address"
                   className="foreign-contact-address"
                   {...this.state.Address}
                   onUpdate={this.updateAddress}
                   onValidate={this.props.onValidate}
                   />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.title')}
               help="military.foreign.help.contact.title">
          <Text name="Title"
                {...this.state.Title}
                className="foreign-contact-title"
                maxlength="100"
                onUpdate={this.updateTitle}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.dates')}
               help="military.foreign.help.contact.dates"
               adjustFor="labels"
               shrink={true}>
          <DateRange name="Dates"
                     className="foreign-contact-dates"
                     {...this.state.Dates}
                     onUpdate={this.updateDates}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.contact.frequency')}
               help="military.foreign.help.contact.frequency">
          <Text name="Frequency"
                {...this.state.Frequency}
                className="foreign-contact-frequency"
                maxlength="100"
                onUpdate={this.updateFrequency}
                onValidate={this.props.onValidate}
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
  Frequency: {}
}
