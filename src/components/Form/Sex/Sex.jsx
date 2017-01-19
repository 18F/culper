import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Help from '../Help'
import Radio from '../Radio'

export default class Sex extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: 'sex',
      placeholder: props.placeholder,
      help: props.help,
      required: props.required,
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

  render () {
    return (
      <div className="sex">
        <Help id="traits.sex.help">
          <label>&nbsp;</label>
          <div className="options-list eapp-extend-labels">
            <Radio name={this.props.name}
                   label={i18n.t('identification.traits.sex.female')}
                   placeholder={this.state.placeholder}
                   help={this.state.help}
                   required="true"
                   value="female"
                   checked={this.state.value === 'female'}
                   error={this.state.error}
                   valid={this.state.valid}
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   >
              <i className="fa fa-venus" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label={i18n.t('identification.traits.sex.male')}
                   placeholder={this.state.placeholder}
                   help={this.state.help}
                   required="true"
                   value="male"
                   checked={this.state.value === 'male'}
                   error={this.state.error}
                   valid={this.state.valid}
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   >
              <i className="fa fa-mars" aria-hidden="true"></i>
            </Radio>
          </div>
        </Help>
      </div>
    )
  }
}
