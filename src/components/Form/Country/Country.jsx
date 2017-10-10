import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Show from '../Show'
import Textarea from '../Textarea'
import Dropdown from '../Dropdown'
import MultipleDropdown from '../MultipleDropdown'

export default class Country extends ValidationElement {
  constructor (props) {
    super(props)

    // For the typical Dropdown component a string value is expected.
    // However, for the MultiDropdown, the value must be an array of objects.
    this.state = {
      value: props.value,
      showComents: props.showComments
    }

    this.update = this.update.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      name: this.props.name,
      comments: this.props.comments,
      showComments: this.props.showComments,
      value: this.state.value,
      ...queue
    })
  }

  updateCountry (values) {
    this.update({ value: values.value })
  }

  updateComments (values) {
    this.update({
      showComments: true,
      comments: values.value
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
    arr = this.props.onError(value, arr)

    const notfound = arr.some(x => x.valid === false && x.code.indexOf('notfound') !== -1)
    const show = notfound || this.props.comments.length > 0
    if (!this.state.showComments && show) {
      if (this.props.multiple) {
        this.refs.countries.refs.dropdown.refs.autosuggest.input.focus()
      } else {
        this.refs.country.refs.autosuggest.input.focus()
      }
    }
    this.setState({showComments: show})

    return arr
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

    return (
      <div>
        <Show when={this.props.multiple}>
          <MultipleDropdown name={this.props.name}
                            ref="countries"
                            label={this.props.label}
                            placeholder={this.props.placeholder}
                            className={klass}
                            disabled={this.props.disabled}
                            onUpdate={this.updateCountry}
                            onError={this.handleError}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            value={this.props.value}
                            required={this.props.required}>
            { options }
          </MultipleDropdown>
        </Show>
        <Show when={!this.props.multiple}>
          <Dropdown name={this.props.name}
                    ref="country"
                    label={this.props.label}
                    placeholder={this.props.placeholder}
                    className={klass}
                    disabled={this.props.disabled}
                    onUpdate={this.updateCountry}
                    onError={this.handleError}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    required={this.props.required}
                    >
            { options }
          </Dropdown>
        </Show>
        <Show when={this.state.showComments}>
          <Textarea name={`${this.props.name}Comments`}
                    ref="comments"
                    label={i18n.t('country.comments')}
                    value={this.props.comments}
                    onUpdate={this.updateComments}
                    disabled={this.props.disabled}
                    required={this.props.required} />
        </Show>
      </div>
    )
  }
}

Country.defaultProps = {
  name: 'country',
  comments: '',
  showComments: false,
  excludeUnitedStates: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}

Country.errors = []
