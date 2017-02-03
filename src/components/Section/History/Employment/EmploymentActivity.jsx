import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, Comments, DateRange, Address, Textarea, Help, HelpIcon, Radio, RadioGroup } from '../../../Form'

export default class EmploymentActivity extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  /**
   * Handle the change event.
   */
  handleFieldChange (field, event) {
    let value = event.target.value
    this.setState({ [field]: value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: value
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
      <div className="employment-activity">
        <RadioGroup name="employment_activity" className="option-list" selectedValue={this.state.value}>
          <div>Government employment</div>
          <Radio
            label="Active military duty station"
            value="ActiveMilitary"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="National Guard/Reserve"
            value="NationalGuard"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="USPHS Commisioned Corps"
            value="USPHS"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="Other federal employment"
            value="OtherFederal"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="State Government"
            value="StateGovernment"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="Federal contractor"
            value="FederalContractor"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <div>Other employment</div>
          <Radio
            label="Non-government employment"
            value="NonGovernment"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="Self-employment"
            value="SelfEmployment"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="Unemployment"
            value="Unemployment"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
          <Radio
            label="Other"
            value="Other"
            disabled={this.props.disabled}
            onChange={this.handleFieldChange.bind(this, 'value')}
            onValidate={this.props.onValidate}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
          />
        </RadioGroup>
      </div>
    )
  }
}
