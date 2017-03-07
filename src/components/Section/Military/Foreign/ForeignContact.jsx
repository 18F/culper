import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Name, Address, DateRange, Text, Help, HelpIcon } from '../../../Form'

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

export default class ForeignContact extends ValidationElement {
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
        <div className="eapp-field-wrap">
          <Name name="Name"
                className="foreign-contact-name"
                {...this.state.Name}
                onUpdate={this.updateName}
                onValidate={this.props.onValidate}
                />
        </div>

        <h3>{i18n.t('military.foreign.heading.contact.address')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.foreign.help.contact.address">
            <Address name="Address"
                     className="foreign-contact-address"
                     {...this.state.Address}
                     onUpdate={this.updateAddress}
                     onValidate={this.props.onValidate}
                     />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.contact.title')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.foreign.help.contact.title">
            <Text name="Title"
                  {...this.state.Title}
                  className="foreign-contact-title"
                  maxlength="100"
                  onUpdate={this.updateTitle}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.contact.dates')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.foreign.help.contact.dates">
            <DateRange name="Dates"
                       className="foreign-contact-dates"
                       {...this.state.Dates}
                       onUpdate={this.updateDates}
                       onValidate={this.props.onValidate}
                       />
            <HelpIcon />
          </Help>
        </div>

        <h3>{i18n.t('military.foreign.heading.contact.frequency')}</h3>
        <div className="eapp-field-wrap">
          <Help id="military.foreign.help.contact.frequency">
            <Text name="Frequency"
                  {...this.state.Frequency}
                  className="foreign-contact-frequency"
                  maxlength="100"
                  onUpdate={this.updateFrequency}
                  onValidate={this.props.onValidate}
                  />
            <HelpIcon />
          </Help>
        </div>
      </div>
    )
  }
}
