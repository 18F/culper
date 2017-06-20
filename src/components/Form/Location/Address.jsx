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
import Show from '../Show'
import { i18n } from '../../../config'

export default class Address extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.updateAddressType = this.updateAddressType.bind(this)
  }

  updateStreet (event) {
    this.update({ street: event.target.value })
  }

  updateCity (event) {
    this.update({ city: event.target.value })
  }

  updateState (event) {
    this.update({state: event.target.value})
  }

  updateZipcode (event) {
    this.update({zipcode: event.target.value})
  }

  updateCountry (event) {
    this.update({country: event.target.value})
  }

  updateAddressType (cb) {
    this.update({addressType: cb.value})
  }

  componentWillUnmount () {
    this.handleAsyncValidation = null
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        addressType: this.props.addressType,
        street: this.props.street,
        city: this.props.city,
        state: this.props.state,
        country: this.props.country,
        zipcode: this.props.zipcode,
        ...updateValues
      })
    }
  }

  //handleError (value, arr) {
    //arr = arr.map(err => {
      //return {
        //code: `address.${err.code}`,
        //valid: err.valid,
        //uid: err.uid
      //}
    //})

    //// Take the original and concatenate our new error values to it
    //return this.props.onError(value, arr)
  //}

  render () {
    const klass = `address ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Show when={!this.props.disableToggle}>
          <div>
            <label>{this.props.label}</label>
            <RadioGroup className="address-options" selectedValue={this.props.addressType}>
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
              <Radio name="addressType"
                label={i18n.m('address.options.apoFpo.label')}
                value="APOFPO"
                className="apofpo"
                ignoreDeselect="true"
                disabled={this.props.disabled}
                onUpdate={this.updateAddressType}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
              />
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
        <div className="fields">
          <div>
            <Show when={this.props.addressType === 'United States'}>
              <div>
                <Street name="address"
                  className="mailing"
                  label={i18n.t('address.us.street.label')}
                  placeholder={i18n.t('address.us.street.placeholder')}
                  value={this.props.street}
                  onChange={this.updateStreet}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                />
                <City name="city"
                  className="city"
                  label={i18n.t('address.us.city.label')}
                  placeholder={i18n.t('address.us.city.placeholder')}
                  value={this.props.city}
                  onChange={this.updateCity}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                />
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
                    ref="us_zipcode"
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
              </div>
            </Show>
            <Show when={this.props.addressType === 'International'}>
              <div>
                <Street name="address"
                  label={i18n.t('address.international.street.label')}
                  placeholder={i18n.t('address.international.street.placeholder')}
                  className="mailing"
                  value={this.props.address}
                  onChange={this.updateStreet}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                />
                <City name="city"
                  className="city"
                  label={i18n.t('address.international.city.label')}
                  placeholder={i18n.t('address.international.city.placeholder')}
                  value={this.props.city}
                  onChange={this.updateCity}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                />
                <Country name="country"
                  label={i18n.t('address.international.country.label')}
                  placeholder={i18n.t('address.international.country.placeholder')}
                  value={this.props.country}
                  excludeUnitedStates="true"
                  onChange={this.updateCountry}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                />
              </div>
            </Show>
            <Show when={this.props.addressType === 'APOFPO'}>
              <div>
                <Street name="address"
                  label={i18n.t('address.apoFpo.street.label')}
                  placeholder={i18n.t('address.apoFpo.street.placeholder')}
                  className="mailing"
                  value={this.props.address}
                  onChange={this.handleChange.bind(this, 'address')}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                />
                <label>{i18n.t('address.apoFpo.select.label')}</label>
                <RadioGroup className="apofpo" selectedValue={this.props.city}>
                  <Radio name="apoFpoType"
                    label={i18n.t('address.apoFpo.apoFpoType.apo.label')}
                    value="APO"
                    disabled={this.props.disabled}
                    onChange={this.handleChange.bind(this, 'city')}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                  />
                  <Radio name="addressType"
                    label={i18n.t('address.apoFpo.apoFpoType.fpo.label')}
                    value="FPO"
                    disabled={this.props.disabled}
                    onChange={this.handleChange.bind(this, 'city')}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                  />
                </RadioGroup>
                <div className="state-zip-wrap">
                  <ApoFpo name="apoFpo"
                    className="state"
                    label={i18n.t('address.apoFpo.apoFpo.label')}
                    placeholder={i18n.t('address.apoFpo.apoFpo.placeholder')}
                    value={this.props.state}
                    onChange={this.handleChange.bind(this, 'state')}
                    onError={this.handleError}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    tabNext={() => { this.props.tab(this.refs.apo_zipcode.refs.zipcode.refs.text.refs.input) }}
                  />
                  <ZipCode name="zipcode"
                    ref="apo_zipcode"
                    key="apo_zipcode"
                    className="zipcode"
                    label={i18n.t('address.apoFpo.zipcode.label')}
                    placeholder={i18n.t('address.apoFpo.zipcode.placeholder')}
                    value={this.props.zipcode}
                    onChange={this.handleChange.bind(this, 'zipcode')}
                    onError={this.handleError}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
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
  addressType: 'United States',
  country: 'United States',
  disableToggle: false,
  onError: (value, arr) => { return arr }
}

Address.errors = []

