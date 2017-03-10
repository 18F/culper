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
import { Help } from '../Help'
import { api } from '../../../services/api'
import { i18n } from '../../../config'
import { AddressValidator } from '../../../validators'

const throttle = (callback, wait, context = this) => {
  let timeout = null
  let callbackArgs = null

  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }

  return function () {
    callbackArgs = arguments
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }
}

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
      apoFpo: props.apoFpo,
      country: props.country,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      addressType: addressType,
      apoFpoType: props.apoFpoType,
      suggestions: [],
      errorCodes: []
    }

    this.suggestionDismissContent = this.suggestionDismissContent.bind(this)
    this.handleValidation = throttle(this.handleValidation.bind(this), 300, this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
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

  /**
   * Handle the change event.
   */
  handleChange (field, event) {
    this.setState({
      [field]: event.target.value
    }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          country: this.state.country,
          addressType: this.state.addressType,
          apoFpo: this.state.apoFpo,
          apoFpoType: this.state.apoFpoType
        })
      }
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }
    console.log('do address validation')
    this.handleAsyncValidation(event, status, error)
      .then(result => {
        if (result.geocodeError && result.error) {
          this.props.addError(result.error)
        }
        this.setState({
          error: result.complexStatus === false,
          valid: result.complexStatus === true,
          errorCodes: result.codes,
          suggestions: result.suggestions
        },
          () => {
            if (!result.geocodeError) {
              super.handleValidation(event, status, error)
            }
          })
      })
  }

  handleAsyncValidation (event, status, error) {
    return new Promise((resolve, reject) => {
      // Setup address validator
      const validator = new AddressValidator(this.state)

      // Retrieve codes
      const codes = super.mergeError(this.state.errorCodes || [], error)
      if (codes.length > 0) {
        return resolve({complexStatus: false, codes: codes, suggestions: []})
      }

      // No error codes found. Now start to validate location information
      switch (validator.isValid()) {
        case true:
          this.props.removeErrorFunc(errors => {
            return errors.filter(e => {
              return e.indexOf('geocode') === -1
            })
          })

          // Once preliminary address fields are checked, we validate against geocoding api
          validator
            .geocode()
            .then(handleGeocodeResponse)
            .then(resolve)
          break
        default:
          resolve({complexStatus: false, codes: [], suggestions: []})
      }
    })
  }

  usAddress () {
    return (
      <div>
        <Street name="address"
                className="mailing"
                label={i18n.t('address.us.street.label')}
                placeholder={i18n.t('address.us.street.placeholder')}
                value={this.state.address}
                onChange={this.handleChange.bind(this, 'address')}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        <City name="city"
              className="city"
              label={i18n.t('address.us.city.label')}
              placeholder={i18n.t('address.us.city.placeholder')}
              value={this.state.city}
              onChange={this.handleChange.bind(this, 'city')}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <div className="state-zip-wrap">
          <MilitaryState name="state"
                         className="state"
                         label={i18n.t('address.us.state.label')}
                         placeholder={i18n.t('address.us.state.placeholder')}
                         value={this.state.state}
                         includeStates="true"
                         onChange={this.handleChange.bind(this, 'state')}
                         onValidate={this.handleValidation}
                         onFocus={this.props.onFocus}
                         onBlur={this.props.onBlur}
                         />
          <ZipCode name="zipcode"
                   className="zipcode"
                   label={i18n.t('address.us.zipcode.label')}
                   placeholder={i18n.t('address.us.zipcode.placeholder')}
                   value={this.state.zipcode}
                   onChange={this.handleChange.bind(this, 'zipcode')}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
        </div>
      </div>
    )
  }

  internationalAddress () {
    return (
      <div>
        <Street name="address"
                label={i18n.t('address.international.street.label')}
                placeholder={i18n.t('address.international.street.placeholder')}
                className="mailing"
                value={this.state.address}
                onChange={this.handleChange.bind(this, 'address')}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        <City name="city"
              className="city"
              label={i18n.t('address.international.city.label')}
              placeholder={i18n.t('address.international.city.placeholder')}
              value={this.state.city}
              onChange={this.handleChange.bind(this, 'city')}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <Country name="country"
                 label={i18n.t('address.international.country.label')}
                 placeholder={i18n.t('address.international.country.placeholder')}
                 value={this.state.country}
                 excludeUnitedStates="true"
                 onChange={this.handleChange.bind(this, 'country')}
                 onValidate={this.handleValidation}
                 onFocus={this.props.onFocus}
                 onBlur={this.props.onBlur}
                 />
      </div>
    )
  }

  apoFpoAddress () {
    return (
      <div>
        <Street name="address"
                label={i18n.t('address.apoFpo.street.label')}
                placeholder={i18n.t('address.apoFpo.street.placeholder')}
                className="mailing"
                value={this.state.address}
                onChange={this.handleChange.bind(this, 'address')}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        <label>{i18n.t('address.apoFpo.select.label')}</label>
        <RadioGroup className="apofpo" selectedValue={this.state.apoFpoType}>
          <Radio name="apoFpoType"
                 label={i18n.t('address.apoFpo.apoFpoType.apo.label')}
                 value="APO"
                 disabled={this.props.disabled}
                 onChange={this.handleChange.bind(this, 'apoFpoType')}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 />
          <Radio name="addressType"
                 label={i18n.t('address.apoFpo.apoFpoType.fpo.label')}
                 value="FPO"
                 disabled={this.props.disabled}
                 onChange={this.handleChange.bind(this, 'apoFpoType')}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 />
        </RadioGroup>
        <div className="state-zip-wrap">
          <ApoFpo name="apoFpo"
                  className="state"
                  label={i18n.t('address.apoFpo.apoFpo.label')}
                  placeholder={i18n.t('address.apoFpo.zipcode.placeholder')}
                  value={this.state.apoFpo}
                  onChange={this.handleChange.bind(this, 'apoFpo')}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
          <ZipCode name="zipcode"
                   className="zipcode"
                   label={i18n.t('address.apoFpo.zipcode.label')}
                   placeholder={i18n.t('address.apoFpo.zipcode.placeholder')}
                   value={this.state.zipcode}
                   onChange={this.handleChange.bind(this, 'zipcode')}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
        </div>
      </div>
    )
  }

  render () {
    const klass = `address ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <label className="bold">{this.props.label}</label>
        <RadioGroup className="address-options" selectedValue={this.state.addressType}>
          <Radio name="addressType"
                 label={i18n.m('address.options.us.label')}
                 value="United States"
                 className="domestic"
                 ignoreDeselect="true"
                 disabled={this.props.disabled}
                 onChange={this.handleChange.bind(this, 'addressType')}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 />
          <Radio name="addressType"
                 label={i18n.m('address.options.apoFpo.label')}
                 value="APOFPO"
                 className="apofpo"
                 ignoreDeselect="true"
                 disabled={this.props.disabled}
                 onChange={this.handleChange.bind(this, 'addressType')}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 />
          <Radio name="addressType"
                 label={i18n.m('address.options.international.label')}
                 value="International"
                 className="international"
                 ignoreDeselect="true"
                 disabled={this.props.disabled}
                 onChange={this.handleChange.bind(this, 'addressType')}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 />
        </RadioGroup>
        <div className="fields">
            <Suggestions
              onValidate={this.handleValidation}
              suggestions={this.state.suggestions}
              renderSuggestion={this.renderSuggestion}
              dismissSuggestions={false}
              withSuggestions={true}
              suggestionTitle={'Alternate address found'}
              suggestionLabel={'Suggested address'}
              suggestionParagraph={'Consider the highlighted change below. Using the US Postal Service suggested address will help us process your case more quickly'}
              suggestionDismissLabel={'Use this address instead'}
              suggestionDismissContent={this.suggestionDismissContent()}
              onDismiss={this.onSuggestionDismiss.bind(this)}
              onSuggestion={this.onSuggestion.bind(this)}
              suggestionUseLabel={'Use this address'}>
              <div>
                {this.state.addressType === 'United States' && this.usAddress()}
                {this.state.addressType === 'International' && this.internationalAddress()}
                {this.state.addressType === 'APOFPO' && this.apoFpoAddress()}
              </div>
            </Suggestions>
        </div>
      </div>
    )
  }

  onSuggestionDismiss () {
    this.setState({
      suggestions: []
    })
  }

  onSuggestion (suggestion) {
    this.setState({
      suggestions: [],
      address: suggestion.Address,
      city: suggestion.City,
      state: suggestion.State,
      zipcode: suggestion.Zipcode
    })
  }

  suggestionDismissContent () {
    const { address, city, state, zipcode } = this.state
    return (
      <div>
        <h5>Original Address</h5>
        <div className="address-suggestion">
          <div>{ address }</div>
          <div>{ city }, { state} { zipcode }</div>
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

export function HighlightedField (props) {
  if (props.new.toUpperCase() !== props.old.toUpperCase()) {
    return (
      <span className="highlight">{ props.new }</span>
    )
  }
  return (<span>{ props.old }</span>)
}

export function AddressSuggestion (props) {
  const suggestion = props.suggestion
  return (
    <div className="address-suggestion">
      <div>
        <HighlightedField new={ suggestion.Address } old={props.current.address} />
      </div>
      <div>
        <HighlightedField new={ suggestion.City } old={props.current.city} />, <HighlightedField new={ suggestion.State } old={props.current.state} /> <HighlightedField new={ suggestion.Zipcode } old={props.current.zipcode} />
      </div>
    </div>
  )
}

/**
 * Helper function to extract geocoded information
 */
export const handleGeocodeResponse = (response) => {
  if (!response.Errors) {
    return {complexStatus: true, suggestions: [], codes: []}
  }
  if (response.Errors && response.Errors.length) {
    for (const err of response.Errors) {
      if (err.Fieldname === 'Address') {
        if (!err.Suggestions || !err.Suggestions.length) {
          return {
            complexStatus: false,
            suggestions: [],
            error: err.Error,
            geocodeError: true
          }
        }
        return {
          geocodeError: true,
          error: '',
          complexStatus: false,
          suggestions: err.Suggestions || []
        }
      }
    }
  }
}
