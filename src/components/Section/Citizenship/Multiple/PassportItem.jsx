import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Branch, Show, Country, DateControl, Location, Name, Text, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import { sendUpdate } from './Multiple'
import TravelItem from './TravelItem'

export default class PassportItem extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateIssued = this.updateIssued.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateNumber = this.updateNumber.bind(this)
    this.updateExpiration = this.updateExpiration.bind(this)
    this.updateUsed = this.updateUsed.bind(this)
    this.updateCountries = this.updateCountries.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Country: this.props.Country,
        Issued: this.props.Issued,
        Location: this.props.Location,
        Name: this.props.Name,
        Number: this.props.Number,
        Expiration: this.props.Expiration,
        Used: this.props.Used,
        Countries: this.props.Countries
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateCountry (values) {
    this.update([
      { name: 'Country', value: values }
    ])
  }

  updateIssued (values) {
    this.update([
      { name: 'Issued', value: values }
    ])
  }

  updateLocation (values) {
    this.update([
      { name: 'Location', value: values }
    ])
  }

  updateName (values) {
    this.update([
      { name: 'Name', value: values }
    ])
  }

  updateNumber (values) {
    this.update([
      { name: 'Number', value: values }
    ])
  }

  updateExpiration (values) {
    this.update([
      { name: 'Expiration', value: values }
    ])
  }

  updateUsed (values) {
    this.update([
      { name: 'Used', value: values }
    ])
  }

  updateCountries (values) {
    this.update([
      { name: 'Countries', value: values.items }
    ])
  }

  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : i18n.t('citizenship.multiple.collection.travel.summary.unknown')
    const dates = DateSummary(itemProperties.Dates)

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
        <Field title={i18n.t('citizenship.multiple.heading.passport.country')}>
          <Country name="Country"
                   className="passport-country"
                   {...this.props.Country}
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.issued')}
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Issued"
                       {...this.props.Issued}
                       className="passport-issued"
                       onUpdate={this.updateIssued}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.location')}
          adjustFor="labels">
          <Location name="Location"
                   layout={Location.CITY_COUNTRY}
                   {...this.props.Location}
                   className="passport-location"
                   onUpdate={this.updateLocation}
                   onError={this.props.onError}
                   />
        </Field>

        <h3>{i18n.t('citizenship.multiple.heading.passport.name')}</h3>
        <Name name="Name"
              {...this.props.Name}
              className="passport-name"
              onUpdate={this.updateName}
              onError={this.props.onError}
              />

        <Field title={i18n.t('citizenship.multiple.heading.passport.number')}>
          <Text name="Number"
                {...this.props.Number}
                className="passport-number"
                onUpdate={this.updateNumber}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.expiration')}
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Expiration"
                       {...this.props.Expiration}
                       className="passport-expiration"
                       onUpdate={this.updateExpiration}
                       onError={this.props.onError}
                       />
        </Field>

        <Branch name="Used"
                label={i18n.t('citizenship.multiple.heading.passport.used')}
                labelSize="h3"
                className="passport-used"
                value={this.props.Used}
                onUpdate={this.updateUsed}
                onError={this.props.onError}
                />

        <Show when={this.props.Used === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.Countries}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateCountries}
                     onError={this.props.onError}
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
  Countries: [],
  onError: (value, arr) => { return arr },
  defaultState: true
}
