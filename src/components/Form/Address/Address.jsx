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
import { i18n } from '../../../config'
import { AddressValidator } from '../../../validators'
import { AddressSuggestion } from './AddressSuggestion'

export default class Address extends ValidationElement {
  constructor (props) {
    super(props)
    let addressType = this.addressType()

    this.state = {
      value: props.value,
      address: props.address,
      city: props.city,
      state: props.state,
      zipcode: props.zipcode,
      country: props.country,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      addressType: addressType,
      suggestions: props.suggestions,
      errorCodes: [],
      validated: props.validated,
      geocodeErrorCode: props.geocodeErrorCode
    }

    this.suggestionDismissContent = this.suggestionDismissContent.bind(this)
    this.handleAsyncValidation = this.handleAsyncValidation.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.handleAddressTypeChange = this.handleAddressTypeChange.bind(this)
    this.doUpdate = this.doUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentWillUnmount () {
    this.handleAsyncValidation = null
  }

  addressType () {
    let addressType = this.props.addressType
    if (!addressType && this.props.country === 'United States') {
      addressType = this.props.country
    }
    if (!addressType) {
      addressType = 'United States'
    }
    return addressType
  }

  doUpdate () {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        country: this.state.country,
        addressType: this.state.addressType,
        validated: this.state.validated
      })
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (field, event) {
    this.setState({
      [field]: event.target.value,
      validated: false
    }, () => {
      super.handleChange(event)
      this.doUpdate()
    })
  }

  handleAddressTypeChange (event) {
    this.setState({
      addressType: event.target.value,
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      errorCodes: [],
      error: false,
      valid: false
    }, () => {
      this.doUpdate()
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `address.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  handleBlur (event) {
    super.handleBlur(event)

    if (!this.handleAsyncValidation) {
      return
    }

    // Currently USPS does not have the capability to
    // validate internation addresses.
    if (this.state.addressType === 'International') {
      return
    }

    if (!new AddressValidator(this.state, null).isValid()) {
      return
    }

    this.handleAsyncValidation({...this.state}, [])
      .then(result => {
        this.setState({
          suggestions: result.suggestions,
          geocodeErrorCode: result.geocodeErrorCode
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  /**
   * Handles asynchornous validation. Since this component uses a combination of sync/async validation,
   * we create a promise that can handle both scenarios to streamline the flow
   */
  handleAsyncValidation (value, arr) {
    return new Promise((resolve, reject) => {
      // Setup address validator
      const validator = new AddressValidator(value)

      if (arr.length > 0) {
        return resolve({ suggestions: [] })
      }

      // Check if this address has already been verified/validated by user
      if (value.validated) {
        return resolve({ suggestions: [] })
      }

      // No error codes found. Now start to validate location information
      switch (validator.isValid()) {
        case true:
          // Once preliminary address fields are checked, we validate against geocoding api
          validator.geocode().then(handleGeocodeResponse).then(resolve)
          break

        default:
          return resolve({ suggestions: [] })
      }
    })
  }

  render () {
    const klass = `address ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Show when={!this.props.disableToggle}>
          <div>
            <label>{this.props.label}</label>
            <RadioGroup className="address-options" selectedValue={this.state.addressType}>
              <Radio name="addressType"
                     label={i18n.m('address.options.us.label')}
                     value="United States"
                     className="domestic"
                     ignoreDeselect="true"
                     disabled={this.props.disabled}
                     onChange={this.handleAddressTypeChange}
                     onBlur={this.handleBlur}
                     onFocus={this.props.onFocus}
                     />
              <Radio name="addressType"
                     label={i18n.m('address.options.apoFpo.label')}
                     value="APOFPO"
                     className="apofpo"
                     ignoreDeselect="true"
                     disabled={this.props.disabled}
                     onChange={this.handleAddressTypeChange}
                     onBlur={this.handleBlur}
                     onFocus={this.props.onFocus}
                     />
              <Radio name="addressType"
                     label={i18n.m('address.options.international.label')}
                     value="International"
                     className="international"
                     ignoreDeselect="true"
                     disabled={this.props.disabled}
                     onChange={this.handleAddressTypeChange}
                     onBlur={this.handleBlur}
                     onFocus={this.props.onFocus}
                     />
            </RadioGroup>
          </div>
        </Show>
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
              <Show when={this.state.addressType === 'United States'}>
                <div>
                  <Street name="address"
                          className="mailing"
                          label={i18n.t('address.us.street.label')}
                          placeholder={i18n.t('address.us.street.placeholder')}
                          value={this.state.address}
                          onChange={this.handleChange.bind(this, 'address')}
                          onError={this.handleError}
                          onFocus={this.props.onFocus}
                          onBlur={this.handleBlur}
                          />
                  <City name="city"
                        className="city"
                        label={i18n.t('address.us.city.label')}
                        placeholder={i18n.t('address.us.city.placeholder')}
                        value={this.state.city}
                        onChange={this.handleChange.bind(this, 'city')}
                        onError={this.handleError}
                        onFocus={this.props.onFocus}
                        onBlur={this.handleBlur}
                        />
                  <div className="state-zip-wrap">
                    <MilitaryState name="state"
                                   className="state"
                                   label={i18n.t('address.us.state.label')}
                                   placeholder={i18n.t('address.us.state.placeholder')}
                                   value={this.state.state}
                                   includeStates="true"
                                   onChange={this.handleChange.bind(this, 'state')}
                                   onError={this.handleError}
                                   onFocus={this.props.onFocus}
                                   onBlur={this.handleBlur}
                                   />
                    <ZipCode name="zipcode"
                             ref="us_zipcode"
                             key="us_zipcode"
                             className="zipcode"
                             label={i18n.t('address.us.zipcode.label')}
                             placeholder={i18n.t('address.us.zipcode.placeholder')}
                             value={this.state.zipcode}
                             onChange={this.handleChange.bind(this, 'zipcode')}
                             onError={this.handleError}
                             onFocus={this.props.onFocus}
                             onBlur={this.handleBlur}
                             />
                  </div>
                </div>
              </Show>
              <Show when={this.state.addressType === 'International'}>
                <div>
                  <Street name="address"
                          label={i18n.t('address.international.street.label')}
                          placeholder={i18n.t('address.international.street.placeholder')}
                          className="mailing"
                          value={this.state.address}
                          onChange={this.handleChange.bind(this, 'address')}
                          onError={this.handleError}
                          onFocus={this.props.onFocus}
                          onBlur={this.handleBlur}
                          />
                  <City name="city"
                        className="city"
                        label={i18n.t('address.international.city.label')}
                        placeholder={i18n.t('address.international.city.placeholder')}
                        value={this.state.city}
                        onChange={this.handleChange.bind(this, 'city')}
                        onError={this.handleError}
                        onFocus={this.props.onFocus}
                        onBlur={this.handleBlur}
                        />
                  <Country name="country"
                           label={i18n.t('address.international.country.label')}
                           placeholder={i18n.t('address.international.country.placeholder')}
                           value={this.state.country}
                           excludeUnitedStates="true"
                           onChange={this.handleChange.bind(this, 'country')}
                           onError={this.handleError}
                           onFocus={this.props.onFocus}
                           onBlur={this.handleBlur}
                           />
                </div>
              </Show>
              <Show when={this.state.addressType === 'APOFPO'}>
                <div>
                  <Street name="address"
                          label={i18n.t('address.apoFpo.street.label')}
                          placeholder={i18n.t('address.apoFpo.street.placeholder')}
                          className="mailing"
                          value={this.state.address}
                          onChange={this.handleChange.bind(this, 'address')}
                          onError={this.handleError}
                          onFocus={this.props.onFocus}
                          onBlur={this.handleBlur}
                          />
                  <label>{i18n.t('address.apoFpo.select.label')}</label>
                  <RadioGroup className="apofpo" selectedValue={this.state.city}>
                    <Radio name="apoFpoType"
                           label={i18n.t('address.apoFpo.apoFpoType.apo.label')}
                           value="APO"
                           disabled={this.props.disabled}
                           onChange={this.handleChange.bind(this, 'city')}
                           onBlur={this.handleBlur}
                           onFocus={this.props.onFocus}
                           />
                    <Radio name="addressType"
                           label={i18n.t('address.apoFpo.apoFpoType.fpo.label')}
                           value="FPO"
                           disabled={this.props.disabled}
                           onChange={this.handleChange.bind(this, 'city')}
                           onBlur={this.handleBlur}
                           onFocus={this.props.onFocus}
                           />
                  </RadioGroup>
                  <div className="state-zip-wrap">
                    <ApoFpo name="apoFpo"
                            className="state"
                            label={i18n.t('address.apoFpo.apoFpo.label')}
                            placeholder={i18n.t('address.apoFpo.apoFpo.placeholder')}
                            value={this.state.state}
                            onChange={this.handleChange.bind(this, 'state')}
                            onError={this.handleError}
                            onFocus={this.props.onFocus}
                            onBlur={this.handleBlur}
                            tabNext={() => { this.props.tab(this.refs.apo_zipcode.refs.zipcode.refs.text.refs.input) }}
                      />
                      <ZipCode name="zipcode"
                               ref="apo_zipcode"
                               key="apo_zipcode"
                               className="zipcode"
                               label={i18n.t('address.apoFpo.zipcode.label')}
                               placeholder={i18n.t('address.apoFpo.zipcode.placeholder')}
                               value={this.state.zipcode}
                               onChange={this.handleChange.bind(this, 'zipcode')}
                               onError={this.handleError}
                               onFocus={this.props.onFocus}
                               onBlur={this.handleBlur}
                               />
                  </div>
                </div>
              </Show>
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

Address.defaultProps = {
  suggestions: [],
  label: i18n.t('address.label'),
  validate: false,
  geocodeErrorCode: null,
  tab: (input) => { input.focus() },
  addressType: 'United States',
  disableToggle: false,
  onError: (value, arr) => { return arr }
}

Address.errors = []

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
