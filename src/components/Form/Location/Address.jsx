import React from 'react'

import i18n from 'util/i18n'
import LocationValidator, { countryString } from 'validators/location'
import { countryValueResolver } from 'helpers/location'

import ValidationElement from '../ValidationElement'
import Street from '../Street'
import State from '../State'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import ApoFpo from '../ApoFpo'
import Show from '../Show'
import Suggestions from '../Suggestions'
import { AddressSuggestion } from './AddressSuggestion'

export default class Address extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      showAddressBook: false,
    }

    this.blurred = {
      street: true,
      street2: true,
      city: true,
      state: true,
      country: true,
      zipcode: true,
    }

    this.apo_zipcode = null

    this.errors = []

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateAddressType = this.updateAddressType.bind(this)
    this.addressType = this.addressType.bind(this)
    this.openAddressBook = this.openAddressBook.bind(this)
    this.closeAddressBook = this.closeAddressBook.bind(this)
    this.renderAddressBookItem = this.renderAddressBookItem.bind(this)
    this.selectAddressBookItem = this.selectAddressBookItem.bind(this)
    this.handleError = this.handleError.bind(this)
    this.storeErrors = this.storeErrors.bind(this)
    this.focusField = this.focusField.bind(this)
    this.blurField = this.blurField.bind(this)
    this.onAddressUpdate = this.onAddressUpdate.bind(this)
    this.blurForceUpdate = this.blurForceUpdate.bind(this)
  }

  onAddressUpdate(nextValue) {
    const { name, value } = nextValue

    this.update({
      [name]: value,
    })
  }

  updateCountry(values) {
    this.update({
      country: values,
      countryComments: values.comments,
    })
  }

  updateAddressType(values) {
    // Set existing errors to null when toggling fields
    this.props.onError(
      values.value,
      this.errors.map(err => ({
        code: err.code,
        valid: null,
        uid: err.uid,
      }))
    )

    const country = { value: '' }

    // POSTOFFICE is used for APO, FPO and DPO
    if (values.value === 'United States' || values.value === 'POSTOFFICE') {
      country.value = values.value
      this.blurred = {
        street: true,
        street2: true,
        city: true,
        state: true,
        country: true,
        zipcode: true,
      }
    }

    this.update({
      country,
      city: '',
      state: '',
    })
  }

  update(values, delay = null, blur = false) {
    // Get the next values
    const next = {
      street: this.props.street,
      street2: this.props.street2,
      city: this.props.city,
      state: this.props.state,
      country: this.props.country,
      zipcode: this.props.zipcode,
      validated: this.props.validated,
      ...values,
    }

    // Determine if previous values were the same
    const same = next.street === this.props.street
      && next.street2 === this.props.street2
      && next.city === this.props.city
      && next.state === this.props.state
      && countryString(next.country) === countryString(this.props.country)
      && next.zipcode === this.props.zipcode

    // If it is not the same then we need to force validation
    next.validated = same && this.props.validated

    // Update the properties
    if (!same || blur) {
      if (!next.country && this.addressType() === 'United States') {
        next.country = { value: 'United States' }
      }

      this.props.onUpdate(next, delay)
    }
  }

  blurForceUpdate() {
    const blurry = Object.values(this.blurred).every(value => !!value)
    const modal = document.querySelector('.modal')

    if (blurry && !modal && !this.props.validated) {
      this.update({}, 500, true)
    }
  }

  blurField(event) {
    const field = event.target.name

    this.props.onBlur(event)
    this.blurred[field] = true
    this.blurForceUpdate()
  }

  focusField(event) {
    const field = event.target.name

    this.props.onFocus(event)
    this.blurred[field] = false
    this.update({}, 0, true)
  }

  addressType() {
    // If address is not applicable ("I don't know"), return ""
    if (!this.props.isEnabled) {
      return ''
    }

    let { country } = this.props

    if (typeof country === 'object') {
      country = countryString(country)
      if (country === '') return 'International'
      if (country === null) return 'United States'
    }

    if (['United States', 'POSTOFFICE'].includes(country)) return country
    if (country === '') return 'United States'

    return 'International'
  }

  openAddressBook() {
    this.setState({ showAddressBook: true })
  }

  closeAddressBook(cb = () => {}) {
    this.setState({ showAddressBook: false }, cb)
  }

  renderAddressBookItem = suggestion => (
    <AddressSuggestion suggestion={suggestion} current={suggestion} />
  )

  selectAddressBookItem(suggestion) {
    this.closeAddressBook(() => {
      this.update({
        street: suggestion.street,
        street2: suggestion.street2,
        city: suggestion.city,
        state: suggestion.state,
        zipcode: suggestion.zipcode,
        county: suggestion.county,
        country: suggestion.country,
        validated: true,
      })
    })
  }

  handleError(value, arr) {
    // eslint-disable-next-line no-param-reassign
    arr = arr.map(err => ({
      code: `address.${err.code}`,
      valid: err.valid,
      uid: err.uid,
    }))

    const requiredErr = arr.concat(
      this.constructor.errors.map(err => ({
        code: `address.${err.code}`,
        valid: err.func(value, { ...this.props }),
        uid: this.state.uid,
      }))
    )

    this.storeErrors(requiredErr)
    this.props.onError(value, requiredErr)
    return arr
  }

  storeErrors(errors) {
    const newErrors = [...errors]

    for (let i = 0; i < newErrors.length; i += 1) {
      const e = newErrors[i]
      const idx = this.errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        this.errors[idx] = { ...e }
      } else {
        this.errors.push({ ...e })
      }
    }
  }

  render() {
    const book = this.props.addressBooks[this.props.addressBook] || []
    const locationValidator = new LocationValidator(this.props)
    const instateZipcode = locationValidator.validZipcodeState()

    return (
      <div className="address">
        <Show when={!this.props.disableToggle}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>{this.props.label}</label>
          <RadioGroup
            className={`address-options option-list ${
              this.props.showPostOffice ? '' : 'no-postoffice'
            }`.trim()}
            disabled={this.props.disabled}
            selectedValue={this.addressType()}
          >
            <Radio
              name="addressType"
              label={i18n.m('address.options.us.label')}
              value="United States"
              className="domestic"
              ignoreDeselect={true}
              disabled={this.props.disabled}
              onUpdate={this.updateAddressType}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
            />
            {this.props.showPostOffice && (
              <Radio
                name="addressType"
                label={i18n.m('address.options.apoFpo.label')}
                value="POSTOFFICE"
                className="apofpo postoffice"
                ignoreDeselect={true}
                disabled={this.props.disabled}
                onUpdate={this.updateAddressType}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
              />
            )}
            <Radio
              name="addressType"
              label={i18n.m('address.options.international.label')}
              value="International"
              className="international"
              ignoreDeselect={true}
              disabled={this.props.disabled}
              onUpdate={this.updateAddressType}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
            />
          </RadioGroup>
        </Show>

        <Show when={this.props.addressBook && book.length}>
          <div className="reuse-address">
            <button
              type="button"
              className="reuse-address-open-modal"
              title={i18n.t('address.addressBook.reuse')}
              onClick={this.openAddressBook}
            >
              <i className="fa fa-address-book-o" aria-hidden="true" />
              <span>{i18n.t('address.addressBook.reuse')}</span>
            </button>
            <Suggestions
              show={this.state.showAddressBook}
              suggestions={book}
              renderSuggestion={this.renderAddressBookItem}
              suggestionTitle={i18n.t('suggestions.addressBook.title')}
              suggestionParagraph={i18n.m('suggestions.addressBook.para')}
              suggestionLabel={i18n.t('suggestions.addressBook.label')}
              suggestionUseLabel={i18n.t('suggestions.addressBook.use')}
              suggestionDismissLabel={i18n.t('suggestions.addressBook.dismiss')}
              onSuggestion={this.selectAddressBookItem}
              onDismiss={this.closeAddressBook}
            />
          </div>
        </Show>

        <div className="fields">
          <Show when={this.addressType() === 'United States'}>
            <div>
              <div className="usa-form-control">
                <Street
                  name="street"
                  className="mailing street required"
                  label={this.props.streetLabel}
                  placeholder={this.props.streetPlaceholder}
                  value={this.props.street}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                  isPoBoxAllowed={this.props.isPoBoxAllowed}
                />
              </div>
              <div className="usa-form-control">
                <Street
                  name="street2"
                  className="street2"
                  label={this.props.street2Label}
                  optional={true}
                  value={this.props.street2}
                  disabled={this.props.disabled}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  isPoBoxAllowed={this.props.isPoBoxAllowed}
                />
              </div>
              <div className="usa-form-control">
                <City
                  name="city"
                  className="city required"
                  label={this.props.cityLabel}
                  value={this.props.city}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                />
              </div>
              <div className="state-zip-wrap">
                <State
                  name="state"
                  className="state required"
                  label={this.props.stateLabel}
                  value={this.props.state}
                  includeStates="true"
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                />
                <ZipCode
                  name="zipcode"
                  key="us_zipcode"
                  className="zipcode required"
                  label={this.props.zipcodeLabel}
                  value={this.props.zipcode}
                  status={instateZipcode}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                />
              </div>
            </div>
          </Show>
          <Show when={this.addressType() === 'International'}>
            <div className="usa-form-control">
              <Street
                name="street"
                label={this.props.streetLabel}
                placeholder={this.props.streetPlaceholder}
                className="mailing street required"
                value={this.props.street}
                onUpdate={this.onAddressUpdate}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                required={this.props.required}
                disabled={this.props.disabled}
                isPoBoxAllowed={this.props.isPoBoxAllowed}
              />
            </div>
            <div className="usa-form-control">
              <Street
                name="street2"
                className="street2"
                label={this.props.street2Label}
                optional={true}
                value={this.props.street2}
                onUpdate={this.onAddressUpdate}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                disabled={this.props.disabled}
                isPoBoxAllowed={this.props.isPoBoxAllowed}
              />
            </div>
            <div className="usa-form-control">
              <City
                name="city"
                className="city required"
                label={this.props.cityLabel}
                value={this.props.city}
                onUpdate={this.onAddressUpdate}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                required={this.props.required}
                disabled={this.props.disabled}
              />
            </div>
            <div className="usa-form-control">
              <Country
                name="country"
                className="required"
                label={this.props.countryLabel}
                {...countryValueResolver(this.props)}
                excludeUnitedStates="true"
                onUpdate={this.updateCountry}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                required={this.props.required}
                disabled={this.props.disabled}
              />
            </div>
          </Show>
          <Show when={this.addressType() === 'POSTOFFICE'}>
            <div>
              <div className="usa-form-control">
                <Street
                  name="street"
                  label={i18n.t('address.apoFpo.street.label')}
                  placeholder={this.props.postOfficeStreetPlaceholder}
                  className="mailing street required"
                  value={this.props.street}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                  isPoBoxAllowed={this.props.isPoBoxAllowed}
                />
              </div>
              <div className="usa-form-control">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>{i18n.t('address.apoFpo.select.label')}</label>
                <RadioGroup
                  className="apofpo option-list"
                  selectedValue={this.props.city}
                  disabled={this.props.disabled}
                  required={this.props.required}
                  onError={this.handleError}
                >
                  <Radio
                    name="city"
                    className="apo"
                    label={i18n.m('address.apoFpo.apoFpoType.apo.label')}
                    value="APO"
                    disabled={this.props.disabled}
                    onUpdate={this.onAddressUpdate}
                    onBlur={this.blurField}
                    onFocus={this.focusField}
                  />
                  <Radio
                    name="city"
                    className="fpo"
                    label={i18n.m('address.apoFpo.apoFpoType.fpo.label')}
                    value="FPO"
                    disabled={this.props.disabled}
                    onUpdate={this.onAddressUpdate}
                    onBlur={this.blurField}
                    onFocus={this.focusField}
                  />
                  <Radio
                    name="city"
                    className="dpo"
                    label={i18n.m('address.apoFpo.apoFpoType.dpo.label')}
                    value="DPO"
                    disabled={this.props.disabled}
                    onUpdate={this.onAddressUpdate}
                    onBlur={this.blurField}
                    onFocus={this.focusField}
                  />
                </RadioGroup>
              </div>
              <div className="state-zip-wrap">
                <ApoFpo
                  name="state"
                  className="state required"
                  label={this.props.postOfficeStateLabel}
                  value={this.props.state}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                  tabNext={() => {
                    this.props.tab(
                      this.apo_zipcode.refs.zipcode.refs.text.refs.input
                    )
                  }}
                />
                <ZipCode
                  name="zipcode"
                  ref={(el) => { this.apo_zipcode = el }}
                  key="apo_zipcode"
                  className="zipcode required"
                  label={this.props.postOfficeZipcodeLabel}
                  value={this.props.zipcode}
                  status={instateZipcode}
                  onUpdate={this.onAddressUpdate}
                  onError={this.handleError}
                  onFocus={this.focusField}
                  onBlur={this.blurField}
                  required={this.props.required}
                  disabled={this.props.disabled}
                />
              </div>
            </div>
          </Show>
        </div>
      </div>
    )
  }
}

Address.defaultProps = {
  label: i18n.t('address.label'),
  tab: (input) => {
    input.focus()
  },
  country: { value: 'United States' },
  onBlur: () => {},
  onFocus: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  showPostOffice: false,
  isEnabled: true,
  streetLabel: i18n.t('address.us.street.label'),
  postOfficeStateLabel: i18n.t('address.apoFpo.apoFpo.label'),
  postOfficeZipcodeLabel: i18n.t('address.apoFpo.zipcode.label'),
  street2Label: i18n.t('address.us.street2.label'),
  addressBooks: {},
  addressBook: '',
  isPoBoxAllowed: true,
}

Address.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        const country = countryString(props.country)
        switch (country) {
          case 'United States':
          case 'POSTOFFICE':
            return (
              !!props.street && !!props.city && !!props.state && !!props.zipcode
            )
          default:
            return !!props.street && !!props.city && !!country
        }
      }
      return true
    },
  },
]
