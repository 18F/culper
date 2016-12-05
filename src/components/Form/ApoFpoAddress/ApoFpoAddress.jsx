import React from 'react'
import Street from '../Street'
import MilitaryState from '../MilitaryState'
import ZipCode from '../ZipCode'
import ApoFpo from '../ApoFpo'

export default class ApoFpoAddress extends React.Component {
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

    this.handleChange = this.handleChange.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({
      error: status === false,
      valid: status === true
    })

    if (this.props.onValidation) {
      this.props.onValidation(status)
    }
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
                onValidation={this.handleValidation}
                />
        <Street name={this.partName('address2')}
                label="Mailing Address 2"
                onChange={this.handleChange}
                onValidation={this.handleValidation}
                />
        <MilitaryState name={this.partName('state')}
                       label="State"
                       onChange={this.handleChange}
                       onValidation={this.handleValidation}
                       />
        <ZipCode name={this.partName('zipcode')}
                 label="Zipcode"
                 onChange={this.handleChange}
                 onValidation={this.handleValidation}
                 />
        <ApoFpo name={this.partName('apofpo')}
                label="APO/FPO"
                onChange={this.handleChange}
                onValidation={this.handleValidation}
                />
      </div>
    )
  }
}
