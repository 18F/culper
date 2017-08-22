import React from 'react'
import { updateApplication } from '../../../actions/ApplicationActions'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import Spinner, { SpinnerAction } from '../Spinner'
import Suggestions from '../Suggestions'
import Address from './Address'
import ToggleableLocation from './ToggleableLocation'
import { LocationValidator } from '../../../validators'
import { AddressSuggestion } from './AddressSuggestion'
import Layouts from './Layouts'

export const timeout = (fn, milliseconds = 400, w = window) => {
  if (!w) {
    return
  }

  w.setTimeout(fn, milliseconds)
}

export default class Location extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateStreet2 = this.updateStreet2.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateToggleableLocation = this.updateToggleableLocation.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.onSuggestion = this.onSuggestion.bind(this)
    this.onSuggestionDismiss = this.onSuggestionDismiss.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.renderFields = this.renderFields.bind(this)
    this.handleError = this.handleError.bind(this)

    // Instance field to prevent setState calls after unmount
    this.geocodeCancel = false

    this.state = {
      geocodeResult: props.geocodeResult,
      spinner: this.props.spinner,
      spinnerState: SpinnerAction.ACTION_SPIN,
      suggestions: this.props.suggestions
    }
  }

  update (queue) {
    const values = {
      street: this.props.street,
      street2: this.props.street2,
      city: this.props.city,
      zipcode: this.props.zipcode,
      state: this.props.state,
      county: this.props.county,
      country: this.props.country,
      layout: this.props.layout,
      validated: this.props.validated,
      ...queue
    }

    // Send the update back upstream
    this.props.onUpdate(values)

    // If there is an associated address book then push the updates there
    if (this.props.addressBook && values.validated) {
      const updatedBook = [
        ...(this.props.addressBooks[this.props.addressBook] || []),
        values
      ]
      this.props.dispatch(updateApplication('AddressBooks', this.props.addressBook, updatedBook))
    }
  }

  animateCloseWithSuggestions () {
    timeout(() => {
      // There were errors/suggestions so show them
      this.setState({
        spinner: false,
        spinnerAction: SpinnerAction.Spin,
        suggestions: true
      })
    }, 1000)
  }

  animateCloseTimeout () {
    timeout(() => {
      this.setState({
        spinner: true,
        spinnerAction: SpinnerAction.Shrink
      })

      // Reset back for next usage
      timeout(() => {
        this.setState({
          spinner: false,
          spinnerAction: SpinnerAction.Spin,
          suggestions: true
        })
      })
    })
  }

  animateCloseValid () {
    timeout(() => {
      this.setState({
        spinner: true,
        spinnerAction: SpinnerAction.Shrink
      })

      timeout(() => {
        // Grow the green arrow
        this.setState({
          spinner: true,
          spinnerAction: SpinnerAction.Grow
        })

        // Reset back for next usage
        timeout(() => {
          this.setState({
            spinner: false,
            spinnerAction: SpinnerAction.Spin,
            suggestions: false
          }, () => {
            this.update({ validated: true })
          })
        }, 1000)
      })
    }, 1000)
  }

  handleBlur (event) {
    super.handleBlur(event)

    // If we can't geocode or it is already validated we skip validation.
    const validator = new LocationValidator(this.props)
    if (!this.props.geocode || this.props.validated || !validator.canGeocode()) {
      return
    }

    // If spinner or suggestions are active then we skip validation.
    if (this.state.spinner || this.state.suggestions) {
      return
    }

    this.setState({ spinner: true, suggestions: false }, () => {
      validator
        .geocode()
        .then(r => {
          if (this.geocodeCancel) {
            return
          }

          this.setState({ geocodeResult: r })
        })
        .then(() => {
          // Trigger the spinner to complete final animations
          if (this.showSuggestions()) {
            // There were errors/suggestions so show them
            this.animateCloseWithSuggestions()
          } else {
            this.animateCloseValid()
          }
        })
        .catch(() => {
          this.animateCloseTimeout()
        })
    })
  }

  componentWillUnmount () {
    this.geocodeCancel = true
  }

  updateStreet (event) {
    this.update({
      street: event.target.value,
      validated: false
    })
  }

  updateStreet2 (event) {
    this.update({
      street2: event.target.value,
      validated: false
    })
  }

  updateCity (event) {
    this.update({
      city: event.target.value,
      validated: false
    })
  }

  updateState (event) {
    this.update({
      state: event.target.value,
      validated: false
    })
  }

  updateCountry (event) {
    this.update({
      country: event.target.value,
      validated: false
    })
  }

  updateZipcode (event) {
    this.update({
      zipcode: event.target.value,
      validated: false
    })
  }

  updateAddress (address) {
    this.update({
      street: address.street,
      street2: address.street2,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
      addressType: address.addressType,
      validated: false
    })
  }

  updateToggleableLocation (location) {
    this.update({
      city: location.city,
      state: location.state,
      zipcode: location.zipcode,
      county: location.county,
      country: location.country,
      validated: false
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `location.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    }) || []

    this.props.onError(value, arr)
    return arr
  }

  renderFields (fields) {
    return fields.map(field => {
      switch (field) {
        case 'street':
          return (
          <Street name="street"
                  key={field}
                  className="street"
                  label={this.props.streetLabel}
                  placeholder={this.props.streetPlaceholder}
                  value={this.props.street}
                  onChange={this.updateStreet}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.handleBlur}
                  required={this.props.required}
                  />
          )
        case 'street2':
          return (
            <Street name="street2"
                    className="street2"
                    label={this.props.street2Label}
                    optional={true}
                    value={this.props.street2}
                    onChange={this.updateStreet2}
                    onError={this.handleError}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    required={this.props.required}
                    />
          )
        case 'city':
          return (
          <City name="city"
                className="city"
                key={field}
                label={this.props.cityLabel}
                placeholder={this.props.cityPlaceholder}
                value={this.props.city}
                onChange={this.updateCity}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.handleBlur}
                required={this.props.required}
                />
          )
        case 'state':
          return (
          <MilitaryState name="state"
                         key={field}
                         className="state"
                         label={this.props.stateLabel}
                         placeholder={this.props.statePlaceholder}
                         value={this.props.state}
                         includeStates="true"
                         onChange={this.updateState}
                         onError={this.handleError}
                         onFocus={this.props.onFocus}
                         onBlur={this.handleBlur}
                         required={this.props.required}
                         />
          )
        case 'stateZipcode':
          return (
          <div className="state-zip-wrap">
            <MilitaryState name="state"
                           key={`state-${field}`}
                           className="state"
                           label={this.props.stateLabel}
                           placeholder={this.props.statePlaceholder}
                           value={this.props.state}
                           includeStates="true"
                           onChange={this.updateState}
                           onError={this.handleError}
                           onFocus={this.props.onFocus}
                           onBlur={this.handleBlur}
                           required={this.props.required}
                           />
            <ZipCode name="zipcode"
                     key={`zip-${field}`}
                     className="zipcode"
                     label={this.props.zipcodeLabel}
                     placeholder={this.props.zipcodePlaceholder}
                     value={this.props.zipcode}
                     onChange={this.updateZipcode}
                     onError={this.handleError}
                     onFocus={this.props.onFocus}
                     onBlur={this.handleBlur}
                     required={this.props.required}
                     />
          </div>
          )
        case 'country':
          return (
          <Country name="country"
                   className="country"
                   key={field}
                   label={this.props.countryLabel}
                   placeholder={this.props.countryPlaceholder}
                   value={this.props.country}
                   excludeUnitedStates="true"
                   onChange={this.updateCountry}
                   onError={this.handleError}
                   onFocus={this.props.onFocus}
                   onBlur={this.handleBlur}
                   required={this.props.required}
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
          domesticFields={['city', 'state', 'county']}
          internationalFields={['city', 'country']}
          onBlur={this.handleBlur}
          onUpdate={this.updateToggleableLocation}
          onError={this.handleError}
          required={this.props.required}
          />
        )
      case Location.US_CITY_STATE_INTERNATIONAL_CITY_COUNTRY:
      case Location.BIRTHPLACE_WITHOUT_COUNTY:
        return (
        <ToggleableLocation
          {...this.props}
          domesticFields={['city', 'state']}
          internationalFields={['city', 'country']}
          onBlur={this.handleBlur}
          onUpdate={this.updateToggleableLocation}
          onError={this.handleError}
          required={this.props.required}
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
          onError={this.handleError}
          required={this.props.required}
          />
        )
      case Location.ADDRESS:
        return (
        <Address
          {...this.props}
          onBlur={this.handleBlur}
          onUpdate={this.updateAddress}
          onError={this.handleError}
          required={this.props.required}
          />
        )
      case Location.CITY_STATE:
        return this.renderFields(['city', 'state'])
      case Location.STREET_CITY_COUNTRY:
        return this.renderFields(['street', 'city', 'country'])
      case Location.CITY_COUNTRY:
        return this.renderFields(['city', 'country'])
      case Location.CITY_STATE_COUNTRY:
        return this.renderFields(['city', 'state', 'country'])
      case Location.US_ADDRESS:
        return this.renderFields(['street', 'street2', 'city', 'stateZipcode'])
      case Location.STREET_CITY:
        return this.renderFields(['street', 'city'])
      case Location.COUNTRY:
        return this.renderFields(['country'])
      case null:
      case undefined:
      default:
        console.warn('Location layout not specified. Add one please')
        return null
    }
  }

  spinner () {
    if (this.state.spinner) {
      return (
        <Spinner show={this.state.spinner}
                 action={this.state.spinnerAction}
                 label={i18n.t('address.spinner')}
                 onUpdate={this.updateSpinner}
                 />
      )
    }

    return null
  }

  suggestions () {
    const show = this.state.suggestions && this.showSuggestions()
    const suggestions = this.state.geocodeResult.Suggestions || []
    return (
      <Suggestions show={show}
                   suggestions={suggestions}
                   renderSuggestion={this.renderSuggestion}
                   suggestionTitle={this.suggestionTitle()}
                   suggestionLabel={this.suggestionLabel()}
                   suggestionParagraph={this.suggestionParagraph()}
                   suggestionDismissLabel={i18n.t('suggestions.address.dismiss')}
                   suggestionDismissContent={this.suggestionDismissContent()}
                   suggestionDismissAlternate={this.dismissAlternative()}
                   suggestionUseLabel={i18n.t('suggestions.address.use')}
                   onSuggestion={this.onSuggestion}
                   onDismiss={this.onSuggestionDismiss}
                   />
    )
  }

  render () {
    const klass = `location ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        <div className="fields">
          {this.spinner()}
          {this.suggestions()}
          {this.fieldMappings()}
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
    const e = this.state.geocodeResult.Error
    if (e === 'error.geocode.defaultAddress') {
      return (
        <span>
          <p>{i18n.t(`${e}.para`)}</p>
          <button className="suggestion-btn" onClick={this.onSuggestionDismiss.bind(this)}>
            <span>{i18n.t('suggestions.address.more')}</span>
            <i className="fa fa-arrow-circle-right"></i>
          </button>
        </span>
      )
    }
    return (<p>{i18n.t(`${e}.para`)}</p>)
  }

  dismissAlternative () {
    const e = this.state.geocodeResult.Error
    if (e === 'error.geocode.defaultAddress') {
      return null
    }

    if (!this.state.geocodeResult.Suggestions || this.state.geocodeResult.Suggestions.length === 0) {
      return i18n.t('suggestions.address.alternate')
    }

    return null
  }

  onSuggestionDismiss () {
    this.setState({ spinner: false, suggestions: false, geocodeResult: {} }, () => {
      this.update({
        validated: true
      })
    })
  }

  onSuggestion (suggestion) {
    this.setState({ spinner: false, suggestions: false, geocodeResult: {} }, () => {
      this.update({
        street: suggestion.Street,
        street2: suggestion.Street2,
        city: suggestion.City,
        state: suggestion.State,
        zipcode: suggestion.Zipcode,
        validated: true
      })
    })
  }

  suggestionDismissContent () {
    const { street, street2, city, state, zipcode } = this.props
    return (
      <div>
        <h5>{i18n.t('error.geocode.original.title')}</h5>
        <div className="address-suggestion">
          <div>{ street }</div>
          <div>{ street2 }</div>
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

// Define all possible layouts for location fields
Location.BIRTHPLACE = Layouts.BIRTHPLACE
Location.COUNTRY = Layouts.COUNTRY
Location.US_CITY_STATE_INTERNATIONAL_CITY_COUNTRY = Layouts.US_CITY_STATE_INTERNATIONAL_CITY_COUNTRY
Location.BIRTHPLACE_WITHOUT_COUNTY = Layouts.BIRTHPLACE_WITHOUT_COUNTY
Location.CITY_STATE = Layouts.CITY_STATE
Location.STREET_CITY_COUNTRY = Layouts.STREET_CITY_COUNTRY
Location.CITY_COUNTRY = Layouts.CITY_COUNTRY
Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY = Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
Location.ADDRESS = Layouts.ADDRESS
Location.CITY_STATE_COUNTRY = Layouts.CITY_STATE_COUNTRY
Location.US_ADDRESS = Layouts.US_ADDRESS
Location.STREET_CITY = Layouts.STREET_CITY

Location.defaultProps = {
  layout: Layouts.ADDRESS,
  validated: false,
  geocode: false,
  geocodeResult: {},
  spinner: false,
  suggestions: false,
  streetLabel: i18n.t('address.us.street.label'),
  streetPlaceholder: i18n.t('address.us.street.placeholder'),
  street2Label: i18n.t('address.us.street2.label'),
  stateLabel: i18n.t('address.us.state.label'),
  statePlaceholder: i18n.t('address.us.state.placeholder'),
  cityLabel: i18n.t('address.us.city.label'),
  cityPlaceholder: i18n.t('address.us.city.placeholder'),
  zipcodePlaceholder: i18n.t('address.us.zipcode.placeholder'),
  zipcodeLabel: i18n.t('address.us.zipcode.label'),
  countyLabel: i18n.t('address.us.county.label'),
  countyPlaceholder: i18n.t('address.us.county.placeholder'),
  countryLabel: i18n.t('address.international.country.label'),
  countryPlaceholder: i18n.t('address.international.country.placeholder'),
  required: false,
  addressBooks: {},
  addressBook: '',
  onUpdate: (queue) => {},
  dispatch: (action) => {},
  onError: (value, arr) => { return arr }
}

Location.errors = []
