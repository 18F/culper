import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Radio, RadioGroup } from '../../../Form'

export default class EmploymentStatus extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleFieldChange (values) {
    this.props.onUpdate({
      name: this.props.name,
      value: values.value
    })
  }

  render () {
    return (
      <RadioGroup className="employment-status option-list"
                  selectedValue={this.props.value}
                  required={this.props.required}
                  onError={this.props.onError}>
        <Radio name="employment_status"
               label={i18n.t('history.employment.default.status.fullTime')}
               value="FullTime"
               className="fulltime"
               disabled={this.props.disabled}
               onUpdate={this.handleFieldChange}
               onError={this.props.onError}
               />
        <Radio name="employment_status"
               label={i18n.t('history.employment.default.status.partTime')}
               value="PartTime"
               className="parttime"
               disabled={this.props.disabled}
               onUpdate={this.handleFieldChange}
               onError={this.props.onError}
               />
      </RadioGroup>
    )
  }
}

EmploymentStatus.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
