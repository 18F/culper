import React from 'react'
import Street from '../Street'
import State from '../State'
import MilitaryState from '../MilitaryState'
import City from '../City'
import Country from '../Country'
import ZipCode from '../ZipCode'
import ApoFpo from '../ApoFpo'
import { api } from '../../../services/api'

export default class Address extends React.Component {
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

    this.handleChange = this.handleChange.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({
      error: status === false,
      valid: status === true
    })

    api
      .validateAddress({
        Address: [this.state.address1, this.state.address2].join(', '),
        City: this.state.city,
        State: this.state.state,
        Zipcode: this.state.zipcode,
        Country: this.state.country
      })
      .then((response) => {
        if (response.Errors) {
        }

        if (response.Suggestions) {
        }
      })
      .finally(() => {
        if (this.props.onValidate) {
          this.props.onValidate(status)
        }
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
                />
        <Street name={this.partName('address2')}
                label="Mailing Address 2"
                value={this.state.address2}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                />
        <City name={this.partName('city')}
              label="City"
              value={this.state.city}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              />
        <MilitaryState name={this.partName('state')}
                       label="State"
                       value={this.state.state}
                       includeStates="true"
                       onChange={this.handleChange}
                       onValidate={this.handleValidation}
                       />
        <ZipCode name={this.partName('zipcode')}
                 label="Zipcode"
                 value={this.state.zipcode}
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 />
        <Country name={this.partName('country')}
                 label="Country"
                 value={this.state.country}
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 />
      </div>
    )
  }
}
