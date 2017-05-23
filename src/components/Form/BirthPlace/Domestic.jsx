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

export default class DomesticBirthPlace extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateCity = this.updateCity.bind(this)
    this.updateCounty = this.updateCounty.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        city: this.props.city,
        state: this.props.state,
        county: this.props.county,
        ...updateValues
      })
    }
  }

  updateState (event) {
    this.update({ state: event.target.value })
  }

  updateCity (event) {
    this.update({ city: event.target.value })
  }

  updateCounty (event) {
    this.update({ city: event.target.value })
  }

  render () {
    return (
      <div>
        <Field adjustFor="labels">
          <MilitaryState name="state"
            label={this.props.stateLabel}
            value={this.props.state}
            className="state"
            placeholder={this.props.statePlaceholder}
            includeStates="true"
            required="true"
            disabled={this.props.disabledState}
            onChange={this.updateState}
            onValidate={this.handleValidation}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
        </Field>
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
        <Show when={this.props.hideCounty === false}>
          <Field adjustFor="labels">
            <County name="county"
              label={this.props.countyLabel}
              value={this.props.county}
              className="county"
              placeholder={this.props.countyPlaceholder}
              maxlength="255"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          </Field>
        </Show>
      </div>
    )
  }
}
