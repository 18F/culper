import React from 'react'

import militaryStates from 'constants/enums/militaryStates'

import ValidationElement from 'components/Form/ValidationElement'
import Dropdown from 'components/Form/Dropdown'
import State from 'components/Form/State'

export default class MilitaryState extends ValidationElement {
  render() {
    if (this.props.includeStates) {
      return (
        <State
          name={this.props.name}
          label={this.props.label}
          placeholder={this.props.placeholder}
          className={this.props.className}
          disabled={this.props.disabled}
          onUpdate={this.props.onUpdate}
          onError={this.props.onError}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          value={this.props.value}
          required={this.props.required}
          tabBack={this.props.tabBack}
          tabNext={this.props.tabNext}
          additionalStates={militaryStates}
        />
      )
    }

    return (
      <Dropdown
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        className={this.props.className}
        disabled={this.props.disabled}
        onUpdate={this.props.onUpdate}
        onError={this.props.onError}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        required={this.props.required}
        tabBack={this.props.tabBack}
        tabNext={this.props.tabNext}
      >
        {militaryStates.map(s => (
          <option key={s.postalCode} value={s.postalCode}>
            {s.name}
          </option>
        ))}
      </Dropdown>
    )
  }
}

MilitaryState.defaultProps = {
  required: false,
}
