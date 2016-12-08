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
      first: props.first,
      last: props.last,
      middle: props.middle,
      suffix: props.suffix,
      suffixOther: props.suffixOther,
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

      api
        .validateApplicantName({
          Last: this.state.last,
          First: this.state.first,
          Middle: this.state.middle,
          Suffix: this.state.suffix,
          SuffixOther: this.state.suffixOther
        })
        .then((response) => {
          // TODO: Display and assign the errors as necessary
          if (response.Errors) {
          }

          if (response.Suggestions) {
          }
        })
        .then(() => {
          super.handleValidation(event, status)
        })
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

  /**
   * Toggles visibility class for the extended suffix element.
   */
  suffixOtherClass () {
    return this.state.suffix === 'Other'
      ? ''
      : 'hidden'
  }

  render () {
    return (
      <div>
        <Text name={this.partName('last')}
              label="Last name"
              maxlength="100"
              pattern="^[a-zA-Z\-\.' ]*$"
              help="The last name is required, cannot exceed 100 characters, and we only support letters, hyphens (-), periods (.), apostrophes ('), and spaces."
              value={this.state.last}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <Text name={this.partName('first')}
              label="First name"
              maxlength="100"
              help="The first name (or initial) is optional but cannot exceed 100 characters"
              value={this.state.first}
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              />
        <Text name={this.partName('middle')}
              label="Middle name or initial"
              minlength="0"
              maxlength="100"
              help="The middle name (or initial) is optional but cannot exceed 100 characters"
              value={this.state.middle}
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
        <div className={this.suffixOtherClass()}>
          <Text name={this.partName('suffixOther')}
                label="Other"
                maxlength="100"
                value={this.state.suffixOther}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
        </div>
      </div>
    )
  }
}
