import React from 'react'
import { i18n } from '../../../config'
import { BirthPlaceValidator } from '../../../validators'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import City from '../City'
import MilitaryState from '../MilitaryState'
import County from '../County'
import Country from '../Country'
import Branch from '../Branch'
import Show from '../Show'

export default class BirthPlace extends ValidationElement {
  constructor (props) {
    super(props)
    let domestic = (props.country === undefined ? null : (props.country === 'United States' ? 'Yes' : 'No'))
    let disabledCountry = props.disabledCountry
    let disabledState = props.disabledState

    if (domestic !== null) {
      disabledCountry = props.country === 'United States'
      disabledState = !disabledCountry
    }

    this.state = {
      name: props.name,
      label: props.label,
      city: props.city,
      state: props.state,
      county: props.county,
      country: props.country,
      domestic: domestic,
      disabledState: disabledState,
      disabledCountry: disabledCountry,
      errorCodes: []
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    if (!event || !event.target) {
      return
    }

    let part = event.target.id
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'domestic':
        break

      case 'city':
        updated = { city: value }
        break

      case 'state':
        updated = {
          state: value
        }
        break

      case 'county':
        updated = { county: value }
        break

      case 'country':
        updated = {
          country: value,
          disabledState: !(value === '' || value === 'United States')
        }
        break
    }

    if (updated !== null) {
      this.setState(updated, () => {
        super.handleChange(event)
        if (this.props.onUpdate) {
          this.props.onUpdate({
            city: this.state.city,
            state: this.state.state,
            county: this.state.county,
            country: this.state.country,
            domestic: this.state.domestic
          })
        }
      })
    } else {
      super.handleChange(event)
    }
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `birthplace.${err.code}`,
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

  isValid () {
    return new BirthPlaceValidator(this.state, null).isValid()
  }

  onUpdate (value, event) {
    let updated = null
    if (value === 'No') {
      updated = {
        country: '',
        state: '',
        disabledCountry: false,
        disabledState: true,
        domestic: value,
        errorCodes: []
      }
    } else if (value === 'Yes') {
      updated = {
        country: 'United States',
        state: '',
        disabledCountry: true,
        disabledState: false,
        domestic: value,
        errorCodes: []
      }
    } else {
      updated = {
        country: '',
        state: '',
        disabledCountry: true,
        disabledState: true,
        domestic: value,
        errorCodes: []
      }
    }

    this.setState(updated, () => {
      // super.handleValidation(event, null, { drop_the_kids_off: null })
      if (this.props.onUpdate) {
        this.props.onUpdate(updated)
      }
    })
  }

  options () {
    if (!this.props.branch) {
      return null
    }

    return (
      <Branch name="is_domestic"
              help={this.props.help}
              value={this.state.domestic}
              label={this.props.label}
              onUpdate={this.onUpdate.bind(this)}
              onError={this.handleError}>
      </Branch>
    )
  }

  render () {
    const klass = `birthplace ${this.props.className || ''}`.trim()

    if (this.props.branch && !this.state.disabledCountry && !this.state.disabledState) {
      return (
        <div className={klass}>
          {this.options()}
        </div>
      )
    } else if (this.state.disabledCountry) {
      return (
        <div className={klass}>
          {this.options()}
          <Field key="domestic_state" adjustFor="labels">
            <MilitaryState name="state"
                           label={this.props.stateLabel}
                           value={this.state.state}
                           className="state"
                           placeholder={this.props.statePlaceholder}
                           includeStates="true"
                           required="true"
                           disabled={this.state.disabledState}
                           onChange={this.handleChange}
                           onError={this.handleError}
                           onFocus={this.props.onFocus}
                           onBlur={this.props.onBlur}
                           />
          </Field>
          <Field key="domestic_city" adjustFor="labels">
            <City name="city"
                  label={this.props.cityLabel}
                  value={this.state.city}
                  className="city"
                  placeholder={this.props.cityPlaceholder}
                  maxlength="100"
                  onChange={this.handleChange}
                  onError={this.handleError}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
          </Field>
          <Show when={this.props.hideCounty === false}>
            <Field key="domestic_county" adjustFor="labels">
              <County name="county"
                      label={this.props.countyLabel}
                      value={this.state.county}
                      className="county"
                      placeholder={this.props.countyPlaceholder}
                      maxlength="255"
                      onChange={this.handleChange}
                      onError={this.handleError}
                      onFocus={this.props.onFocus}
                      onBlur={this.props.onBlur}
                      />
            </Field>
          </Show>
        </div>
      )
    }

    return (
      <div className={klass}>
        {this.options()}
        <Field key="intl_city" adjustFor="labels">
          <City name="city"
                label={this.props.cityLabel}
                value={this.state.city}
                className="city"
                placeholder={this.props.cityPlaceholder}
                maxlength="100"
                onChange={this.handleChange}
                onError={this.handleError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        </Field>
        <Field key="intl_country" adjustFor="labels">
          <Country name="country"
                   label={this.props.countryLabel}
                   value={this.state.country}
                   className="country"
                   placeholder={this.props.countryPlaceholder}
                   excludeUnitedStates="true"
                   disabled={this.state.disabledCountry}
                   onChange={this.handleChange}
                   onError={this.handleError}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
        </Field>
      </div>
    )
  }
}

BirthPlace.defaultProps = {
  label: i18n.t('identification.birthplace.question.label'),
  help: 'identification.birthplace.branch.help',
  branch: true,
  disabledCountry: false,
  disabledState: false,
  hideCounty: false,
  stateLabel: i18n.t('identification.birthplace.label.state'),
  statePlaceholder: i18n.t('identification.birthplace.placeholder.state'),
  cityLabel: i18n.t('identification.birthplace.label.city'),
  cityPlaceholder: i18n.t('identification.birthplace.placeholder.city'),
  countyLabel: i18n.t('identification.birthplace.label.county'),
  countyPlaceholder: i18n.t('identification.birthplace.placeholder.county'),
  countryLabel: i18n.t('identification.birthplace.label.country'),
  countryPlaceholder: i18n.t('identification.birthplace.placeholder.country'),
  onError: (value, arr) => { return arr }
}

BirthPlace.errors = []
