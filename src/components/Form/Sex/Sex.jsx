import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
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
                 help={this.props.help}
                 required="true"
                 value="female"
                 checked={this.state.value === 'female'}
                 error={this.state.error}
                 valid={this.state.valid}
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 >
            <div className="sex-icon">
              <svg viewBox="0 0 50.81 79.19">
                <path id="sex-icon-female" d="M50.81,25.4C50.81,11.37,39.43,0,25.4,0S0,11.37,0,25.4c0,12.32,8.77,22.59,20.4,24.91v9.09h-9.79v10h9.79v9.79
                                              h10V69.4h9.79v-10H30.4v-9.09C42.04,47.99,50.81,37.72,50.81,25.4z M10,25.4C10,16.91,16.91,10,25.4,10s15.4,6.91,15.4,15.4
                                              s-6.91,15.4-15.4,15.4S10,33.9,10,25.4z"/>
              </svg>
            </div>
          </Radio>
          <Radio name={this.props.name}
                 label={i18n.t('identification.traits.sex.male')}
                 placeholder={this.props.placeholder}
                 help={this.props.help}
                 required="true"
                 value="male"
                 checked={this.state.value === 'male'}
                 error={this.state.error}
                 valid={this.state.valid}
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 >
            <div className="sex-icon">
              <svg viewBox="-10 -10 80 80">
                <path id="sex-icon-male" d="M62.77,0.12V0H37.69v10h8.64l-6.4,6.4c-4.35-3.04-9.43-4.56-14.52-4.56c-6.5,0-13,2.48-17.96,7.44
                                            c-9.92,9.92-9.92,26.01,0,35.93c4.96,4.96,11.46,7.44,17.96,7.44c6.5,0,13-2.48,17.96-7.44c8.58-8.58,9.73-21.76,3.48-31.58
                                            l6.05-6.05v7.64h10V0.12H62.77z M36.3,48.14c-2.91,2.91-6.78,4.51-10.89,4.51c-4.11,0-7.98-1.6-10.89-4.51
                                            C11.6,45.23,10,41.36,10,37.24c0-4.11,1.6-7.98,4.51-10.89s6.78-4.51,10.89-4.51c4.11,0,7.98,1.6,10.89,4.51s4.51,6.78,4.51,10.89
                                            C40.81,41.36,39.21,45.23,36.3,48.14z"/>
              </svg>
            </div>
          </Radio>
        </div>
      </div>
    )
  }
}
