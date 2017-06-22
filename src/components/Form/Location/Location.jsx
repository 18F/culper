import React from 'react'
import ValidationElement from '../ValidationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import Suggestions from '../Suggestions'
import Show from '../Show'
import Address from './Address'
import { i18n } from '../../../config'
import ToggleableLocation from './ToggleableLocation'
import { LocationValidator } from '../../../validators'
import { AddressSuggestion } from './AddressSuggestion'
import Layouts from './Layouts'

export default class Location extends ValidationElement {

  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateBirthPlace = this.updateBirthPlace.bind(this)
    this.updateToggleableLocation = this.updateToggleableLocation.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.fields = this.fields.bind(this)

    // Instance field to prevent setState calls after unmount
    this.geocodeCancel = false

    this.state = {
      geocodeResult: {}
    }
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        street: this.props.street,
        city: this.props.city,
        zipcode: this.props.zipcode,
        state: this.props.state,
        country: this.props.country,
        layout: this.props.layout,
        validated: false,
        ...updateValues
      })
    }
  }

  handleBlur (event) {
    super.handleBlur(event)

    const v = new LocationValidator(this.props)
    console.log(v.isValid())
    if (!this.props.geocode || this.props.validated || !v.canGeocode()) {
      return
    }
    v.geocode().then(r => {
      if (this.geocodeCancel) {
        return
      }
      this.setState({
        geocodeResult: r
      })
    })
  }

  componentWillUnmount () {
    this.geocodeCancel = true
  }

  updateStreet (event) {
    this.update({street: event.target.value})
  }

  updateCity (event) {
    this.update({city: event.target.value})
  }

  updateState (event) {
    this.update({state: event.target.value})
  }

  updateCountry (event) {
    this.update({country: event.target.value})
  }

  updateZipcode (event) {
    this.update({zipcode: event.target.value})
  }

  updateBirthPlace (birthPlace) {
    this.update({
      street: null,
      city: birthPlace.city,
      state: birthPlace.state,
      county: birthPlace.county,
      country: birthPlace.country
    })
  }

  updateAddress (address) {
    this.update({
      street: address.street,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
      addressType: address.addressType
    })
  }

  updateToggleableLocation (location) {
    this.update({
      city: location.city,
      state: location.state,
      county: location.county,
      country: location.country
    })
  }

  fields (fields) {
    return fields.map(field => {
      switch (field) {
        case 'address':
          return (
            <Address name="address"
              {...this.props}
              onBlur={this.handleBlur}
              onUpdate={this.updateAddress}
              onError={this.props.onError}
            />
          )
        case 'street':
          return (
            <Street name="street"
              key={field}
              className="street"
              label={i18n.t('address.us.street.label')}
              placeholder={i18n.t('address.us.street.placeholder')}
              value={this.props.street}
              onChange={this.updateStreet}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
        case 'city':
          return (
            <City name="city"
              className="city"
              key={field}
              label={i18n.t('address.us.city.label')}
              placeholder={this.props.cityPlaceholder}
              value={this.props.city}
              onChange={this.updateCity}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
        case 'state':
          return (
            <MilitaryState name="state"
              key={field}
              className="state"
              label={i18n.t('address.us.state.label')}
              placeholder={i18n.t('address.us.state.placeholder')}
              value={this.props.state}
              includeStates="true"
              onChange={this.updateState}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
        case 'stateZipcode':
          return (
            <div className="state-zip-wrap">
              <MilitaryState name="state"
                key={`state-${field}`}
                className="state"
                label={i18n.t('address.us.state.label')}
                placeholder={i18n.t('address.us.state.placeholder')}
                value={this.props.state}
                includeStates="true"
                onChange={this.updateState}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.handleBlur}
              />
              <ZipCode name="zipcode"
                key={`zip-${field}`}
                className="zipcode"
                label={i18n.t('address.us.zipcode.label')}
                placeholder={i18n.t('address.us.zipcode.placeholder')}
                value={this.props.zipcode}
                onChange={this.updateZipcode}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.handleBlur}
              />
            </div>
          )
        case 'country':
          return (
            <Country name="country"
              className="country"
              key={field}
              label={i18n.t('address.international.country.label')}
              placeholder={i18n.t('address.international.country.placeholder')}
              value={this.props.country}
              excludeUnitedStates="true"
              onChange={this.updateCountry}
              onError={this.props.onError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
      }
    })
  }

  /**
   * Maps fields to Location constant to determine layout
   */
  fieldMappings () {
    switch (this.props.layout) {
      case Location.BIRTHPLACE:
        return (
          <ToggleableLocation
            {...this.props}
            domesticFields={['state', 'city', 'county']}
            internationalFields={['city', 'country']}
            onBlur={this.handleBlur}
            onUpdate={this.updateToggleableLocation}
          />
        )
      case Location.BIRTHPLACE_WITHOUT_COUNTY:
        return (
          <ToggleableLocation
            {...this.props}
            domesticFields={['state', 'city']}
            internationalFields={['city', 'country']}
            onBlur={this.handleBlur}
            onUpdate={this.updateToggleableLocation}
          />
        )
      case Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY:
        return (
          <ToggleableLocation
            {...this.props}
            domesticFields={['city', 'stateZipcode']}
            internationalFields={['city', 'country']}
            onBlur={this.handleBlur}
            onUpdate={this.updateToggleableLocation}
          />
        )
      case Location.STATE_CITY:
        return this.fields(['state', 'city'])
      case Location.STREET_CITY_COUNTRY:
        return this.fields(['street', 'city', 'country'])
      case Location.CITY_COUNTRY:
        return this.fields(['city', 'country'])
      case null:
      case undefined:
      default:
        console.warn('Location layout not specified. Add one please')
        return null
    }
  }

  render () {
    const klass = `location ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        <div className="fields">
          <Suggestions
            suggestions={this.state.geocodeResult.Suggestions}
            renderSuggestion={this.renderSuggestion}
            dismissSuggestions={false}
            withSuggestions={true}
            show={this.showSuggestions()}
            suggestionTitle={this.suggestionTitle()}
            suggestionLabel={this.suggestionLabel()}
            suggestionParagraph={this.suggestionParagraph()}
            suggestionDismissLabel={i18n.t('suggestions.address.dismiss')}
            suggestionDismissContent={this.suggestionDismissContent()}
            suggestionDismissAlternate={this.dismissAlternative()}
            onDismiss={this.onSuggestionDismiss.bind(this)}
            onSuggestion={this.onSuggestion.bind(this)}
            suggestionUseLabel={i18n.t('suggestions.address.use')}>
            <div>
              {this.fieldMappings()}
            </div>
          </Suggestions>
        </div>
      </div>
    )
  }

  /**
   * Determines what conditions render the address suggestion modal
   */
  showSuggestions () {
    if (this.state.geocodeResult.Error) {
      return true
    }

    const suggestions = this.state.geocodeResult.Suggestions
    if (suggestions && suggestions.length) {
      return true
    }

    return false
  }

  suggestionTitle () {
    return i18n.t(`${this.state.geocodeResult.Error}.title`)
  }

  suggestionLabel () {
    return i18n.t(`${this.state.geocodeResult.Error}.label`)
  }

  suggestionParagraph () {
    return (<p>{i18n.t(`${this.state.geocodeResult.Error}.para`)}</p>)
  }

  dismissAlternative () {
    if (!this.state.geocodeResult.Suggestions || this.state.geocodeResult.Suggestions.length === 0) {
      return i18n.t('suggestions.address.alternate')
    }

    return null
  }

  onSuggestionDismiss () {
    this.update({
      validated: true
    })

    this.setState({
      geocodeResult: {}
    })
  }

  onSuggestion (suggestion) {
    this.update({
      street: suggestion.Address,
      city: suggestion.City,
      state: suggestion.State,
      zipcode: suggestion.Zipcode,
      validated: true
    })
    this.setState({
      geocodeResult: {}
    })
  }

  suggestionDismissContent () {
    const { street, city, state, zipcode } = this.props
    return (
      <div>
        <h5>{i18n.t('error.geocode.original.title')}</h5>
        <div className="address-suggestion">
          <div>{ street }</div>
          <div>{ city }, { state } { zipcode }</div>
        </div>
      </div>
    )
  }

  renderSuggestion (suggestion) {
    return (
      <AddressSuggestion suggestion={suggestion} current={this.props} />
    )
  }
}

Location.BIRTHPLACE = Layouts.BIRTHPLACE
Location.BIRTHPLACE_WITHOUT_COUNTY = Layouts.BIRTHPLACE_WITHOUT_COUNTY
Location.STATE_CITY = Layouts.STATE_CITY
Location.STREET_CITY_COUNTRY = Layouts.STREET_CITY_COUNTRY
Location.CITY_COUNTRY = Layouts.CITY_COUNTRY
Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY = Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY

Location.defaultProps = {
  geocode: false,
  cityLabel: i18n.t('address.us.city.label'),
  cityPlaceholder: i18n.t('address.us.city.placeholder'),
  countyLabel: i18n.t('identification.birthplace.label.county'),
  countyPlaceholder: i18n.t('identification.birthplace.placeholder.county'),
  countryLabel: i18n.t('identification.birthplace.label.country'),
  countryPlaceholder: i18n.t('identification.birthplace.placeholder.country')
}

Location.errors = []
