import React from 'react'
import { i18n } from '../../../config'
import { BirthPlaceValidator } from '../../../validators'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import City from '../City'
import MilitaryState from '../MilitaryState'
import Country from '../Country'
import Branch from '../Branch'
import Show from '../Show'

export default class InternationalBirthPlace extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        city: this.props.city,
        country: this.props.country,
        ...updateValues
      })
    }
  }

  updateCity (event) {
    this.update({ city: event.target.value })
  }

  updateCountry (event) {
    this.update({ country: event.target.value })
  }

  render () {
    return (
      <div>
        <Field adjustFor="labels">
          <City name="city"
            label={this.props.cityLabel}
            value={this.props.city}
            className="city"
            placeholder={this.props.cityPlaceholder}
            maxlength="100"
            onChange={this.updateCity}
            onValidate={this.handleValidation}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
        </Field>
        <Field adjustFor="labels">
          <Country name="country"
            label={this.props.countryLabel}
            value={this.props.country}
            className="country"
            placeholder={this.props.countryPlaceholder}
            excludeUnitedStates="true"
            disabled={this.props.disabledCountry}
            onChange={this.updateCountry}
            onValidate={this.handleValidation}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
        </Field>
      </div>
    )
  }
}
