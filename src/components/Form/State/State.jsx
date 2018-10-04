import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class State extends ValidationElement {
  constructor(props) {
    super(props)
    this.getStates = this.getStates.bind(this)
    this.handleError = this.handleError.bind(this)

    this.states = [
      { name: 'Alabama', abbreviation: 'AL' },
      { name: 'Alaska', abbreviation: 'AK' },
      { name: 'Arizona', abbreviation: 'AZ' },
      { name: 'Arkansas', abbreviation: 'AR' },
      { name: 'California', abbreviation: 'CA' },
      { name: 'Colorado', abbreviation: 'CO' },
      { name: 'Connecticut', abbreviation: 'CT' },
      { name: 'Delaware', abbreviation: 'DE' },
      { name: 'Washington D.C.', abbreviation: 'DC' },
      { name: 'Florida', abbreviation: 'FL' },
      { name: 'Georgia', abbreviation: 'GA' },
      { name: 'Hawaii', abbreviation: 'HI' },
      { name: 'Idaho', abbreviation: 'ID' },
      { name: 'Illinois', abbreviation: 'IL' },
      { name: 'Indiana', abbreviation: 'IN' },
      { name: 'Iowa', abbreviation: 'IA' },
      { name: 'Kansas', abbreviation: 'KS' },
      { name: 'Kentucky', abbreviation: 'KY' },
      { name: 'Louisiana', abbreviation: 'LA' },
      { name: 'Maine', abbreviation: 'ME' },
      { name: 'Maryland', abbreviation: 'MD' },
      { name: 'Massachusetts', abbreviation: 'MA' },
      { name: 'Michigan', abbreviation: 'MI' },
      { name: 'Minnesota', abbreviation: 'MN' },
      { name: 'Mississippi', abbreviation: 'MS' },
      { name: 'Missouri', abbreviation: 'MO' },
      { name: 'Montana', abbreviation: 'MT' },
      { name: 'Nebraska', abbreviation: 'NE' },
      { name: 'Nevada', abbreviation: 'NV' },
      { name: 'New Hampsire', abbreviation: 'NH' },
      { name: 'New Jersey', abbreviation: 'NJ' },
      { name: 'New Mexico', abbreviation: 'NM' },
      { name: 'New York', abbreviation: 'NY' },
      { name: 'North Carolina', abbreviation: 'NC' },
      { name: 'North Dakota', abbreviation: 'ND' },
      { name: 'Ohio', abbreviation: 'OH' },
      { name: 'Oklahoma', abbreviation: 'OK' },
      { name: 'Oregon', abbreviation: 'OR' },
      { name: 'Pennsylvania', abbreviation: 'PA' },
      { name: 'Rhode Island', abbreviation: 'RI' },
      { name: 'South Carolina', abbreviation: 'SC' },
      { name: 'South Dakota', abbreviation: 'SD' },
      { name: 'Tennessee', abbreviation: 'TN' },
      { name: 'Texas', abbreviation: 'TX' },
      { name: 'Utah', abbreviation: 'UT' },
      { name: 'Vermont', abbreviation: 'VT' },
      { name: 'Virginia', abbreviation: 'VA' },
      { name: 'Washington', abbreviation: 'WA' },
      { name: 'West Virginia', abbreviation: 'WV' },
      { name: 'Wisconsin', abbreviation: 'WI' },
      { name: 'Wyoming', abbreviation: 'WY' },
      { name: 'American Samoa', abbreviation: 'AS' },
      { name: 'FQ', abbreviation: 'FQ' },
      { name: 'Guan', abbreviation: 'GU' },
      { name: 'HQ', abbreviation: 'HQ' },
      { name: 'DQ', abbreviation: 'DQ' },
      { name: 'JQ', abbreviation: 'JQ' },
      { name: 'KQ', abbreviation: 'KQ' },
      { name: 'Marshall Islands', abbreviation: 'MH' },
      { name: 'Micronesia', abbreviation: 'FM' },
      { name: 'MQ', abbreviation: 'MQ' },
      { name: 'BQ', abbreviation: 'BQ' },
      { name: 'Northern Mariana Islands', abbreviation: 'MP' },
      { name: 'Palau', abbreviation: 'PW' },
      { name: 'LQ', abbreviation: 'LQ' },
      { name: 'Puerto Rico', abbreviation: 'PR' },
      { name: 'Virgin Islands', abbreviation: 'VI' },
      { name: 'WQ', abbreviation: 'WQ' }
    ]
  }

  // Gets all internally stored states, and children states to spread in the render
  getStates() {
    console.log(this.states)
    console.log(this.props.children)
    const states = this.states.map(state => (
      <option key={state.name} value={state.abbreviation}>
        {state.name}
      </option>
    ))

    return [...states, ...this.props.children]
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `state.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render() {
    return (
      <Dropdown
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        className={this.props.className}
        disabled={this.props.disabled}
        onUpdate={this.props.onUpdate}
        onError={this.handleError}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        value={this.props.value}
        required={this.props.required}
        tabBack={this.props.tabBack}
        tabNext={this.props.tabNext}
        receiveProps={true}>
        {this.getStates()}
      </Dropdown>
    )
  }
}

State.defaultProps = {
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}

State.errors = []
