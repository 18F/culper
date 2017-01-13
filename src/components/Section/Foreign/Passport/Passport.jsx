import React from 'react'
import { ValidationElement, Name, RadioGroup, Radio } from '../../../Form'

export default class Passport extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Name: this.props.Name || {},
      yesNo: props.HasPassport,
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

    console.log(this.state.Name)

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
          Name: this.state.Name
        })
      }
    })
  }

  isValid () {
    if (!this.state.Name.first || !this.state.Name.last) {
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
      <Name name="name"
            {...this.state.Name}
            onUpdate={this.handleUpdate.bind(this, 'Name')}
            onValidate={this.handleValidation}
            />
    )
  }

  render () {
    return (
      <div className="passport eapp-field-wrap">
        <h2>U.S. passsport information</h2>
        <p>Provide information related to your current passport.</p>
        <div>
          Do you have a passport?
        </div>
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
