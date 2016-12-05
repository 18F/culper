import React from 'react'
import ValidationElement from '../validationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import { api } from '../../../services/api'

export default class Address extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      value: props.value,
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
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
        .validateAddress({
          Address: [this.state.address1, this.state.address2].join(', '),
          City: this.state.city,
          State: this.state.state,
          Zipcode: this.state.zipcode,
          Country: this.state.country
        })
        .then((response) => {
          // TODO: Display and assign the errors as necessary
          if (response.Errors) {
            this.setState({
              error: response.Error.length > 0,
              valid: response.Errors.length === 0
            })
          }

          // TODO: Display suggestions
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

  render () {
    return (
      <div>
        <Street name={this.partName('address1')}
                label="Mailing Address"
                value={this.state.address1}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        <Street name={this.partName('address2')}
                label="Mailing Address 2"
                value={this.state.address2}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
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
        <ZipCode name={this.partName('zipcode')}
                 label="Zipcode"
                 value={this.state.zipcode}
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
