import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, Branch, Show, Country, DateControl, Location, Name, Text, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import TravelItem from './TravelItem'
import { TravelItemValidator } from '../../../../validators'

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
    this.props.onUpdate({
      Country: this.props.Country,
      Issued: this.props.Issued,
      Location: this.props.Location,
      Name: this.props.Name,
      Number: this.props.Number,
      Expiration: this.props.Expiration,
      Used: this.props.Used,
      Countries: this.props.Countries,
      ...queue
    })
  }

  updateCountry (values) {
    this.update({
      Country: values
    })
  }

  updateIssued (values) {
    this.update({
      Issued: values
    })
  }

  updateLocation (values) {
    this.update({
      Location: values
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateNumber (values) {
    this.update({
      Number: values
    })
  }

  updateExpiration (values) {
    this.update({
      Expiration: values
    })
  }

  updateUsed (values) {
    this.update({
      Used: values
    })
  }

  updateCountries (values) {
    this.update({
      Countries: values
    })
  }

  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Dates)
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : ''

    return Summary({
      type: i18n.t('citizenship.multiple.collection.travel.summary.item'),
      index: index,
      left: country,
      right: dates,
      placeholder: i18n.m('citizenship.multiple.collection.travel.summary.unknown')
    })
  }

  render () {
    return (
      <div className="passport-item">
        <Field title={i18n.t('citizenship.multiple.heading.passport.country')}
               scrollIntoView={this.props.scrollIntoView}>
          <Country name="Country"
                   className="passport-country"
                   {...this.props.Country}
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   required={this.props.required}
                   />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.issued')}
               adjustFor="labels"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Issued"
                       {...this.props.Issued}
                       className="passport-issued"
                       onUpdate={this.updateIssued}
                       onError={this.props.onError}
                       required={this.props.required}
                       />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.location')}
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Location"
                    {...this.props.Location}
                    layout={Location.CITY_COUNTRY}
                    className="passport-location"
                    onUpdate={this.updateLocation}
                    onError={this.props.onError}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.name')}
               optional={true}
               filterErrors={Name.requiredErrorsOnly}
               scrollIntoView={this.props.scrollIntoView}>
          <Name name="Name"
                {...this.props.Name}
                className="passport-name"
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.number')}
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Number"
                {...this.props.Number}
                className="passport-number"
                onUpdate={this.updateNumber}
                onError={this.props.onError}
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('citizenship.multiple.heading.passport.expiration')}
               adjustFor="labels"
               shrink={true}
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name="Expiration"
                       {...this.props.Expiration}
                       prefix="passport.expiration"
                       className="passport-expiration"
                       onUpdate={this.updateExpiration}
                       onError={this.props.onError}
                       minDate={(this.props.Issued || {}).date}
                       noMaxDate={true}
                       required={this.props.required}
                       />
        </Field>

        <Branch name="Used"
                label={i18n.t('citizenship.multiple.heading.passport.used')}
                labelSize="h3"
                className="passport-used"
                {...this.props.Used}
                onUpdate={this.updateUsed}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />

        <Show when={this.props.Used.value === 'Yes'}>
          <Accordion {...this.props.Countries}
                     className="foreign-countries"
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateCountries}
                     onError={this.props.onError}
                     summary={this.summary}
                     description={i18n.t('citizenship.multiple.collection.travel.summary.title')}
                     required={this.props.required}
                     validator={TravelItemValidator}
                     scrollIntoView={this.props.scrollIntoView}
                     appendLabel={i18n.t('citizenship.multiple.collection.travel.append')}>
            <TravelItem name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
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
  Used: {},
  Countries: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  defaultState: true
}
