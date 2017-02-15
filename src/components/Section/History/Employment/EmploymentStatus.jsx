import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Radio, RadioGroup } from '../../../Form'

export default class EmploymentStatus extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleFieldChange (event) {
    let value = event.target.value
    this.setState({ value: value }, () => {
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
    return (
      <RadioGroup className="employment-status option-list" selectedValue={this.state.value}>
        <Radio name="employment_status"
          label={i18n.t('history.employment.status.fullTime')}
          value="Fulltime"
          disabled={this.props.disabled}
          onChange={this.handleFieldChange}
          onValidate={this.props.onValidate}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
        <Radio name="employment_status"
          label={i18n.t('history.employment.status.partTime')}
          value="Parttime"
          disabled={this.props.disabled}
          onChange={this.handleFieldChange}
          onValidate={this.props.onValidate}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
      </RadioGroup>
    )
  }
}
