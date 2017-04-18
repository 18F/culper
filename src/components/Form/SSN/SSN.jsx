import React from 'react'
import { i18n } from '../../../config'
import { api } from '../../../services/api'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import Text from '../Text'
import Checkbox from '../Checkbox'

export default class SSN extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      first: this.props.first || this.ripper(props.value, 0, 3),
      middle: this.props.middle || this.ripper(props.value, 3, 5),
      last: this.props.last || this.ripper(props.value, 5, 9),
      notApplicable: props.notApplicable,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: []
    }

    this.disallowClipboard = this.disallowClipboard.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = event.target.name
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'first':
        updated = {
          first: value,
          value: '' + value + this.state.middle + this.state.last
        }

        if (this.props.autotab && value.length === 3) {
          this.refs.middle.refs.text.refs.input.focus()
        }
        break

      case 'middle':
        updated = {
          middle: value,
          value: '' + this.state.first + value + this.state.last
        }

        if (this.props.autotab && value.length === 2) {
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
          notApplicable: event.target.checked
        }
        break
    }

    if (updated != null) {
      this.setState(updated, () => {
        super.handleChange(event)
        super.handleValidation(event, null, this.state.errorCodes)
        if (this.props.onUpdate) {
          this.props.onUpdate({
            first: this.state.first,
            middle: this.state.middle,
            last: this.state.last,
            verified: this.state.verified,
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
    if (!this.props.autotab) {
      super.handleKeyDown(event)
      return
    }

    let input = event.target
    let part = input.id
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
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.state.notApplicable) {
      complexStatus = true
    } else if (/* this.state.verified && */ this.state.first.length === 3 && this.state.middle.length === 2 && this.state.last.length === 4) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
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
          super.handleValidation(event, s, e)
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
   * Prevents clipboard events from making changes to the value of the elements
   */
  disallowClipboard (event) {
    event.preventDefault()
  }

  render () {
    const klass = `ssn ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Field help="identification.ssn.help"
               shrink={true}>
          <div>
            <Text name="first"
                  ref="first"
                  className="first eapp-short-input"
                  placeholder={i18n.t('identification.ssn.placeholder.first')}
                  maxlength="3"
                  pattern="^[0-9]*$"
                  value={this.state.first}
                  disabled={this.state.notApplicable}
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  onCopy={this.disallowClipboard}
                  onCut={this.disallowClipboard}
                  onPaste={this.disallowClipboard}
                  />
            <Text name="middle"
                  ref="middle"
                  className="middle eapp-short-input"
                  placeholder={i18n.t('identification.ssn.placeholder.middle')}
                  maxlength="2"
                  pattern="^[0-9]*$"
                  value={this.state.middle}
                  disabled={this.state.notApplicable}
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  onKeyDown={this.handleKeyDown}
                  onCopy={this.disallowClipboard}
                  onCut={this.disallowClipboard}
                  onPaste={this.disallowClipboard}
                  />
            <Text name="last"
                  ref="last"
                  className="last eapp-short-input"
                  placeholder={i18n.t('identification.ssn.placeholder.last')}
                  maxlength="4"
                  pattern="^[0-9]*$"
                  value={this.state.last}
                  disabled={this.state.notApplicable}
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  onKeyDown={this.handleKeyDown}
                  onCopy={this.disallowClipboard}
                  onCut={this.disallowClipboard}
                  onPaste={this.disallowClipboard}
                  />
            <div className="flags">
              <Checkbox name="notApplicable"
                        label={i18n.t('identification.ssn.label.notApplicable')}
                        ref="notApplicable"
                        toggle="false"
                        value={this.state.notApplicable}
                        checked={this.state.notApplicable}
                        onChange={this.handleChange}
                        onValidate={this.handleValidation}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        />
            </div>
          </div>
        </Field>
      </div>
    )
  }
}
