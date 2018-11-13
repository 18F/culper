import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class EyeColor extends ValidationElement {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(values) {
    this.props.onUpdate({
      value: values.value
    })
  }

  divClass() {
    return (this.props.className || '') + ' eye-colors'
  }

  render() {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <RadioGroup
          className="option-list option-list-inline eapp-extend-labels"
          selectedValue={this.props.value}
          required={this.props.required}
          onError={this.props.onError}>
          <Radio
            name={`${this.props.name}-brown`}
            label={i18n.t('identification.traits.eye.brown')}
            value="Brown"
            className="brown"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-hazel`}
            label={i18n.t('identification.traits.eye.hazel')}
            value="Hazel"
            className="hazel"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-blue`}
            label={i18n.t('identification.traits.eye.blue')}
            value="Blue"
            className="blue"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-green`}
            label={i18n.t('identification.traits.eye.green')}
            value="Green"
            className="green"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-gray`}
            label={i18n.t('identification.traits.eye.gray')}
            value="Gray"
            className="gray"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-maroon`}
            label={i18n.t('identification.traits.eye.maroon')}
            value="Maroon"
            className="maroon"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-black`}
            label={i18n.t('identification.traits.eye.black')}
            value="Black"
            className="black"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-multi`}
            label={i18n.t('identification.traits.eye.multi')}
            value="Multicolored"
            className="multi"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-pink`}
            label={i18n.t('identification.traits.eye.pink')}
            value="Pink"
            className="pink"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
          <Radio
            name={`${this.props.name}-unknown`}
            label={i18n.t('identification.traits.eye.unknown')}
            value="Unknown"
            className="unknown"
            disabled={this.props.disabled}
            onUpdate={this.handleUpdate}
            onError={this.props.onError}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}>
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}

EyeColor.defaultProps = {
  name: 'eye',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

EyeColor.errors = []
