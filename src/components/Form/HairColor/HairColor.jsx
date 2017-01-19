import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Help from '../Help'
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

  render () {
    return (
      <div className="hair-colors">
        <Help id="traits.hair.help">
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
              <i className="fa fa-ban bald" aria-hidden="true"></i>
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
              <i className="fa fa-fire black" aria-hidden="true"></i>
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
              <i className="fa fa-fire blonde" aria-hidden="true"></i>
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
              <i className="fa fa-fire brown" aria-hidden="true"></i>
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
              <i className="fa fa-fire gray" aria-hidden="true"></i>
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
              <i className="fa fa-fire red" aria-hidden="true"></i>
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
              <i className="fa fa-fire sandy" aria-hidden="true"></i>
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
              <i className="fa fa-fire white" aria-hidden="true"></i>
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
              <i className="fa fa-fire blue" aria-hidden="true"></i>
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
              <i className="fa fa-fire green" aria-hidden="true"></i>
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
              <i className="fa fa-fire orange" aria-hidden="true"></i>
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
              <i className="fa fa-fire pink" aria-hidden="true"></i>
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
              <i className="fa fa-fire purple" aria-hidden="true"></i>
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
              <i className="fa fa-question-circle unknown" aria-hidden="true"></i>
            </Checkbox>
          </CheckboxGroup>
        </Help>
      </div>
    )
  }
}
