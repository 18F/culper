import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Number from '../Number'

export default class Height extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      feet: props.feet,
      inches: props.inches,
      error: props.error,
      valid: props.valid,
      errors: []
    }

    this.handleError = this.handleError.bind(this)
    this.handleErrorFeet = this.handleErrorFeet.bind(this)
    this.handleErrorInches = this.handleErrorInches.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange(field, event) {
    this.setState({ [field]: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          feet: this.state.feet,
          inches: this.state.inches
        })
      }
    })
  }

  handleErrorFeet(value, arr) {
    return this.handleError('feet', value, arr)
  }

  handleErrorInches(value, arr) {
    return this.handleError('inches', value, arr)
  }

  handleError(code, value, arr) {
    arr = arr.map(err => {
      return {
        code: `height.${code}.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    const requiredErrors = arr.concat(
      this.constructor.errors.map(err => {
        return {
          code: `height.${err.code}`,
          valid: err.func({ ...this.state }, this.props),
          uid: this.state.uid
        }
      })
    )

    // Take the original and concatenate our new error values to it
    this.props.onError(value, requiredErrors)
    return arr
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

  /**
   * Generated name for the part of the address elements.
   */
  partName(part) {
    return '' + this.props.name + '-' + part
  }

  render() {
    return (
      <div className="height">
        <div className="feet">
          <Number
            id={this.partName('feet')}
            name="feet"
            ref="feet"
            label={i18n.t('identification.traits.label.feet')}
            placeholder={i18n.t('identification.traits.placeholder.feet')}
            disabled={this.props.disabled}
            max="9"
            maxlength="1"
            min="1"
            readonly={this.props.readonly}
            required={this.props.required}
            step="1"
            value={this.state.feet}
            onChange={this.handleChange.bind(this, 'feet')}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onError={this.handleErrorFeet}
            tabNext={() => {
              this.props.tab(this.refs.inches.refs.number.refs.input)
            }}
          />
        </div>
        <div className="inches">
          <Number
            id={this.partName('inches')}
            name="inches"
            ref="inches"
            label={i18n.t('identification.traits.label.inches')}
            placeholder={i18n.t('identification.traits.placeholder.inches')}
            disabled={this.props.disabled}
            max="11"
            maxlength="2"
            min="0"
            readonly={this.props.readonly}
            required={this.props.required}
            step="1"
            value={this.state.inches}
            onChange={this.handleChange.bind(this, 'inches')}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onError={this.handleErrorInches}
            tabBack={() => {
              this.props.tab(this.refs.feet.refs.number.refs.input)
            }}
          />
        </div>
      </div>
    )
  }
}

Height.defaultProps = {
  feet: '',
  inches: '',
  error: false,
  valid: false,
  tab: input => {
    input.focus()
  },
  onError: (value, arr) => {
    return arr
  },
  required: false
}

Height.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!value.feet && !!value.inches
      }
      return true
    }
  }
]
