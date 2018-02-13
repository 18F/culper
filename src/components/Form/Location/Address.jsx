import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import ApoFpo from '../ApoFpo'
import Show from '../Show'
import Suggestions from '../Suggestions'
import { AddressSuggestion } from './AddressSuggestion'
import { countryString } from '../../../validators/location'
import { countryValueResolver } from './Location'

export default class Address extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      showAddressBook: false
    }

    this.update = this.update.bind(this)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateStreet2 = this.updateStreet2.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.updateAddressType = this.updateAddressType.bind(this)
    this.addressTypeFunc = this.addressTypeFunc.bind(this)
    this.openAddressBook = this.openAddressBook.bind(this)
    this.closeAddressBook = this.closeAddressBook.bind(this)
    this.renderAddressBookItem = this.renderAddressBookItem.bind(this)
    this.selectAddressBookItem = this.selectAddressBookItem.bind(this)
    this.handleError = this.handleError.bind(this)
    this.storeErrors = this.storeErrors.bind(this)
    this.errors = []
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

  updateZipcode (values) {
    this.update({
      zipcode: values.value,
      validated: this.props.validated && values.value === this.props.zipcode
    })
  }

  updateCountry (values) {
    this.update({
      country: values,
      countryComments: values.comments,
      validated: this.props.validated && countryString(values) === countryString(this.props.country)
    })
  }

  updateAddressType (values) {
    // Set existing errors to null when toggling fields
    this.props.onError(values.value, this.errors.map(err => {
      return {
        code: err.code,
        valid: null,
        uid: err.uid
      }
    }))

    let country = { value: '' }
    let city = this.props.city

    // POSTOFFICE is used for APO, FPO and DPO
    switch (values.value) {
      case 'United States':
      case 'POSTOFFICE':
        country.value = values.value
        break
    }

    // Clear the city when moving *from* APO/FPO and *to* something else.
    if (values.value !== 'POSTOFFICE' && countryString(this.props.country) === 'POSTOFFICE') {
      city = ''
    }

    this.update({
      country: country,
      city: city,
      state: ''
    })
  }

  update (updateValues) {
    this.props.onUpdate({
      street: this.props.street,
      street2: this.props.street2,
      city: this.props.city,
      state: this.props.state,
      country: this.props.country,
      zipcode: this.props.zipcode,
      validated: this.props.validated,
      ...updateValues
    })
  }

  addressTypeFunc (props) {
    const country = countryString(this.props.country)
    switch (true) {
      case props.value === country:
        return true
      case props.value === 'International' && !['United States', 'POSTOFFICE'].includes(country):
        return true
      default:
        return false
    }
  }

  openAddressBook () {
    this.setState({ showAddressBook: true })
  }

  closeAddressBook () {
    this.setState({ showAddressBook: false })
  }

  renderAddressBookItem (suggestion) {
    return (
      <AddressSuggestion suggestion={suggestion} current={suggestion} />
    )
  }

  selectAddressBookItem (suggestion) {
    this.setState({ showAddressBook: false }, () => {
      this.update({
        street: suggestion.street,
        street2: suggestion.street2,
        city: suggestion.city,
        state: suggestion.state,
        zipcode: suggestion.zipcode,
        county: suggestion.county,
        country: suggestion.country,
        validated: true
      })
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `address.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    const requiredErr = arr.concat(this.constructor.errors.map(err => {
      return {
        code: `address.${err.code}`,
        valid: err.func(value, {...this.props}),
        uid: this.state.uid
      }
    }))

    this.storeErrors(requiredErr)
    this.props.onError(value, requiredErr)
    return arr
  }

  storeErrors (errors) {
    let newErrors = [...errors]
    for (const e of newErrors) {
      const idx = this.errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        this.errors[idx] = { ...e }
      } else {
        this.errors.push({ ...e })
      }
    }
  }

  render () {
    const book = this.props.addressBooks[this.props.addressBook] || []
    const country = countryString(this.props.country)
    return (
      <div className="address">
        <Show when={!this.props.disableToggle}>
          <div>
            <label>{this.props.label}</label>
            <RadioGroup className={`address-options option-list ${this.props.showPostOffice ? '' : 'no-postoffice'}`.trim()}
                        disabled={this.props.disabled}
                        selectedValueFunc={this.addressTypeFunc}>
              <Radio name="addressType"
                     label={i18n.m('address.options.us.label')}
                     value="United States"
                     className="domestic"
                     ignoreDeselect="true"
                     disabled={this.props.disabled}
                     onUpdate={this.updateAddressType}
                     onBlur={this.props.onBlur}
                     onFocus={this.props.onFocus}
                     />
              <Show when={this.props.showPostOffice}>
                <Radio name="addressType"
                       label={i18n.m('address.options.apoFpo.label')}
                       value="POSTOFFICE"
                       className="apofpo postoffice"
                       ignoreDeselect="true"
                       disabled={this.props.disabled}
                       onUpdate={this.updateAddressType}
                       onBlur={this.props.onBlur}
                       onFocus={this.props.onFocus}
                       />
              </Show>
              <Show when={!this.props.showPostOffice}>
                <div className="apofpo postoffice block"></div>
              </Show>
              <Radio name="addressType"
                     label={i18n.m('address.options.international.label')}
                     value="International"
                     className="international"
                     ignoreDeselect="true"
                     disabled={this.props.disabled}
                     onUpdate={this.updateAddressType}
                     onBlur={this.props.onBlur}
                     onFocus={this.props.onFocus}
                     />
            </RadioGroup>
          </div>
        </Show>

        <Show when={this.props.addressBook && book.length}>
          <div className="reuse-address">
            <button className="reuse-address-open-modal" title={i18n.t('address.addressBook.reuse')} onClick={this.openAddressBook}>
              <i className="fa fa-address-book-o" aria-hidden="true" />
              <span>{i18n.t('address.addressBook.reuse')}</span>
            </button>
            <Suggestions show={this.state.showAddressBook}
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
          <div>
            <Show when={country === 'United States'}>
              <div>
                <Street name="address"
                        className="mailing street required"
                        label={this.props.streetLabel}
                        placeholder={this.props.streetPlaceholder}
                        value={this.props.street}
                        onUpdate={this.updateStreet}
                        onError={this.handleError}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        />
                <Street name="street2"
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
                <City name="city"
                      className="city required"
                      label={this.props.cityLabel}
                      value={this.props.city}
                      onUpdate={this.updateCity}
                      onError={this.handleError}
                      onFocus={this.props.onFocus}
                      onBlur={this.props.onBlur}
                      required={this.props.required}
                      disabled={this.props.disabled}
                      />
                <div className="state-zip-wrap">
                  <MilitaryState name="state"
                                 className="state required"
                                 label={this.props.stateLabel}
                                 value={this.props.state}
                                 includeStates="true"
                                 onUpdate={this.updateState}
                                 onError={this.handleError}
                                 onFocus={this.props.onFocus}
                                 onBlur={this.props.onBlur}
                                 required={this.props.required}
                                 disabled={this.props.disabled}
                                 />
                  <ZipCode name="zipcode"
                           ref="us_zipcode"
                           key="us_zipcode"
                           className="zipcode required"
                           label={this.props.zipcodeLabel}
                           value={this.props.zipcode}
                           onUpdate={this.updateZipcode}
                           onError={this.handleError}
                           onFocus={this.props.onFocus}
                           onBlur={this.props.onBlur}
                           required={this.props.required}
                           disabled={this.props.disabled}
                           />
                </div>
              </div>
            </Show>
            <Show when={!['United States', 'POSTOFFICE'].includes(country)}>
              <div>
                <Street name="address"
                        label={this.props.streetLabel}
                        placeholder={this.props.streetPlaceholder}
                        className="mailing street required"
                        value={this.props.street}
                        onUpdate={this.updateStreet}
                        onError={this.handleError}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        />
                <Street name="street2"
                        className="street2"
                        label={this.props.street2Label}
                        optional={true}
                        value={this.props.street2}
                        onUpdate={this.updateStreet2}
                        onError={this.handleError}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        disabled={this.props.disabled}
                        />
                <City name="city"
                      className="city required"
                      label={this.props.cityLabel}
                      value={this.props.city}
                      onUpdate={this.updateCity}
                      onError={this.handleError}
                      onFocus={this.props.onFocus}
                      onBlur={this.props.onBlur}
                      required={this.props.required}
                      disabled={this.props.disabled}
                      />
                <Country name="country"
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
            <Show when={country === 'POSTOFFICE'}>
              <div>
                <Street name="address"
                        label={i18n.t('address.apoFpo.street.label')}
                        placeholder={this.props.postOfficeStreetPlaceholder}
                        className="mailing street required"
                        value={this.props.street}
                        onUpdate={this.updateStreet}
                        onError={this.handleError}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        />
                <label>{i18n.t('address.apoFpo.select.label')}</label>
                <RadioGroup className="apofpo" selectedValue={this.props.city} disabled={this.props.disabled} required={this.props.required} onError={this.handleError}>
                  <Radio name="apoFpoType"
                         className="apo"
                         label={i18n.m('address.apoFpo.apoFpoType.apo.label')}
                         value="APO"
                         disabled={this.props.disabled}
                         onUpdate={this.updateCity}
                         onBlur={this.props.onBlur}
                         onFocus={this.props.onFocus}
                         />
                  <Radio name="addressType"
                         className="fpo"
                         label={i18n.m('address.apoFpo.apoFpoType.fpo.label')}
                         value="FPO"
                         disabled={this.props.disabled}
                         onUpdate={this.updateCity}
                         onBlur={this.props.onBlur}
                         onFocus={this.props.onFocus}
                         />
                  <Radio name="addressType"
                         className="dpo"
                         label={i18n.m('address.apoFpo.apoFpoType.dpo.label')}
                         value="DPO"
                         disabled={this.props.disabled}
                         onUpdate={this.updateCity}
                         onBlur={this.props.onBlur}
                         onFocus={this.props.onFocus}
                         />
                </RadioGroup>
                <div className="state-zip-wrap">
                  <ApoFpo name="apoFpo"
                          className="state required"
                          label={this.props.postOfficeStateLabel}
                          value={this.props.state}
                          onUpdate={this.updateState}
                          onError={this.handleError}
                          onFocus={this.props.onFocus}
                          onBlur={this.props.onBlur}
                          required={this.props.required}
                          disabled={this.props.disabled}
                          tabNext={() => { this.props.tab(this.refs.apo_zipcode.refs.zipcode.refs.text.refs.input) }}
                    />
                    <ZipCode name="zipcode"
                             ref="apo_zipcode"
                             key="apo_zipcode"
                             className="zipcode required"
                             label={this.props.postOfficeZipcodeLabel}
                             value={this.props.zipcode}
                             onUpdate={this.updateZipcode}
                             onError={this.handleError}
                             onFocus={this.props.onFocus}
                             onBlur={this.props.onBlur}
                             required={this.props.required}
                             disabled={this.props.disabled}
                             />
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    )
  }
}

Address.defaultProps = {
  label: i18n.t('address.label'),
  tab: (input) => { input.focus() },
  country: { value: 'United States' },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  showPostOffice: true,
  streetLabel: i18n.t('address.us.street.label'),
  postOfficeStreetPlaceholder: i18n.t('address.apoFpo.street.placeholder'),
  postOfficeStateLabel: i18n.t('address.apoFpo.apoFpo.label'),
  postOfficeZipcodeLabel: i18n.t('address.apoFpo.zipcode.label'),
  street2Label: i18n.t('address.us.street2.label'),
  addressBooks: {},
  addressBook: ''
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
            return !!props.street && !!props.city && !!props.state && !!props.zipcode
          default:
            return !!props.street && !!props.city && !!country
        }
      }
      return true
    }
  }
]
