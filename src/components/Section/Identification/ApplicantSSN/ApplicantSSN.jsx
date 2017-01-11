import React from 'react'
import { ValidationElement, Help, Text, Checkbox } from '../../../Form'
import { api } from '../../../../services/api'

export default class ApplicantSSN extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      label: props.label,
      value: props.value,
      first: this.props.first || this.ripper(props.value, 0, 3),
      middle: this.props.middle || this.ripper(props.value, 3, 5),
      last: this.props.last || this.ripper(props.value, 5, 9),
      notApplicable: !!props.notApplicable,
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

    switch (part) {
      case 'first':
        updated = {
          first: value,
          value: '' + value + this.state.middle + this.state.last
        }
        if (value.length === 3) {
          this.refs.middle.refs.text.refs.input.focus()
        }
        break

      case 'middle':
        updated = {
          middle: value,
          value: '' + this.state.first + value + this.state.last
        }
        if (value.length === 2) {
          this.refs.last.refs.text.refs.input.focus()
        }
        break

      case 'last':
        updated = {
          last: value,
          value: '' + this.state.first + this.state.middle + value
        }
        break

      case 'notApplicable':
        updated = {
          notAapplicable: value
        }
        break
    }

    if (updated != null) {
      this.setState(updated, () => {
        super.handleChange(event)
        if (this.props.onUpdate) {
          this.props.onUpdate({
            first: this.state.first,
            middle: this.state.middle,
            last: this.state.last,
            notApplicable: this.state.notApplicable
          })
        }
      })
    } else {
      super.handleChange(event)
    }
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
    let input = event.target
    let part = this.extractPart(input.id)
    let value = input.value

    // 8  => backspace
    // 46 => delete
    let backspace = event.keyCode === 8 || event.keyCode === 46
    if (backspace && value.length < 1) {
      switch (part) {
        case 'last':
          this.refs.middle.refs.text.refs.input.focus()
          break

        case 'middle':
          this.refs.first.refs.text.refs.input.focus()
          break
      }
    }

    super.handleKeyDown(event)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, error)
    this.setState({error: status === false, valid: status === true, errorCodes: codes}, () => {
      let e = { [this.state.name]: codes }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, { ssn: { status: status } }, e)
        return
      }

      api
        .validateSSN({
          SSN: this.state.value
        })
        .then((response) => {
          // Display and assign the errors as necessary
          if (response.Errors) {
            response.Errors.forEach((e) => {
              if (e.Fieldname === 'SSN' && e.Error) {
                this.setState({help: e.Error})
              }
            })
          }
        })
        .then(() => {
          super.handleValidation(event, { ssn: { status: status } }, e)
        })
    })
  }

  ripper (val, start, end) {
    if (!val || val.length === 0 || (val.length - 1) < start) {
      return ''
    }

    if (end > (val.length)) {
      end = val.length
    }

    return val.substring(start, end)
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.props.name + '-' + part
  }

  /**
   * Returns the part name from the pull generated identifier.
   */
  extractPart (id) {
    return id.split('-').pop()
  }

  render () {
    return (
      <div className="ssn">
        <h2>U.S. Social Security Number</h2>
        <Help id="identification.ssn.help">
          <Text name={this.partName('first')}
                ref="first"
                className="first eapp-short-input"
                placeholder="000"
                maxlength="3"
                pattern="^[0-9]*$"
                help=""
                value={this.state.first}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <Text name={this.partName('middle')}
                ref="middle"
                className="middle eapp-short-input"
                placeholder="00"
                maxlength="2"
                pattern="^[0-9]*$"
                help=""
                value={this.state.middle}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.handleKeyDown}
                />
          <Text name={this.partName('last')}
                ref="last"
                className="last eapp-short-input"
                placeholder="0000"
                maxlength="4"
                pattern="^[0-9]*$"
                help=""
                value={this.state.last}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.handleKeyDown}
                />
          <div className="coupled-flags">
            <Checkbox name={this.partName('notApplicable')}
                      label="Not applicable"
                      ref="notAapplicable"
                      help=""
                      value={this.state.notApplicable}
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
