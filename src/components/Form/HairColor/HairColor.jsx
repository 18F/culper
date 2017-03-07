import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Checkbox from '../Checkbox'
import CheckboxGroup from '../CheckboxGroup'

export default class HairColor extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value || [],
      errors: []
    }
  }

  handleChange (event) {
    let color = event.target.value
    let selected = [...this.state.value]

    if (selected.includes(color)) {
      // Remove the color if it was previously selected
      selected.splice(selected.indexOf(color), 1)
    } else {
      // Add the color if it wasn't already
      selected.push(color)
    }

    this.setState({value: selected}, () => {
      this.handleValidation(event, null, this.state.errors)
      if (this.props.onUpdate) {
        this.props.onUpdate(selected)
      }
    })
  }

  handleValidation (event, status, errors) {
    event.persist()
    let s = null
    if (this.state.value.length > 0) {
      s = true
    }
    super.handleValidation(event, {[this.props.name]: { status: s }}, errors)
  }

  hasColor (color) {
    return this.state.value.includes(color)
  }

  divClass () {
    return (this.props.className || '') + ' hair-colors'
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <CheckboxGroup className="option-list eapp-extend-labels" selectedValues={this.state.value}>
          <Checkbox name="hair-bald"
                    label={i18n.t('identification.traits.hair.bald')}
                    value="Bald"
                    className="bald"
                    labelClass="black"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon bald">
              <Svg src="img/bald.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-black"
                    label={i18n.t('identification.traits.hair.black')}
                    value="Black"
                    className="black"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon black">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-blonde"
                    label={i18n.t('identification.traits.hair.blonde')}
                    value="Blonde"
                    className="blonde"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon blonde">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-brown"
                    label={i18n.t('identification.traits.hair.brown')}
                    value="Brown"
                    className="brown"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon brown">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-gray"
                    label={i18n.t('identification.traits.hair.gray')}
                    value="Gray"
                    className="gray"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon gray">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-red"
                    label={i18n.t('identification.traits.hair.red')}
                    value="Red"
                    className="red"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon red">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-sandy"
                    label={i18n.t('identification.traits.hair.sandy')}
                    value="Sandy"
                    className="sandy"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon sandy">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-white"
                    label={i18n.t('identification.traits.hair.white')}
                    value="White"
                    className="white"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon white">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-blue"
                    label={i18n.t('identification.traits.hair.blue')}
                    value="Blue"
                    className="blue"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon blue">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-green"
                    label={i18n.t('identification.traits.hair.green')}
                    value="Green"
                    className="green"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon green">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-orange"
                    label={i18n.t('identification.traits.hair.orange')}
                    value="Orange"
                    className="orange"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon orange">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-pink"
                    label={i18n.t('identification.traits.hair.pink')}
                    value="Pink"
                    className="pink"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon pink">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-purple"
                    label={i18n.t('identification.traits.hair.purple')}
                    value="Purple"
                    className="purple"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
              <Svg src="img/hair.svg" />
            </div>
          </Checkbox>
          <Checkbox name="hair-unknown"
                    label={i18n.t('identification.traits.hair.unknown')}
                    value="Unknown"
                    className="unknown"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon unknown">
              <Svg src="img/question.svg" />
            </div>
          </Checkbox>
        </CheckboxGroup>
      </div>
    )
  }
}
