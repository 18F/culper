import React from 'react'
import PropTypes from 'prop-types'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'
import { unitedStates, otherUsTerritories } from '../../../validators/location'

export default class State extends ValidationElement {
  constructor(props) {
    super(props)
    this.getStatePostalCode = this.getStatePostalCode.bind(this)
    this.getStates = this.getStates.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    this.states = [
      ...unitedStates,
      ...otherUsTerritories,
      ...props.additionalStates
    ]
  }

  getStatePostalCode(stateName) {
    const stateObj = this.states.find(
      state => state.name.toLowerCase() === stateName.toLowerCase()
    )

    if (stateObj) {
      return stateObj.postalCode
    }
    return stateName
  }

  // Gets all internally stored states and children states
  getStates() {
    return this.states.map(state => (
      <option key={state.name} value={state.postalCode}>
        {state.name}
      </option>
    ))
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

  handleUpdate(stateObj) {
    const value =
      stateObj.value.length > 2
        ? this.getStatePostalCode(stateObj.value)
        : stateObj.value.toUpperCase()

    this.props.onUpdate({
      ...stateObj,
      value
    })
  }

  render() {
    return (
      <Dropdown
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        className={this.props.className}
        disabled={this.props.disabled}
        onUpdate={this.handleUpdate}
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

State.propTypes = {
  additionalStates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequried
  }))
}

State.defaultProps = {
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false,
  additionalStates: []
}

State.errors = []
