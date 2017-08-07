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

  render () {
    return (
      <RadioGroup className="employment-status option-list" selectedValue={this.state.value} required={this.props.required} onError={this.props.onError}>
        <Radio name="employment_status"
               label={i18n.t('history.employment.default.status.fullTime')}
               value="Fulltime"
               disabled={this.props.disabled}
               onChange={this.handleFieldChange}
               onError={this.props.onError}
               />
        <Radio name="employment_status"
               label={i18n.t('history.employment.default.status.partTime')}
               value="Parttime"
               disabled={this.props.disabled}
               onChange={this.handleFieldChange}
               onError={this.props.onError}
               />
      </RadioGroup>
    )
  }
}

EmploymentStatus.defaultProps = {
  onError: (value, arr) => { return arr }
}
