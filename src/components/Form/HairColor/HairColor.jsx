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
			</div>
          </Checkbox>
        </CheckboxGroup>
      </div>
    )
  }
}
