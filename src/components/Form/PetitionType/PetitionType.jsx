import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import Text from '../Text'

export default class PetitionType extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value,
      trustee: this.props.trustee
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (field, event) {
    let value = event.target.value
    this.setState({ [field]: value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        let update = {
          name: this.props.name,
          value: this.state.value,
          index: this.props.index
        }
        if (this.state.value === 'Chapter13') {
          update.trustee = this.state.trustee
        } else {
          update.trustee = ''
        }
        this.props.onUpdate(update)
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

  options () {
    return (
      <RadioGroup className="option-list" selectedValue={this.state.value}>
        <Radio name="petition_type"
          label="Chapter 7"
          value="Chapter7"
          disabled={this.props.disabled}
          onChange={this.handleChange.bind(this, 'value')}
          onValidate={this.props.onValidate}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
        <Radio name="petition_type"
          label="Chapter 11"
          value="Chapter11"
          disabled={this.props.disabled}
          onChange={this.handleChange.bind(this, 'value')}
          onValidate={this.props.onValidate}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
        <Radio name="petition_type"
          label="Chapter 13"
          value="Chapter13"
          disabled={this.props.disabled}
          onChange={this.handleChange.bind(this, 'value')}
          onValidate={this.props.onValidate}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
      </RadioGroup>
    )
  }
  render () {
    let options = this.options()
    if (this.state.value === 'Chapter13') {
      return (
        <div>
          {options}
          <Text
            name="chapter13Trustee"
            value={this.state.trustee}
            onChange={this.handleChange.bind(this, 'trustee')}
          />
        </div>
      )
    }

    return (
        <div>
          {options}
        </div>
    )
  }
}
