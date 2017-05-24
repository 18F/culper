import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import City from '../City'
import MilitaryState from '../MilitaryState'
import County from '../County'
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
    this.update({ county: event.target.value })
  }

  render () {
    return (
      <div className="birthplace-domestic">
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
              onChange={this.updateCounty}
              onValidate={this.handleValidation}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

DomesticBirthPlace.defaultProps = {
  stateLabel: i18n.t('identification.birthplace.label.state'),
  statePlaceholder: i18n.t('identification.birthplace.placeholder.state'),
  cityLabel: i18n.t('identification.birthplace.label.city'),
  cityPlaceholder: i18n.t('identification.birthplace.placeholder.city'),
  countyLabel: i18n.t('identification.birthplace.label.county'),
  countyPlaceholder: i18n.t('identification.birthplace.placeholder.county'),
  hideCounty: false
}
