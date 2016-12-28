import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class EyeColor extends ValidationElement {
  render () {
    return (
      <div>
        <h2>Eye Color</h2>
        <Dropdown name={this.props.name}
          label={this.props.label}
          help={this.props.help}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
          onValidation={this.props.onValidation}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        >
          <option value="">{this.props.placeholder}</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="Brown">Brown</option>
          <option value="Gray">Gray</option>
          <option value="Green">Green</option>
          <option value="Hazel">Hazel</option>
          <option value="Maroon">Maroon</option>
          <option value="Multicolored">Multicolored</option>
          <option value="Pink">Pink</option>
          <option value="Unknown">Unknown</option>
        { this.props.children }
      </Dropdown>
    </div>
    )
  }
}
