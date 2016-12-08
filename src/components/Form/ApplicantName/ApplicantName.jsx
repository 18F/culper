import React from 'react'
import ValidationElement from '../validationElement'
import Text from '../Text'
import Dropdown from '../Dropdown'
import { api } from '../../../services/api'

export default class Address extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      value: props.value,
      firstname: '',
      lastname: '',
      middlename: '',
      suffix: '',
      suffixOther: '',
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = this.extractPart(event.target.id)
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'first':
        updated = { first: value }
        break
      case 'last':
        updated = { last: value }
        break
      case 'middle':
        updated = { middle: value }
        break
      case 'suffix':
        updated = { suffix: value }
        break
      case 'suffixOther':
        updated = { suffixOther: value }
        break
    }

    this.setState(updated, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, status)
        return
      }
    })
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.state.name + '-' + part
  }

  /**
   * Returns the part name from the pull generated identifier.
   */
  extractPart (id) {
    return id.split('-').pop()
  }

  render () {
    if (this.state.suffix === 'Other') {
      return (
        <div>
          <Text name={this.partName('first')}
                label="First name"
                value={this.state.firstname}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <Text name={this.partName('last')}
                label="Last name"
                value={this.state.lastname}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <Text name={this.partName('middle')}
                label="Middle initial"
                value={this.state.middlename}
                minlength="0"
                maxlength="1"
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <Dropdown name={this.partName('suffix')}
                    label="Suffix"
                    value={this.state.suffix}
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    >
            <option value=""></option>
            <option value="Jr">Jr</option>
            <option value="Sr">Sr</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
            <option value="VI">VI</option>
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="Other">Other</option>
          </Dropdown>
          <Text name={this.partName('suffixOther')}
                label="Other"
                value={this.state.suffixOther}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        </div>
      )
    }

    return (
      <div>
        <Text name={this.partName('first')}
              label="First name"
              value={this.state.firstname}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <Text name={this.partName('last')}
              label="Last name"
              value={this.state.lastname}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <Text name={this.partName('middle')}
              label="Middle initial"
              minlength="0"
              maxlength="1"
              value={this.state.middlename}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <Dropdown name={this.partName('suffix')}
                  label="Suffix"
                  value={this.state.suffix}
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  >
          <option value=""></option>
          <option value="Jr">Jr</option>
          <option value="Sr">Sr</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
          <option value="V">V</option>
          <option value="VI">VI</option>
          <option value="VII">VII</option>
          <option value="VIII">VIII</option>
          <option value="IX">IX</option>
          <option value="X">X</option>
          <option value="Other">Other</option>
        </Dropdown>
      </div>
    )
  }
}
