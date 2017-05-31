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
      notApplicable: props.notApplicable
    }

    this.handleError = this.handleError.bind(this)
    this.handleErrorFirst = this.handleErrorFirst.bind(this)
    this.handleErrorMiddle = this.handleErrorMiddle.bind(this)
    this.handleErrorLast = this.handleErrorLast.bind(this)
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
        break

      case 'middle':
        updated = {
          middle: value,
          value: '' + this.state.first + value + this.state.last
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

  handleErrorFirst (value, arr) {
    return this.handleError('first', value, arr)
  }

  handleErrorMiddle (value, arr) {
    return this.handleError('middle', value, arr)
  }

  handleErrorLast (value, arr) {
    return this.handleError('last', value, arr)
  }

  handleError (code, value, arr) {
    arr = (arr || []).map(err => {
      return {
        code: `ssn.${code}.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
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

  render () {
    const klass = `ssn ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Text name="first"
              ref="first"
              className="first eapp-short-input"
              placeholder={i18n.t('identification.ssn.placeholder.first')}
              maxlength="3"
              pattern="^[0-9]{3}$"
              clipboard={false}
              value={this.state.first}
              disabled={this.state.notApplicable}
              onChange={this.handleChange}
              onError={this.handleErrorFirst}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              tabNext={() => { this.props.tab(this.refs.middle.refs.text.refs.input) }}
              />
        <Text name="middle"
              ref="middle"
              className="middle eapp-short-input"
              placeholder={i18n.t('identification.ssn.placeholder.middle')}
              maxlength="2"
              pattern="^[0-9]{2}$"
              clipboard={false}
              value={this.state.middle}
              disabled={this.state.notApplicable}
              onChange={this.handleChange}
              onError={this.handleErrorMiddle}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              tabBack={() => { this.props.tab(this.refs.first.refs.text.refs.input) }}
              tabNext={() => { this.props.tab(this.refs.last.refs.text.refs.input) }}
              />
        <Text name="last"
              ref="last"
              className="last eapp-short-input"
              placeholder={i18n.t('identification.ssn.placeholder.last')}
              maxlength="4"
              pattern="^[0-9]{4}$"
              clipboard={false}
              value={this.state.last}
              disabled={this.state.notApplicable}
              onChange={this.handleChange}
              onError={this.handleErrorLast}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              tabBack={() => { this.props.tab(this.refs.middle.refs.text.refs.input) }}
              />
        <div className="flags">
          <Checkbox name="notApplicable"
                    label={i18n.t('identification.ssn.label.notApplicable')}
                    ref="notApplicable"
                    toggle="false"
                    value={this.state.notApplicable}
                    checked={this.state.notApplicable}
                    onChange={this.handleChange}
                    onError={this.handleError}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    />
        </div>
      </div>
    )
  }
}

SSN.defaultProps = {
  value: '',
  first: '',
  middle: '',
  last: '',
  notApplicable: false,
  focus: false,
  error: false,
  valid: false,
  tab: (input) => { input.focus() },
  onError: (value, arr) => { return arr }
}

SSN.errors = []
