import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Svg from '../Svg'
import Radio from '../Radio'

export default class Sex extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value,
      error: props.error || false,
      valid: props.valid || false
    }
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

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  divClass () {
    return (this.props.className || '') + ' sex'
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label>{this.props.label}</label>
        <div className="options-list eapp-extend-labels">
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
                 onValidate={this.handleValidation}
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
                 onValidate={this.handleValidation}
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
