import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Show from '../Show'
import Dropdown from '../Dropdown'
import MultipleDropdown from '../MultipleDropdown'

export default class Country extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      showComents: props.showComments
    }

    this.countries = i18n.value('countries')

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.handleError = this.handleError.bind(this)
    this.filterValidCountries = this.filterValidCountries.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      name: this.props.name,
      showComments: this.props.showComments,
      value: this.props.value,
      ...queue
    })
  }

  updateCountry(values) {
    const { value } = values
    let arr

    const capitalizedCountry = value[0].toUpperCase() + value.slice(1)
    const matchingCountries = this.filterValidCountries(value)
    if (matchingCountries.length > 0) {
      // If more than 1 matching country, keep typed value
      if (this.matchingCountries(value) > 1) {
        arr = [capitalizedCountry]
      }
      // If only matched country, keep valid value
      if (this.matchingCountries(value).length === 1) {
        arr = [this.matchingCountries(value)[0].value]
      }
    } else {
      if (Array.isArray(value)) {
        arr = capitalizedCountry
      } else {
        arr = [capitalizedCountry]
      }
    }
    this.update({ value: arr })
  }

  /**
   * Filters country names match anything in the country list
   * @param {string} country - Country Name
   */
  filterValidCountries(country) {
    const countryArray = Object.values(this.countries)
    return countryArray.filter(countryObj => {
      return countryObj.value.toLowerCase() === country.toLowerCase()
    })
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `country.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Determine if a `notfound` error is present and has a value of `false`.
    // When this happens we want to change the focus to the appropriate element
    // dependent on if this is singular or plural.
    const notfound = arr.some(
      x => x.valid === false && x.code.indexOf('notfound') !== -1
    )
    if (!this.state.showComments && notfound) {
      if (this.props.multiple) {
        this.refs.countries.refs.dropdown.refs.autosuggest.input.focus()
      } else {
        this.refs.country.refs.autosuggest.input.focus()
      }
    }
    this.setState({ showComments: notfound })

    return this.props.onError(value, arr)
  }

  /**
   * Handle the focus event.
   */
  handleFocus(event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur(event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  renderOptions() {
    const filter = this.props.excludeUnitedStates
      ? x => {
          return x !== 'unitedStates'
        }
      : () => {
          return true
        }


    const countryOptions = Object.keys(this.countries)
      .filter(filter)
      .map(x => (
        <option key={x} value={this.countries[x].value}>
          {this.countries[x].text}
        </option>
      ))

    // Check for children
    const children = this.props.children || []
    const options = countryOptions.concat(
      children.map(x => {
        if (x && x.type === 'option') {
          return x
        }
        return null
      })
    )

    if (this.props.placeholder) {
      return [
        <option key="placeholder" value="">
          {this.props.placeholder}
        </option>
      ].concat(options)
    }

    return options
  }

  appropriateValue(value, multiple = false) {
    if (!value) {
      if (multiple) {
        return []
      }
      return ''
    }

    // For the typical Dropdown component a string value is expected.
    // However, for the MultiDropdown, the value must be an array of objects.
    let simpleValue
    const isArray = Array.isArray(value)
    if (multiple) {
      if (isArray) {
        simpleValue = value
      } else {
        simpleValue = [value]
      }
    } else {
      if (isArray) {
        simpleValue = value[0]
      } else {
        simpleValue = value
      }
    }

    return simpleValue
  }

  render() {
    const klass = `country ${this.props.className || ''}`.trim()
    const options = this.renderOptions()
    const value = this.appropriateValue(this.props.value, this.props.multiple)

    return (
      <div>
        <Show when={this.props.multiple}>
          <MultipleDropdown
            name={this.props.name}
            ref="countries"
            label={this.props.label}
            placeholder={this.props.placeholder}
            className={klass}
            ariaLabel={this.props.ariaLabel}
            disabled={this.props.disabled}
            onUpdate={this.updateCountry}
            onError={this.handleError}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={value}
            required={this.props.required}>
            {options}
          </MultipleDropdown>
        </Show>
        <Show when={!this.props.multiple}>
          <Dropdown
            name={this.props.name}
            ref="country"
            label={this.props.label}
            placeholder={this.props.placeholder}
            className={klass}
            ariaLabel={this.props.ariaLabel}
            disabled={this.props.disabled}
            onUpdate={this.updateCountry}
            onError={this.handleError}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={value}
            required={this.props.required}>
            {options}
          </Dropdown>
        </Show>
        <Show when={this.state.showComments}>
          <div className="field no-margin-bottom">
            <div className="table">
              <div className="usa-alert usa-alert-error" role="alert">
                <div className="usa-alert-body">
                  <h5 className="usa-alert-heading">{i18n.t('error.country.notfound.title')}</h5>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </div>
    )
  }
}

Country.defaultProps = {
  name: 'country',
  value: [],
  multiple: false,
  showComments: false,
  excludeUnitedStates: false,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Country.errors = []
