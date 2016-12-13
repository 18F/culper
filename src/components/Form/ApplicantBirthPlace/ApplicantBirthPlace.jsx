import React from 'react'
import ValidationElement from '../validationElement'
import City from '../City'
import MilitaryState from '../MilitaryState'
import County from '../County'
import Country from '../Country'
import { api } from '../../../services/api'

export default class ApplicantBirthPlace extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      city: props.city,
      state: props.state,
      county: props.county,
      country: props.country
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = this.extractPart(event.target.id)
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'city':
        updated = { first: value }
        break

      case 'state':
        updated = { last: value }
        break

      case 'county':
        updated = { middle: value }
        break

      case 'country':
        updated = { suffix: value }
        break
    }

    if (updated !== null) {
      this.setState(updated, () => {
        super.handleChange(event)
      })
    } else {
      super.handleChange(event)
    }
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
        .validateApplicantBirthplace({
          City: this.state.city,
          State: this.state.state,
          County: this.state.county,
          Country: this.state.country
        })
        .then((response) => {
          // TODO: Display and assign the errors as necessary
          if (response.Errors) {
          }

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
    return '' + this.state.name + '-' + part
  }

  /**
   * Returns the part name from the pull generated identifier.
   */
  extractPart (id) {
    return id.split('-').pop()
  }

  render () {
    return (
      <div>
        <City name={this.partName('city')}
              label="City"
              value={this.state.city}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <MilitaryState name={this.partName('state')}
                       label="State"
                       value={this.state.state}
                       includeStates="true"
                       onChange={this.handleChange}
                       onValidate={this.handleValidation}
                       onFocus={this.props.onFocus}
                       onBlur={this.props.onBlur}
                       />
        <County name={this.partName('county')}
                label="County"
                value={this.state.county}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        <Country name={this.partName('country')}
                 label="Country"
                 value={this.state.country}
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 onFocus={this.props.onFocus}
                 onBlur={this.props.onBlur}
                 />
      </div>
    )
  }
}
