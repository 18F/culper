import React from 'react'
import { ValidationElement, City, MilitaryState, County, Country } from '../../../Form'
import { api } from '../../../../services/api'

export default class ApplicantBirthPlace extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      city: props.city,
      state: props.state,
      county: props.county,
      country: props.country,
      disabledState: false,
      disabledCountry: false
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
        updated = { city: value }
        break

      case 'state':
        updated = {
          state: value,
          disabledCountry: value !== ''
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
        <h2>Place of birth</h2>
        <City name={this.partName('city')}
              label="City"
              value={this.state.city}
              maxlength="100"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <MilitaryState name={this.partName('state')}
                       label="State"
                       value={this.state.state}
                       includeStates="true"
                       disabled={this.state.disabledState}
                       onChange={this.handleChange}
                       onValidate={this.handleValidation}
                       onFocus={this.props.onFocus}
                       onBlur={this.props.onBlur}
                       />
        <County name={this.partName('county')}
                label="County"
                value={this.state.county}
                maxlength="255"
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        <Country name={this.partName('country')}
                 label="Country"
                 value={this.state.country}
                 disabled={this.state.disabledCountry}
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 onFocus={this.props.onFocus}
                 onBlur={this.props.onBlur}
                 />
      </div>
    )
  }
}
