import React from 'react'
import ValidationElement from '../ValidationElement'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class MaidenName extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      focus: props.focus || false,
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
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value
        })
      }
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
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
    const klass = `maiden-name ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <label>{this.props.label}</label>
        <RadioGroup className="option-list" selectedValue={this.state.value}>
          <Radio name="maiden-name"
                 label=""
                 value="Yes"
                 className="yes"
                 disabled={this.props.disabled}
                 readonly={this.props.readonly}
                 required={this.props.required}
                 focus={this.state.focus}
                 error={this.state.error}
                 valid={this.state.valid}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 onValidate={this.handleValidation}
                 >
            Yes
          </Radio>
          <Radio name="maiden-name"
                 label=""
                 value="No"
                 className="no"
                 disabled={this.props.disabled}
                 readonly={this.props.readonly}
                 required={this.props.required}
                 focus={this.state.focus}
                 error={this.state.error}
                 valid={this.state.valid}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 onValidate={this.handleValidation}
                 >
            No
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}
