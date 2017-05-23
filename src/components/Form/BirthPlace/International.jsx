import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import Country from '../Country'
import Text from '../Text'

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
        domestic: 'No',
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
      <div className="birthplace-international">
        <Field adjustFor="labels">
          <Text name="city"
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

InternationalBirthPlace.defaultProps = {
  cityLabel: i18n.t('identification.birthplace.label.city'),
  cityPlaceholder: i18n.t('identification.birthplace.placeholder.city'),
  countryLabel: i18n.t('identification.birthplace.label.country'),
  countryPlaceholder: i18n.t('identification.birthplace.placeholder.country')
}
