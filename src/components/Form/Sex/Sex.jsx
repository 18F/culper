import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

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
        this.props.onUpdate({
          value: this.state.value
        })
      }
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `sex.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  divClass () {
    return (this.props.className || '') + ' sex'
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <RadioGroup
          selectedValue={this.state.value}
          onError={this.props.onError}
          required={this.props.required}>
          <Radio name={this.props.name}
            label={i18n.t('identification.traits.sex.female')}
            placeholder={this.props.placeholder}
            value="female"
            className="female"
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onError={this.handleError}>
            <div className="sex-icon">
              <Svg src="/img/female.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
            label={i18n.t('identification.traits.sex.male')}
            placeholder={this.props.placeholder}
            value="male"
            className="male"
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onError={this.handleError}>
            <div className="sex-icon">
              <Svg src="/img/male.svg" />
            </div>
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}

Sex.defaultProps = {
  value: '',
  onError: (value, arr) => { return arr }
}

Sex.errors = []
