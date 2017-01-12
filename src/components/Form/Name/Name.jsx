import React from 'react'
import ValidationElement from '../ValidationElement'
import Help from '../Help'
import Text from '../Text'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'
import { api } from '../../../services/api'

export default class Name extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      first: props.first,
      firstInitialOnly: props.firstInitialOnly,
      last: props.last,
      lastInitialOnly: props.lastInitialOnly,
      middle: props.middle,
      middleInitialOnly: props.middleInitialOnly,
      suffix: props.suffix,
      suffixOther: props.suffixOther,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = this.extractPart(event.target.id)
    let value = event.target.value
    let updated = null
    console.log(part)

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
      case 'firstInitialOnly':
        updated = { firstInitialOnly: event.target.checked }
        break
      case 'lastInitialOnly':
        updated = { lastInitialOnly: event.target.checked }
        break
      case 'middleInitialOnly':
        updated = { middleInitialOnly: event.target.checked }
        break

    }

    this.setState(updated, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        const {
          first,
          firstInitialOnly,
          last,
          lastInitialOnly,
          middle,
          middleInitialOnly,
          suffix,
          suffixOther
        } = this.state

        this.props.onUpdate({
          first: first,
          firstInitialOnly: firstInitialOnly,
          last: last,
          lastInitialOnly: lastInitialOnly,
          middle: middle,
          middleInitialOnly: middleInitialOnly,
          suffix: suffix,
          suffixOther: suffixOther
        })
      }
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, error)
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.state.first && this.state.last) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.state.name]: codes }
      let s = { [this.state.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)

      // api
      // .validateName({
      // Last: this.state.last,
      // First: this.state.first,
      // Middle: this.state.middle,
      // Suffix: this.state.suffix,
      // SuffixOther: this.state.suffixOther
      // })
      // .then((response) => {
      // // TODO: Display and assign the errors as necessary
      // if (response.Errors) {
      // }

      // if (response.Suggestions) {
      // }
      // })
      // .then(() => {
      // super.handleValidation(event, status)
      // })
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
      <div className="name">
        <h2>Your full name</h2>
        <Help id="identification.name.first.help">
          <Text name="first"
                label="First name"
                pattern="^[a-zA-Z\-\.' ]*$"
                maxlength="100"
                placeholder="Please enter your first name or initial"
                help="The first name (or initial) is optional but cannot exceed 100 characters"
                value={this.state.first}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
                <div className="text-right">
                  <input
                    id="firstInitialOnly"
                    type="checkbox"
                    value="firstInitial"
                    checked={this.props.firstInitialOnly}
                    onChange={this.handleChange} />
                  <label>Initial Only</label>
                </div>
        </Help>
        <Help id="identification.name.middle.help">
          <Text name="middle"
                label="Middle name or initial"
                minlength="0"
                maxlength="100"
                placeholder="Please enter your middle name or initial"
                help="The middle name (or initial) is optional but cannot exceed 100 characters"
                value={this.state.middle}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
                <div className="text-right">
                  <input
                    id="middleInitialOnly"
                    type="checkbox"
                    value="middleInitial"
                    checked={this.props.middleInitialOnly}
                    onChange={this.handleChange} />
                  <label>Initial Only</label>
                </div>
        </Help>
        <Help id="identification.name.last.help">
          <Text name="last"
                label="Last name"
                maxlength="100"
                pattern="^[a-zA-Z\-\.' ]*$"
                placeholder="Please enter your last name"
                help="The last name is required, cannot exceed 100 characters, and we only support letters, hyphens (-), periods (.), apostrophes ('), and spaces."
                value={this.state.last}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
                <div className="text-right">
                  <input
                    id="lastInitialOnly"
                    type="checkbox"
                    value="lastInitial"
                    checked={this.props.lastInitialOnly}
                    onChange={this.handleChange} />
                  <label>Initial Only</label>
                </div>
        </Help>
        <Help id="identification.name.suffix.help">
          <label>Suffix</label>

          <RadioGroup className="option-list" selectedValue={this.state.suffix}>
            <Radio name="suffix"
              label="None"
              value="None"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="Jr"
              value="Jr"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="Sr"
              value="Sr"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="I"
              value="I"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="II"
              value="II"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="III"
              value="III"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="IV"
              value="IV"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="V"
              value="V"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="VI"
              value="VI"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="VII"
              value="VII"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="VIII"
              value="VIII"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="IX"
              value="IX"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="X"
              value="X"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            <Radio name="suffix"
              label="Other"
              value="Other"
              onChange={this.handleChange}
              onValidate={this.handleValidation}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          </RadioGroup>
          <div className={this.suffixOtherClass()}>
            <Text name="suffixOther"
                  label="Other"
                  maxlength="100"
                  value={this.state.suffixOther}
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
          </div>
        </Help>
      </div>
    )
  }
}
