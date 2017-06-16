import React from 'react'
import ValidationElement from '../ValidationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import ApoFpo from '../ApoFpo'
import Suggestions from '../Suggestions'
import Show from '../Show'
import Text from '../Text'
import Address from './Address'
import { i18n } from '../../../config'
//import { AddressValidator } from '../../../validators'
//import { AddressSuggestion } from './AddressSuggestion'

export default class Location extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateFullAddress = this.updateFullAddress.bind(this)
    this.state = {
      suggestions: []
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
        ...updateValues
      })
    }
  }

  updateStreet (event) {
    this.update({ street: event.target.value })
  }

  updateCity (city) {
    this.update({ city: city.value })
  }

  updateState (event) {
    this.update({state: event.target.value})
  }

  updateFullAddress (address) {
    console.log(address)
    this.update({
      address: address.address,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
      addressType: address.addressType
    })
  }

  render () {
    const klass = `address ${this.props.className || ''}`.trim()
    const fields = this.props.fields.map(field => {
      switch (field) {
        case 'fullAddress':
          return (
            <Address name="fulladdress"
              {...this.props}
              onUpdate={this.updateFullAddress}
              onError={this.props.onError}
            />
          )
        case 'street':
          return (
            <Street name="address"
              key={field}
              className="mailing"
              label={i18n.t('address.us.street.label')}
              placeholder={i18n.t('address.us.street.placeholder')}
              value={this.props.street}
              onUpdate={this.updateStreet}
              onError={this.handleError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
        case 'city':
          return (
            <City name="city"
              key={field}
              className="city"
              label={i18n.t('address.us.city.label')}
              placeholder={i18n.t('address.us.city.placeholder')}
              value={this.props.city}
              onUpdate={this.updateCity}
              onError={this.handleError}
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
              onError={this.handleError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
        case 'country':
          return (
            <Country name="country"
              key={field}
              label={i18n.t('address.international.country.label')}
              placeholder={i18n.t('address.international.country.placeholder')}
              value={this.props.country}
              excludeUnitedStates="true"
              onChange={this.handleChange.bind(this, 'country')}
              onError={this.handleError}
              onFocus={this.props.onFocus}
              onBlur={this.handleBlur}
            />
          )
      }
    })
    return (
      <div className={klass}>
        <div className="fields">
          <Suggestions
            suggestions={this.state.suggestions}
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
              {fields}
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
    if (this.state.geocodeErrorCode) {
      return true
    }

    if (this.state.suggestions && this.state.suggestions.length) {
      return true
    }

    return false
  }

  suggestionTitle () {
    return i18n.t(`${this.state.geocodeErrorCode}.title`)
  }

  suggestionLabel () {
    return i18n.t(`${this.state.geocodeErrorCode}.label`)
  }

  suggestionParagraph () {
    return (<p>{i18n.t(`${this.state.geocodeErrorCode}.para`)}</p>)
  }

  dismissAlternative () {
    if (!this.state.suggestions || this.state.suggestions.length === 0) {
      return i18n.t('suggestions.address.alternate')
    }

    return null
  }

  onSuggestionDismiss () {
    this.setState({
      suggestions: [],
      geocodeErrorCode: null,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      validated: true
    }, () => {
      this.doUpdate()
    })
  }

  onSuggestion (suggestion) {
    this.setState({
      suggestions: [],
      geocodeErrorCode: null,
      address: suggestion.Address,
      city: suggestion.City,
      state: suggestion.State,
      zipcode: suggestion.Zipcode,
      validated: true
    }, () => {
      this.doUpdate()
    })
  }

  suggestionDismissContent () {
    const { address, city, state, zipcode } = this.state
    return (
      <div>
        <h5>{i18n.t('error.geocode.original.title')}</h5>
        <div className="address-suggestion">
          <div>{ address }</div>
          <div>{ city }, { state } { zipcode }</div>
        </div>
      </div>
    )
  }

  renderSuggestion (suggestion) {
    return (
      <AddressSuggestion suggestion={suggestion} current={this.state} />
    )
  }
}

Location.defaultProps = {
  fields: []
}

Location.errors = []

/**
 * Helper function to extract geocoded information
 */
export const handleGeocodeResponse = (response) => {
  if (response.Errors && response.Errors.length) {
    // Return the first response recieved (FIFO)
    for (const err of response.Errors) {
      if (err.Fieldname === 'Address') {
        if (!err.Suggestions || !err.Suggestions.length) {
          return {
            suggestions: [],
            geocodeErrorCode: err.Error,
            geocodeError: true
          }
        }

        return {
          geocodeError: true,
          geocodeErrorCode: err.Error,
          suggestions: err.Suggestions || []
        }
      }
    }
  }

  return { suggestions: [] }
}

/**
 * Used to prevent duplicate geocoding requests to be made. Since we perform various checks on the client-side
 * that trigger our components to re-render, we set a throttle so that the geocoding validation logic
 * executes once.
 */
export const throttle = (callback, wait, context = this) => {
  let timeout = null
  let callbackArgs = null

  const later = () => {
    timeout = null
    return callback.apply(context, callbackArgs)
  }

  return function () {
    callbackArgs = arguments
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }
}
