import React from 'react'
import PropTypes from 'prop-types'

import usStates from 'constants/enums/usStates'
import usTerritories from 'constants/enums/usTerritories'

import ValidationElement from 'components/Form/ValidationElement'
import Dropdown from 'components/Form/Dropdown'

export default class State extends ValidationElement {
  states = () => [
    ...usStates,
    ...usTerritories,
    ...this.props.additionalStates,
  ]

  getStatePostalCode = (stateName) => {
    const stateObj = this.states().find(
      state => state.name.toLowerCase() === stateName.toLowerCase()
    )

    if (stateObj) {
      return stateObj.postalCode
    }

    return stateName
  }

  handleError = (value, arr) => {
    /* eslint no-param-reassign: 0 */
    arr = arr.map(err => ({
      code: `state.${err.code}`,
      valid: err.valid,
      uid: err.uid,
    }))
    /* eslint no-param-reassign: 1 */

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  handleUpdate = (stateObj) => {
    const value = stateObj.value.length > 2
      ? this.getStatePostalCode(stateObj.value)
      : stateObj.value.toUpperCase()

    this.props.onUpdate({
      ...stateObj,
      value,
    })
  }

  render() {
    const allStates = this.states()

    return (
      <div className="usa-form-control">
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
          receiveProps
        >
          {allStates.map(state => (
            <option key={state.name} value={state.postalCode}>
              {state.name}
            </option>
          ))}
        </Dropdown>
      </div>
    )
  }
}

State.propTypes = {
  additionalStates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  })),
}

State.defaultProps = {
  value: '',
  onUpdate: () => {},
  onError: (value, arr) => arr,
  required: false,
  additionalStates: [],
}

State.errors = []
