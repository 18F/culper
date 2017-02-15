import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class EyeColor extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  divClass () {
    return (this.props.className || '') + ' eye-colors'
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <RadioGroup className="option-list eapp-extend-labels" selectedValue={this.state.value}>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.black')}
                 value="Black"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon black">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.blue')}
                 value="Blue"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon blue">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.brown')}
                 value="Brown"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon brown">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.gray')}
                 value="Gray"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon gray">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.green')}
                 value="Green"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon green">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.hazel')}
                 value="Hazel"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon hazel">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.maroon')}
                 value="Maroon"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon maroon">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.multi')}
                 value="Multicolored"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon multi">
              <Svg src="img/eye-multicolor.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.pink')}
                 value="Pink"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon pink">
              <Svg src="img/eye.svg" />
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.eye.unknown')}
                 value="Unknown"
                 disabled={this.props.disabled}
                 onChange={this.handleChange}
                 onValidate={this.props.onValidate}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 >
            <div className="eye-icon unknown">
              <Svg src="img/question.svg" />
            </div>
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}
