import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'
import State from '../State'

export default class MilitaryState extends ValidationElement {
  render () {
    if (this.props.includeStates) {
      return (
        <State name={this.props.name}
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
               >
          <option key="aa" value="AA">U.S. Armed Forces - Americas</option>
          <option key="ae" value="AE">U.S. Armed Forces - Europe</option>
          <option key="ap" value="AP">U.S. Armed Forces - Pacific</option>
        </State>
      )
    } else {
      return (
        <Dropdown name={this.props.name}
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
          <option key="aa" value="AA">U.S. Armed Forces - Americas</option>
          <option key="ae" value="AE">U.S. Armed Forces - Europe</option>
          <option key="ap" value="AP">U.S. Armed Forces - Pacific</option>
        </Dropdown>
      )
    }
  }
}

MilitaryState.defaultProps = {
  required: false
}
