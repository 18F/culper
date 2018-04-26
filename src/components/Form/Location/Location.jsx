import React from 'react'
import { updateApplication } from '../../../actions/ApplicationActions'
import { i18n, env } from '../../../config'
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
import { countryString } from '../../../validators/location'
import { AddressSuggestion } from './AddressSuggestion'
import Layouts from './Layouts'

export const timeout = (fn, milliseconds = 400, w = window) => {
  if (!w) {
    return
  }

  w.setTimeout(fn, milliseconds)
}

export const country = (obj) => {
  if (obj === null) {
    return null
  }

  if (obj instanceof Object) {
    if ('value' in obj) {
      return obj.value
    }
  }

  return obj
}

export const countryValueResolver = (props) => {
  if (typeof props.country === 'string') {
    let valueArr = props.country ? [props.country] : []
    let comments = props.countryComments || ''
    return {
      value: valueArr,
      comments: comments
    }
  }
  return props.country
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

    // Animations
    this.animationDelay = null
    this.cancelAnimations = this.cancelAnimations.bind(this)
    this.delayAnimations = this.delayAnimations.bind(this)
    this.triggerAnimations = this.triggerAnimations.bind(this)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      geocodeResult: props.geocodeResult,
      spinner: this.props.spinner,
      spinnerState: SpinnerAction.ACTION_SPIN,
      suggestions: this.props.suggestions
    }
  }

  update (queue) {
    const values = {
      uid: this.state.uid,
      street: this.props.street,
      street2: this.props.street2,
      city: this.props.city,
      zipcode: this.props.zipcode,
      state: this.props.state,
      county: this.props.county,
      country: this.props.country,
      countryComments: this.props.countryComments,
      layout: this.props.layout,
      validated: this.props.validated,
      ...queue
    }

    // Send the update back upstream
    this.props.onUpdate(values)

    // If there is an associated address book then push the updates there
    if (this.props.addressBook && values.validated) {
      const updatedBook = this.appendToAddressBook(this.props.addressBooks, this.props.addressBook, values)
      this.props.dispatch(updateApplication('AddressBooks', this.props.addressBook, updatedBook))
    } else {
      const updatedBook = this.removeFromAddressBook(this.props.addressBooks, this.props.addressBook, values)
      this.props.dispatch(updateApplication('AddressBooks', this.props.addressBook, updatedBook))
    }
  }

  removeFromAddressBook (books, name, address) {
    return (books[name] || []).filter(a => a.uid !== address.uid)
  }

  appendToAddressBook (books, name, address) {
    const addressCountry = (address.country || {}).value
    let book = books[name] || []

    // If this is a full address and domestic then it must be validate
    if (address.layout === Layouts.US_ADDRESS && addressCountry === 'United States' && !address.validated) {
      return book
    }

    // Make sure there are **some values** at least
    switch (addressCountry) {
    case 'United States':
    case 'POSTOFFICE':
      if (!address.street || !address.city || !address.state || !address.zipcode) {
        return book
      }
      break

    default:
      if (!address.street || !address.city | !addressCountry) {
        return book
      }
      break
    }

    // Look to see if we can just update it first.
    let updated = false
    for (let i = 0; i < book.length; i++) {
      // If this address matches the same location let us just update it.
      if (book[i].uid === address.uid) {
        updated = true
        book[i] = address
      }
    }

    // If this address matches something that pre-exists somewhere else no need
    // to append to the address book.
    let skip = true
    book = book.filter(a => {
      const country = (a.country || {}).value
      switch (addressCountry) {
      case 'United States':
      case 'POSTOFFICE':
        if (a.street.toLowerCase() === address.street.toLowerCase() &&
            a.city.toLowerCase() === address.city.toLowerCase() &&
            a.state.toLowerCase() === address.state.toLowerCase() &&
            a.zipcode.toLowerCase() === address.zipcode.toLowerCase()) {
          updated = true
          if (skip) {
            skip = false
            return true
          }
          return false
        }
        break

      default:
        if (a.street.toLowerCase() === address.street.toLowerCase() &&
            a.city.toLowerCase() === address.city.toLowerCase() &&
            country.toLowerCase() === addressCountry.toLowerCase()) {
          updated = true
          if (skip) {
            skip = false
            return true
          }
          return false
        }
        break
      }

      return true
    })

    // If not updated the append to the list.
    if (!updated) {
      book.push(address)
    }

    return book
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
  }

  cancelAnimations (w = window) {
    if (this.animationDelay) {
      w.clearTimeout(this.animationDelay)
    }
  }

  delayAnimations (ms, w = window) {
    this.cancelAnimations()
    this.animationDelay = w.setTimeout(this.triggerAnimations, ms)
  }

  triggerAnimations () {
    // If we can't geocode or it is already validated we skip validation.
    const validator = new LocationValidator(this.props)
    if (!this.props.geocode || this.props.validated || !validator.canGeocode()) {
      return
    }

    // If spinner or suggestions are active then we skip validation.
    if (this.state.spinner || this.state.suggestions) {
      return
    }

    this.cancelAnimations()
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

  updateStreet (values) {
    this.update({
      street: values.value,
      validated: this.props.validated && values.value === this.props.street
    })
  }

  updateStreet2 (values) {
    this.update({
      street2: values.value,
      validated: this.props.validated && values.value === this.props.street2
    })
  }

  updateCity (values) {
    this.update({
      city: values.value,
      validated: this.props.validated && values.value === this.props.city
    })
  }

  updateState (values) {
    this.update({
      state: values.value,
      validated: this.props.validated && values.value === this.props.state
    })
  }

  updateCountry (values) {
    this.update({
      country: values,
      countryComments: values.comments,
      validated: this.props.validated && countryString(values) === countryString(this.props.country)
    })
  }

  updateZipcode (values) {
    this.update({
      zipcode: values.value,
      validated: this.props.validated && values.value === this.props.zipcode
    })
  }

  updateAddress (address, delay = null) {
    if (delay !== null) {
      console.log(`delay: ${delay}`)
      if (delay === 0) {
        this.cancelAnimations()
      } else {
        this.delayAnimations(delay)
      }
    }

    this.update({
      validated: false,
      ...address
    })
  }

  updateToggleableLocation (location) {
    this.update({
      city: location.city,
      state: location.state,
      zipcode: location.zipcode,
      county: location.county,
      country: location.country,
      countryComments: location.countryComments,
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
                  disabled={this.props.disabled}
                  onUpdate={this.updateStreet}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.handleBlur}
                  required={this.props.required}
                  />
        )
      case 'street2':
        return (
          <Street name="street2"
                  key={field}
                  className="street2"
                  label={this.props.street2Label}
                  optional={true}
                  value={this.props.street2}
                  disabled={this.props.disabled}
                  onUpdate={this.updateStreet2}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
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
                disabled={this.props.disabled}
                onUpdate={this.updateCity}
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
                         disabled={this.props.disabled}
                         onUpdate={this.updateState}
                         onError={this.handleError}
                         onFocus={this.props.onFocus}
                         onBlur={this.handleBlur}
                         required={this.props.required}
                         />
        )
      case 'stateZipcode':
        return (
          <div className="state-zip-wrap" key={`state-zip-${field}`}>
            <MilitaryState name="state"
                           className="state"
                           label={this.props.stateLabel}
                           placeholder={this.props.statePlaceholder}
                           value={this.props.state}
                           includeStates="true"
                           disabled={this.props.disabled}
                           onUpdate={this.updateState}
                           onError={this.handleError}
                           onFocus={this.props.onFocus}
                           onBlur={this.handleBlur}
                           required={this.props.required}
                           />
            <ZipCode name="zipcode"
                     className="zipcode"
                     label={this.props.zipcodeLabel}
                     placeholder={this.props.zipcodePlaceholder}
                     value={this.props.zipcode}
                     disabled={this.props.disabled}
                     onUpdate={this.updateZipcode}
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
                   {...countryValueResolver(this.props)}
                   className="country"
                   key={field}
                   label={this.props.countryLabel}
                   placeholder={this.props.countryPlaceholder}
                   disabled={this.props.disabled}
                   excludeUnitedStates="true"
                   onUpdate={this.updateCountry}
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
    case Location.US_ADDRESS:
      return (
        <Address
          {...this.props}
          disableToggle={this.props.layout === Location.US_ADDRESS}
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
    case Location.STREET_CITY:
      return this.renderFields(['street', 'city'])
    case Location.COUNTRY:
      return this.renderFields(['country'])
    case null:
    case undefined:
    default:
      if (!env.IsTest()) {
        console.warn('Location layout not specified. Add one please')
      }
      return null
    }
  }

  spinner () {
    if (this.state.spinner) {
      return (
        <Spinner show={this.state.spinner}
                 action={this.state.spinnerAction}
                 label={i18n.t('address.spinner')}
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
          <button className="suggestion-btn" onClick={this.onSuggestionDismiss.bind(this, 'alternate')}>
            <span>{i18n.t('suggestions.address.more')}</span>
            <i className="fa fa-arrow-circle-right"></i>
          </button>
        </span>
      )
    }
    return i18n.m(`${e}.para`)
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

  onSuggestionDismiss (action) {
    this.setState({ spinner: false, suggestions: false, geocodeResult: {} }, () => {
      this.update({
        validated: action === 'dismiss'
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
  name: 'location',
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
