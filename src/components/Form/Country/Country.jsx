import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'
import MultipleDropdown from '../MultipleDropdown'
import { i18n } from '../../../config'

export default class Country extends ValidationElement {
  constructor (props) {
    super(props)

    // For the typical Dropdown component a string value is expected.
    // However, for the MultiDropdown, the value must be an array of objects.
    this.state = {
      value: props.value
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  onUpdate (value) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        value: value
      })
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      this.onUpdate(event.target.value)
      super.handleChange(event)
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `country.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  unitedStates () {
    if (this.props.excludeUnitedStates) {
      return null
    }

    return <option value="United States">United States</option>
  }

  renderOptions () {
    const countries = i18n.value('countries')
    const filter = this.props.excludeUnitedStates
          ? (x) => { return x !== 'unitedStates' }
          : () => { return true }

    const countryOptions = Object.keys(countries).filter(filter).map(x => {
      return <option key={x} value={countries[x]}>{countries[x]}</option>
    })

    // Check for children
    const children = this.props.children || []
    const options = countryOptions.concat(children.map(x => {
      if (x && x.type === 'option') {
        return x
      }
      return null
    }))

    // Do the placeholder first if one is present
    if (this.props.placeholder) {
      return [<option key="placeholder" value="">{this.props.placeholder}</option>].concat(options)
    }

    return options.map(x => { return x })
  }

  render () {
    const klass = `country ${this.props.className || ''}`.trim()
    const options = this.renderOptions()

    if (this.props.multiple) {
      return (
        <MultipleDropdown name={this.props.name}
                          label={this.props.label}
                          help="Country is required"
                          placeholder={this.props.placeholder}
                          className={klass}
                          disabled={this.props.disabled}
                          onUpdate={this.onUpdate}
                          onError={this.handleError}
                          onFocus={this.handleFocus}
                          onBlur={this.handleBlur}
                          value={this.props.value}
                          required={this.props.required}
                          >
          { options }
        </MultipleDropdown>
      )
    }

    return (
      <Dropdown name={this.props.name}
                label={this.props.label}
                help="Country is required"
                placeholder={this.props.placeholder}
                className={klass}
                disabled={this.props.disabled}
                onChange={this.handleChange}
                onError={this.handleError}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.props.value}
                required={this.props.required}
                >
        { options }
      </Dropdown>
    )
  }
}

Country.defaultProps = {
  name: 'country',
  excludeUnitedStates: false,
  onError: (value, arr) => { return arr }
}

Country.errors = []
