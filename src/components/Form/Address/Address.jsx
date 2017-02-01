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
import { api } from '../../../services/api'
import { Help, HelpIcon } from '../Help'
import { i18n } from '../../../config'

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
      apoFpoType: props.apoFpoType
    }
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
    this.setState({ [field]: event.target.value }, () => {
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
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, status)
        return
      }

      api
        .validateAddress({
          Address: [this.state.address1, this.state.address2].join(', '),
          City: this.state.city,
          State: this.state.state,
          Zipcode: this.state.zipcode,
          Country: this.state.country
        })
        .then((response) => {
          // TODO: Display and assign the errors as necessary
          if (response.Errors) {
            this.setState({
              error: response.Error.length > 0,
              valid: response.Errors.length === 0
            })
          }

          // TODO: Display suggestions
          if (response.Suggestions) {
          }
        })
        .then(() => {
          super.handleValidation(event, status)
        })
    })
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.props.name + '-' + part
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
            label={i18n.t('address.options.us.label')}
            value="United States"
            disabled={this.props.disabled}
            onChange={this.handleChange.bind(this, 'addressType')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio name="addressType"
            label={i18n.t('address.options.apoFpo.label')}
            value="APOFPO"
            disabled={this.props.disabled}
            onChange={this.handleChange.bind(this, 'addressType')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio name="addressType"
            label={i18n.t('address.options.international.label')}
            value="International"
            disabled={this.props.disabled}
            onChange={this.handleChange.bind(this, 'addressType')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
        </RadioGroup>
        <div className="fields">
          {this.state.addressType === 'United States' && this.usAddress()}
          {this.state.addressType === 'International' && this.internationalAddress()}
          {this.state.addressType === 'APOFPO' && this.apoFpoAddress()}
        </div>
      </div>
    )
  }
}
