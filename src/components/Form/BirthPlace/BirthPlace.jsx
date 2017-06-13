import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Branch from '../Branch'
import Show from '../Show'
import DomesticBirthPlace from './Domestic'
import InternationalBirthPlace from './International'

export default class BirthPlace extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateBirthPlaceType = this.updateBirthPlaceType.bind(this)
    this.updateDomesticBirthPlace = this.updateDomesticBirthPlace.bind(this)
    this.updateInternationalBirthPlace = this.updateInternationalBirthPlace.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        city: this.props.city,
        county: this.props.county,
        state: this.props.state,
        country: this.props.country,
        domestic: this.props.domestic,
        ...updateValues
      })
    }
  }

  updateBirthPlaceType (values) {
    switch (values) {
      case 'Yes':
        this.update({
          domestic: values,
          country: 'United States'
        })
        break
      case 'No':
        this.update({
          domestic: values,
          state: '',
          county: '',
          country: ''
        })
        break
    }
  }

  updateDomesticBirthPlace (place) {
    this.update({
      city: place.city,
      state: place.state,
      county: place.county,
      country: 'United States',
      domestic: 'Yes'
    })
  }

  updateInternationalBirthPlace (place) {
    this.update({
      city: place.city,
      state: '',
      county: '',
      country: place.country,
      domestic: 'No'
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

    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props),
        uid: err.uid
      }
    })))
  }

  render () {
    const klass = `birthplace ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        <Branch name="birthplace_type"
                help={this.props.help}
                value={this.props.domestic}
                label={this.props.label}
                onUpdate={this.updateBirthPlaceType}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.props.domestic === 'Yes'}>
          <DomesticBirthPlace
            {...this.props}
            onError={this.handleError}
            onUpdate={this.updateDomesticBirthPlace}
            />
        </Show>
        <Show when={this.props.domestic === 'No'}>
          <InternationalBirthPlace
            {...this.props}
            onError={this.handleError}
            onUpdate={this.updateInternationalBirthPlace}
            />
        </Show>
      </div>
    )
  }
}

BirthPlace.defaultProps = {
  name: 'birthplace',
  label: i18n.t('identification.birthplace.question.label'),
  help: 'identification.birthplace.branch.help',
  branch: true,
  disabledCountry: false,
  disabledState: false,
  hideCounty: false,
  onError: (value, arr) => { return arr }
}

BirthPlace.errors = []
