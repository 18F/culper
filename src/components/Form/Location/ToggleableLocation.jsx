import React from 'react'
import ValidationElement from '../ValidationElement'
import Street from '../Street'
import Branch from '../Branch'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import County from '../County'
import ZipCode from '../ZipCode'
import Show from '../Show'
import { i18n } from '../../../config'

export default class ToggleableLocation extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCounty = this.updateCounty.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateToggle = this.updateToggle.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)

    this.state = {
      suggestions: []
    }
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        address: this.props.address,
        city: this.props.city,
        zipcode: this.props.zipcode,
        state: this.props.state,
        country: this.props.country,
        domestic: this.props.domestic,
        domesticFields: this.props.domesticFields,
        internationalFields: this.props.internationalFields,
        ...updateValues
      })
    }
  }

  updateStreet (event) {
    this.update({ address: event.target.value })
  }

  updateCity (event) {
    this.update({ city: event.target.value })
  }

  updateState (event) {
    this.update({state: event.target.value})
  }

  updateCountry (event) {
    this.update({country: event.target.value})
  }

  updateCounty (event) {
    this.update({county: event.target.value})
  }

  updateZipcode (event) {
    this.update({zipcode: event.target.value})
  }

  updateToggle (value) {
    switch (value) {
      case 'Yes':
        this.update({country: 'United States'})
        break
      case 'No':
        this.update({country: ''})
        break
    }
  }

  render () {
    const domesticFields = this.props.domesticFields.map(field => {
      const key = `domestic-${field}`
      switch (field) {
        case 'street':
          return (
            <Street name="street"
              className="mailing"
              key={key}
              placeholder={this.props.streetPlaceholder}
              value={this.props.street}
              onChange={this.updateStreet}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          )
        case 'city':
          return (
            <City name="city"
              className="city"
              key={key}
              label={i18n.t('address.us.city.label')}
              placeholder={this.props.cityPlaceholder}
              value={this.props.city}
              onChange={this.updateCity}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          )
        case 'county':
          return (
            <County name="county"
              key={key}
              label={this.props.countyLabel}
              value={this.props.county}
              className="county"
              placeholder={this.props.countyPlaceholder}
              maxlength="255"
              onChange={this.updateCounty}
              onError={this.props.onError}
              onBlur={this.props.onBlur}
            />
          )
        case 'state':
          return (
            <MilitaryState name="state"
              key={key}
              className="state"
              label={i18n.t('address.us.state.label')}
              placeholder={i18n.t('address.us.state.placeholder')}
              value={this.props.state}
              includeStates="true"
              onChange={this.updateState}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          )
        case 'stateZipcode':
          return (
            <div className="state-zip-wrap">
              <MilitaryState name="state"
                className="state"
                label={i18n.t('address.us.state.label')}
                placeholder={i18n.t('address.us.state.placeholder')}
                value={this.props.state}
                includeStates="true"
                onChange={this.updateState}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
              />
              <ZipCode name="zipcode"
                key="us_zipcode"
                className="zipcode"
                label={i18n.t('address.us.zipcode.label')}
                placeholder={i18n.t('address.us.zipcode.placeholder')}
                value={this.props.zipcode}
                onChange={this.updateZipcode}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
              />
            </div>
          )
      }
    })

    const internationalFields = this.props.internationalFields.map(field => {
      const key = `domestic-${field}`
      switch (field) {
        case 'city':
          return (
            <City name="city"
              key={key}
              label={i18n.t('address.us.city.label')}
              placeholder={this.props.cityPlaceholder}
              value={this.props.city}
              onChange={this.updateCity}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          )
        case 'country':
          return (
            <Country name="country"
              key={key}
              label={this.props.countryLabel}
              value={this.props.country}
              className="country"
              placeholder={this.props.countryPlaceholder}
              excludeUnitedStates="true"
              disabled={this.props.disabledCountry}
              onChange={this.updateCountry}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          )
      }
    })

    return (
      <div className="toggleable-location">
        <Branch name="birthplace_type"
          help={this.props.help}
          value={branchValue(this.props.country)}
          label={this.props.label}
          onUpdate={this.updateToggle}
          onBlur={this.props.onBlur}
          onError={this.props.onError}>
        </Branch>

        <Show when={this.props.country === 'United States'}>
          {domesticFields}
        </Show>
        <Show when={this.props.country !== 'United States' && this.props.country !== null}>
          {internationalFields}
        </Show>
      </div>
    )
  }
}

const branchValue = (country) => {
  switch (country) {
    // Neutral state
    case null:
      return ''
    case 'United States':
      return 'Yes'
    // For all other cases, country is an empty string (user intends to select country) or
    // user has selected a country
    default:
      return 'No'
  }
}

ToggleableLocation.defaultProps = {
  country: null,
  domesticFields: [],
  internationalFields: []
}
