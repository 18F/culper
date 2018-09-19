import React from 'react'
import { env } from '../../../config'
import ValidationElement from '../ValidationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import County from '../County'
import ZipCode from '../ZipCode'
import Show from '../Show'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import { country, countryValueResolver } from './Location'
import LocationValidator, { countryString } from '../../../validators/location'
import Layouts from './Layouts'

const mappingWarning = property => {
  if (!env.IsTest()) {
    console.warn(
      `Could not map location property '${property}' in ToggleableLocation `
    )
  }
}

export default class ToggleableLocation extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateStreet = this.updateStreet.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCounty = this.updateCounty.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateToggle = this.updateToggle.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.zipcodeInstate = this.zipcodeInstate.bind(this)
    this.onError = this.onError.bind(this)

    this.state = {
      suggestions: [],
      uid: `${this.props.name}-${super.guid()}`
    }
    this.errors = []
  }

  update(updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        street: this.props.street,
        city: this.props.city,
        zipcode: this.props.zipcode,
        state: this.props.state,
        country: this.props.country,
        countryComments: this.props.countryComments,
        county: this.props.county,
        domestic: this.props.domestic,
        domesticFields: this.props.domesticFields,
        internationalFields: this.props.internationalFields,
        ...updateValues
      })
    }
  }

  updateStreet(values) {
    this.update({ street: values.value })
  }

  updateCity(values) {
    this.update({ city: values.value })
  }

  updateState(values) {
    this.update({ state: values.value })
  }

  updateCountry(values) {
    this.update({
      country: values,
      countryComments: values.comments
    })
  }

  updateCounty(values) {
    this.update({ county: values.value })
  }

  updateZipcode(values) {
    this.update({ zipcode: values.value })
  }

  updateToggle(option) {
    // Set existing errors to null when toggling fields
    this.props.onError(
      option.value,
      this.errors.map(err => {
        return {
          code: err.code,
          valid: null,
          uid: err.uid
        }
      })
    )

    switch (option.value) {
      case 'Yes':
        this.update({ country: { value: 'United States' } })
        break
      case 'No':
        this.update({ country: { value: '' } })
        break
    }
  }

  zipcodeInstate() {
    const validator = new LocationValidator(this.props)

    if (
      validator.isDomestic() &&
      validator.layout === Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY
    ) {
      if (validator.validFields(['city', 'state', 'zipcode'])) {
        return validator.validZipcodeState()
      }
    }
  }

  render() {
    const instateZipcode = this.zipcodeInstate()
    const domesticFields = this.props.domesticFields.map(field => {
      const key = `domestic-${field}`
      switch (field) {
        case 'street':
          return (
            <Street
              name="street"
              className="mailing street"
              key={key}
              placeholder={this.props.streetPlaceholder}
              value={this.props.street}
              onUpdate={this.updateStreet}
              onError={this.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              required={this.props.required}
            />
          )
        case 'city':
          return (
            <City
              name="city"
              className="city"
              key={key}
              label={this.props.cityLabel}
              placeholder={this.props.cityPlaceholder}
              value={this.props.city}
              onUpdate={this.updateCity}
              onError={this.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              required={this.props.required}
            />
          )
        case 'county':
          return (
            <County
              name="county"
              key={key}
              label={this.props.countyLabel}
              value={this.props.county}
              className="county"
              placeholder={this.props.countyPlaceholder}
              maxlength="255"
              onUpdate={this.updateCounty}
              onError={this.onError}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
              required={this.props.required}
            />
          )
        case 'state':
          return (
            <MilitaryState
              name="state"
              key={key}
              className="state"
              label={this.props.stateLabel}
              placeholder={this.props.statePlaceholder}
              value={this.props.state}
              includeStates="true"
              onUpdate={this.updateState}
              onError={this.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              required={this.props.required}
            />
          )
        case 'stateZipcode':
          return (
            <div className="state-zip-wrap" key={key}>
              <MilitaryState
                name="state"
                className="state"
                label={this.props.stateLabel}
                placeholder={this.props.statePlaceholder}
                value={this.props.state}
                includeStates="true"
                onUpdate={this.updateState}
                onError={this.onError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                required={this.props.required}
              />
              <ZipCode
                name="zipcode"
                key="us_zipcode"
                className="zipcode"
                label={this.props.zipcodeLabel}
                placeholder={this.props.zipcodePlaceholder}
                value={this.props.zipcode}
                status={instateZipcode}
                onUpdate={this.updateZipcode}
                onError={this.onError}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                required={this.props.required}
              />
            </div>
          )
      }
    })

    const internationalFields = this.props.internationalFields.map(field => {
      const key = `domestic-${field}`
      switch (field) {
        case 'city':
          return (
            <City
              name="city"
              key={key}
              label={this.props.cityLabel}
              placeholder={this.props.cityPlaceholder}
              value={this.props.city}
              onUpdate={this.updateCity}
              onError={this.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              required={this.props.required}
            />
          )
        case 'country':
          return (
            <Country
              name="country"
              key={key}
              label={this.props.countryLabel}
              {...countryValueResolver(this.props)}
              className="country"
              placeholder={this.props.countryPlaceholder}
              excludeUnitedStates="true"
              disabled={this.props.disabledCountry}
              onUpdate={this.updateCountry}
              onError={this.onError}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              required={this.props.required}
            />
          )
      }
    })

    const countryName = country(this.props.country)
    return (
      <div className="toggleable-location">
        <RadioGroup
          className="option-list branch"
          required={this.props.required}
          onError={this.props.onError}
          selectedValue={branchValue(this.props.country)}>
          <Show when={this.props.label}>
            <label>{this.props.label}</label>
          </Show>

          <Radio
            name={this.props.name}
            label={'Yes'}
            value={'Yes'}
            className="yes"
            onUpdate={this.updateToggle}
            onError={this.onError}
          />
          <Radio
            name={this.props.name}
            label={'No'}
            value={'No'}
            className="no"
            onUpdate={this.updateToggle}
            onError={this.onError}
          />
        </RadioGroup>

        <Show when={countryName !== null && countryName === 'United States'}>
          {domesticFields}
        </Show>
        <Show when={countryName !== null && countryName !== 'United States'}>
          {internationalFields}
        </Show>
      </div>
    )
  }

  onError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `toggleablelocation.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    const requiredErr = arr.concat(
      this.constructor.errors.map(err => {
        return {
          code: `toggleablelocation.${err.code}`,
          valid: err.func(value, { ...this.props }),
          uid: this.state.uid
        }
      })
    )

    this.storeErrors(requiredErr)
    this.props.onError(value, requiredErr)
    return arr
  }

  storeErrors(errors) {
    let newErrors = [...errors]
    for (const e of newErrors) {
      const idx = this.errors.findIndex(
        x => x.uid === e.uid && x.code === e.code
      )
      if (idx !== -1) {
        this.errors[idx] = { ...e }
      } else {
        this.errors.push({ ...e })
      }
    }
  }
}

const branchValue = value => {
  const countryName = country(value)
  if (countryName === null) {
    // Neutral state
    return ''
  }

  switch (countryName) {
    case 'United States':
      return 'Yes'
    default:
      // For all other cases, country is an empty string (user intends to select country) or
      // user has selected a country
      return 'No'
  }
}

ToggleableLocation.defaultProps = {
  country: { value: null },
  domesticFields: [],
  internationalFields: [],
  onError: (value, arr) => {
    return arr
  },
  required: false,
  scrollIntoView: false
}

ToggleableLocation.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (!props.required) {
        return true
      }

      // Organizing the validation tests in a structure
      const branchValidations = {
        Yes: {
          fields: props => props.domesticFields,
          city: props => !!props.city,
          state: props => !!props.state,
          county: props => !!props.county,
          stateZipcode: props => !!props.state && !!props.zipcode,
          country: props => !!countryString(props.country)
        },
        No: {
          fields: props => props.internationalFields,
          city: props => !!props.city,
          country: props => !!countryString(props.country)
        }
      }

      // Retrieve the branch value provided. If the value does match the
      // approved validation tree then return a negative response.
      const branch = branchValue(props.country)
      const validations = branchValidations[branch]
      if (!validations) {
        return false
      }

      // Loop through all of the fields based on the branch and test for values.
      for (let f of validations.fields(props)) {
        // Retrieve the test and if one is not found print a warning and continue
        let test = validations[f]
        if (!test) {
          mappingWarning(f)
          return false
        }

        if (!test(props)) {
          return false
        }
      }

      return true
    }
  }
]
