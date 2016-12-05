import React from 'react'
import ValidationElement from '../validationElement'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import ZipCode from '../ZipCode'
import ApoFpo from '../ApoFpo'

export default class ApoFpoAddress extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
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

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.state.name + '-' + part
  }

  render () {
    return (
      <div>
        <Street name={this.partName('address1')}
                label="Mailing Address"
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                />
        <Street name={this.partName('address2')}
                label="Mailing Address 2"
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                />
        <MilitaryState name={this.partName('state')}
                       label="State"
                       onChange={this.handleChange}
                       onValidate={this.handleValidation}
                       />
        <ZipCode name={this.partName('zipcode')}
                 label="Zipcode"
                 onChange={this.handleChange}
                 onValidate={this.handleValidation}
                 />
        <ApoFpo name={this.partName('apofpo')}
                label="APO/FPO"
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                />
      </div>
    )
  }
}
