import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
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
        <label>&nbsp;</label>
        <CheckboxGroup className="option-list eapp-extend-labels" selectedValues={this.state.value}>
          <Checkbox name="hair-bald"
                    label={i18n.t('identification.traits.hair.bald')}
                    value="Bald"
                    labelClass="black"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 30.9 36.8">
					<path id="hair-color-bald" d="M0,18.8C0,10.3,6.9,3.4,15.4,3.4s15.4,6.9,15.4,15.4H0z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-black"
                    label={i18n.t('identification.traits.hair.black')}
                    value="Black"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-black"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-blonde"
                    label={i18n.t('identification.traits.hair.blonde')}
                    value="Blonde"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-blonde"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-brown"
                    label={i18n.t('identification.traits.hair.brown')}
                    value="Brown"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-brown"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-gray"
                    label={i18n.t('identification.traits.hair.gray')}
                    value="Gray"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-gray"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-red"
                    label={i18n.t('identification.traits.hair.red')}
                    value="Red"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-red"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-sandy"
                    label={i18n.t('identification.traits.hair.sandy')}
                    value="Sandy"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-sandy"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-white"
                    label={i18n.t('identification.traits.hair.white')}
                    value="White"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-white"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-blue"
                    label={i18n.t('identification.traits.hair.blue')}
                    value="Blue"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-blue"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-green"
                    label={i18n.t('identification.traits.hair.green')}
                    value="Green"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-green"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-orange"
                    label={i18n.t('identification.traits.hair.orange')}
                    value="Orange"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-orange"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-pink"
                    label={i18n.t('identification.traits.hair.pink')}
                    value="Pink"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-pink"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-purple"
                    label={i18n.t('identification.traits.hair.purple')}
                    value="Purple"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 18 32" enable-background="new 0 0 18 32">
					<path id="hair-color-purple"
						d="M9,26.37c0,1.41,0.7,3.28,1.35,4.5l-0.08-0.02l0.02,0.02C4.74,28.32,0,24.8,0,18.01c0-7.7,9-8.38,9-13.5
						C9,3.1,8.3,1.23,7.68,0l0.06,0.02L7.72,0c5.55,2.55,10.29,6.07,10.29,12.86C18.01,20.56,9,21.24,9,26.37z"/>
				</svg>
			</div>
          </Checkbox>
          <Checkbox name="hair-unknown"
                    label={i18n.t('identification.traits.hair.unknown')}
                    value="Unknown"
                    help={this.props.help}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    >
            <div className="hair-icon">
				<svg viewBox="0 0 30.86 36.84">
					<path id="hair-color-unknown" d="M15.43,34.25C6.91,34.25,0,27.34,0,18.82C0,10.3,6.91,3.39,15.43,3.39s15.43,6.91,15.43,15.43
						C30.87,27.34,23.95,34.25,15.43,34.25z M15.84,8.53c-3.28,0-5.73,1.41-7.46,4.28c-0.18,0.28-0.1,0.64,0.16,0.84l2.65,2.01
						c0.1,0.08,0.24,0.12,0.38,0.12c0.18,0,0.38-0.08,0.5-0.24c0.94-1.21,1.35-1.57,1.73-1.85c0.34-0.24,1-0.48,1.73-0.48
						c1.29,0,2.47,0.82,2.47,1.71c0,1.04-0.54,1.57-1.77,2.13c-1.43,0.64-3.38,2.31-3.38,4.26v0.72c0,0.36,0.28,0.64,0.64,0.64h3.86
						c0.36,0,0.64-0.28,0.64-0.64c0-0.46,0.58-1.45,1.53-1.99c1.53-0.87,3.62-2.03,3.62-5.08C23.15,11.28,19.29,8.53,15.84,8.53z
						 M18.01,24.61c0-0.36-0.28-0.64-0.64-0.64H13.5c-0.36,0-0.64,0.28-0.64,0.64v3.86c0,0.36,0.28,0.64,0.64,0.64h3.86
						c0.36,0,0.64-0.28,0.64-0.64V24.61z"/>
				</svg>
			</div>
          </Checkbox>
        </CheckboxGroup>
      </div>
    )
  }
}
