import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class Sex extends ValidationElement {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleUpdate(values) {
    this.props.onUpdate({
      value: values.value
    })
  }

  handleError(value, arr) {
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

  divClass() {
    return (this.props.className || '') + ' sex'
  }

  render() {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <RadioGroup
          selectedValue={this.props.value}
          onError={this.props.onError}
          className="option-list-inline"
          required={this.props.required}>
          <Radio
            name={this.props.name}
            label={i18n.t('identification.traits.sex.female')}
            placeholder={this.props.placeholder}
            value="Female"
            className="female"
            onUpdate={this.handleUpdate}
            onError={this.handleError}>
          </Radio>
          <Radio
            name={this.props.name}
            label={i18n.t('identification.traits.sex.male')}
            placeholder={this.props.placeholder}
            value="Male"
            className="male"
            onUpdate={this.handleUpdate}
            onError={this.handleError}>
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}

Sex.defaultProps = {
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Sex.errors = []
