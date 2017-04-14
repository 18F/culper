import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Branch, Show, Country, DateControl, Address, Name, Text, Accordion } from '../../../Form'
import { dateSummary } from '../../History/summaries'
import { sendUpdate } from './Multiple'
import TravelItem from './TravelItem'

export default class PassportItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Country: props.Country,
      Issued: props.Issued,
      Location: props.Location,
      Name: props.Name,
      Number: props.Number,
      Expiration: props.Expiration,
      Used: props.Used,
      Countries: props.Countries
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateIssued = this.updateIssued.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateNumber = this.updateNumber.bind(this)
    this.updateExpiration = this.updateExpiration.bind(this)
    this.updateUsed = this.updateUsed.bind(this)
    this.updateCountries = this.updateCountries.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateCountry (values) {
    this.onUpdate('Country', values)
  }

  updateIssued (values) {
    this.onUpdate('Issued', values)
  }

  updateLocation (values) {
    this.onUpdate('Location', values)
  }

  updateName (values) {
    this.onUpdate('Name', values)
  }

  updateNumber (values) {
    this.onUpdate('Number', values)
  }

  updateExpiration (values) {
    this.onUpdate('Expiration', values)
  }

  updateUsed (values) {
    this.onUpdate('Used', values)
  }

  updateCountries (values) {
    this.onUpdate('Countries', values)
  }

  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : i18n.t('citizenship.multiple.collection.travel.summary.unknown')
    const dates = dateSummary(itemProperties)

    return (
      <span>
        <span className="index">{i18n.t('citizenship.multiple.collection.travel.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="passport-item">
        <Field title={i18n.t('citizenship.multiple.heading.passport.country')}
               help="citizenship.multiple.help.passport.country">
          <Country name="Country"
                   {...this.state.Country}
                   onUpdate={this.updateCountry}
                   onValidate={this.props.onValidate}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.issued')}
               help="citizenship.multiple.help.passport.issued"
               shrink={true}>
          <DateControl name="Issued"
                       {...this.state.Issued}
                       onUpdate={this.updateIssued}
                       onValidate={this.props.onValidate}
                       />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.location')}
               help="citizenship.multiple.help.passport.location">
          <Address name="Location"
                   {...this.state.Location}
                   onUpdate={this.updateLocation}
                   onValidate={this.props.onValidate}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.name')}>
          <Name name="Name"
                {...this.state.Name}
                onUpdate={this.updateName}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.number')}
               help="citizenship.multiple.help.passport.number">
          <Text name="Number"
                {...this.state.Number}
                onUpdate={this.updateNumber}
                onValidate={this.props.onValidate}
                />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.expiration')}
               help="citizenship.multiple.help.passport.expiration"
               shrink={true}>
          <DateControl name="Expiration"
                       {...this.state.Expiration}
                       onUpdate={this.updateExpiration}
                       onValidate={this.props.onValidate}
                       />
        </Field>

        <Branch name="Used"
                label={i18n.t('citizenship.multiple.heading.passport.used')}
                labelSize="h3"
                className="used"
                value={this.state.Used}
                help="citizenship.multiple.help.passport.used"
                onUpdate={this.updateUsed}
                onValidate={this.handleValidation}
                />

        <Show when={this.state.Used === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.Countries}
                     onUpdate={this.updateCountries}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('citizenship.multiple.collection.travel.summary.title')}
                     appendLabel={i18n.t('citizenship.multiple.collection.travel.append')}>
            <TravelItem name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

PassportItem.defaultProps = {
  Country: {},
  Issued: {},
  Location: {},
  Name: {},
  Number: {},
  Expiration: {},
  Used: '',
  Countries: []
}
