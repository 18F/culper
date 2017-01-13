import React from 'react'
import { ValidationElement, Text, Name, DateControl, RadioGroup, Radio } from '../../../Form'

export default class Passport extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Name: this.props.Name || {},
      Number: this.props.Number || '',
      Issued: this.props.Issued || {},
      Expiration: this.props.Expiration || {},
      yesNo: props.HasPassport,
      re: '^([a-zA-Z0-9]{6,9})+$',
      error: false,
      valid: false,
      errorCodes: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  /**
   * Handle the update event.
   */
  handleUpdate (field, values) {
    this.setState({ [field]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Name: this.state.Name,
          Number: this.state.Number,
          Issued: this.state.Issued,
          Expiration: this.state.Expiration
        })
      }
    })
  }

  isValid () {
    if (!this.state.Name.first || !this.state.Name.last) {
      return false
    }

    let re = new RegExp(this.state.re)
    if (!re.test(this.state.Number)) {
      return false
    }

    if (!this.isValidEstimatedDate(this.state.Issued)) {
      return false
    }

    if (!this.isValidEstimatedDate(this.state.Expiration)) {
      return false
    }

    if (this.state.Expiration.date < this.state.Issued.date) {
      return false
    }

    return true
  }

  isValidEstimatedDate (obj) {
    let month = parseInt(obj.month || '1')
    let day = parseInt(obj.day || '1')
    let year = parseInt(obj.year)
    // let estimated = obj.estimated

    if (month < 1 && month > 12) {
      return false
    }

    if (day < 1 && day > 31) {
      return false
    }

    if (year < 1) {
      return false
    }

    return true
  }

  /**
   * Handle when the yes/no option has been changed
   */
  yesNoClicked (val) {
    this.setState({ yesNo: val }, () => {
      if (val === 'Yes') {
      }
    })
  }

  /**
   * Render children only when we explicit state there is passport information
   */
  visibleComponents () {
    if (this.state.yesNo !== 'Yes') {
      return ''
    }

    return (
      <div>
        <Name name="name"
              {...this.state.Name}
              onUpdate={this.handleUpdate.bind(this, 'Name')}
              onValidate={this.handleValidation}
              />
        <h2>Provide your U.S. passport number</h2>
        <Text name="number"
              value={this.state.Number}
              pattern={this.state.re}
              maxlength="9"
              onUpdate={this.handleUpdate.bind(this, 'Number')}
              onValidate={this.handleValidation}
              />
        <h2>Provide the issue date of the passport</h2>
        <DateControl name="issued"
                     {...this.state.Issued}
                     onUpdate={this.handleUpdate.bind(this, 'Issued')}
                     onValidate={this.handleValidation}
                     />
        <h2>Provide the expiration date of the passport</h2>
        <DateControl name="expiration"
                     {...this.state.Expiration}
                     onUpdate={this.handleUpdate.bind(this, 'Expiration')}
                     onValidate={this.handleValidation}
                     />
      </div>
    )
  }

  render () {
    return (
      <div className="passport eapp-field-wrap">
        <h2>U.S. passsport information</h2>
        <p>
          Provide the following information for the most recent U.S. passport you currently possess.<br />
          <a href="https://travel.state.gov/content/travel/en.html" target="_blank" title="U.S. State Department Help">
            U.S. State Department passport help
          </a>
        </p>
        <p>
          Do you possess a U.S. passport (current or expired)?
        </p>
        <RadioGroup className="option-list" selectedValue={this.state.yesNo}>
          <Radio name="has_passport"
                 label="Yes"
                 value="Yes"
                 onChange={this.yesNoClicked.bind(this, 'Yes')}
                 onValidate={this.handleValidation}
                 />
          <Radio name="has_passport"
                 label="No"
                 value="No"
                 onChange={this.yesNoClicked.bind(this, 'No')}
                 onValidate={this.handleValidation}
                 />
        </RadioGroup>
        {this.visibleComponents()}
      </div>
    )
  }
}
