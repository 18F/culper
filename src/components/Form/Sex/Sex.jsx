import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'

export default class Sex extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `sex.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  divClass () {
    return (this.props.className || '') + ' sex'
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <div className="blocks">
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.sex.female')}
                 placeholder={this.props.placeholder}
                 required="true"
                 value="female"
                 className="female"
                 checked={this.state.value === 'female'}
                 error={this.state.error}
                 valid={this.state.valid}
                 onChange={this.handleChange}
                 onError={this.handleError}
                 >
            <div className="sex-icon">
              <Svg src="img/female.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.sex.male')}
                 placeholder={this.props.placeholder}
                 required="true"
                 value="male"
                 className="male"
                 checked={this.state.value === 'male'}
                 error={this.state.error}
                 valid={this.state.valid}
                 onChange={this.handleChange}
                 onError={this.handleError}
                 >
            <div className="sex-icon">
              <Svg src="img/male.svg" />
            </div>
          </Radio>
        </div>
      </div>
    )
  }
}

Sex.defaultProps = {
  value: '',
  onError: (value, arr) => { return arr }
}

Sex.errors = []
