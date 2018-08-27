import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Text from '../Text'
import Checkbox from '../Checkbox'
import Show from '../Show'

const digitsOnly = (value = '') => {
  if (!value.match(/^(\s*|\d+)$/)) {
    value = value.replace(/\D/g, '')
  }
  return value
}

export default class SSN extends ValidationElement {
  constructor(props) {
    super(props)
    this.state = {
      uid: `${this.props.name}-${super.guid()}`
    }
    this.update = this.update.bind(this)
    this.updateFirst = this.updateFirst.bind(this)
    this.updateMiddle = this.updateMiddle.bind(this)
    this.updateLast = this.updateLast.bind(this)
    this.updateNotApplicable = this.updateNotApplicable.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleErrorFirst = this.handleErrorFirst.bind(this)
    this.handleErrorMiddle = this.handleErrorMiddle.bind(this)
    this.handleErrorLast = this.handleErrorLast.bind(this)
    this.handleErrorNotApplicable = this.handleErrorNotApplicable.bind(this)
    this.invalid = false
  }

  update(queue) {
    this.props.onUpdate({
      first: this.props.first,
      middle: this.props.middle,
      last: this.props.last,
      notApplicable: this.props.notApplicable,
      ...queue
    })
  }

  updateFirst(values) {
    this.update({
      first: values.value
    })
  }

  updateMiddle(values) {
    this.update({
      middle: values.value
    })
  }

  updateLast(values) {
    this.update({
      last: values.value
    })
  }

  updateNotApplicable(values) {
    this.update({
      notApplicable: values.checked
    })
  }

  handleErrorFirst(value, arr) {
    return this.handleError('first', value, arr)
  }

  handleErrorMiddle(value, arr) {
    return this.handleError('middle', value, arr)
  }

  handleErrorLast(value, arr) {
    return this.handleError('last', value, arr)
  }

  handleErrorNotApplicable(value, arr) {
    if (this.props.notApplicable) {
      // When not applicable, set other fields to valid to clear errors
      ;['first', 'middle', 'last'].forEach(code => {
        this.handleError(code, '', [
          {
            code: 'required',
            valid: true
          }
        ])
      })
      return []
    }
    return this.handleError('notApplicable', value, arr)
  }

  handleError(code, value, arr) {
    arr = (arr || []).map(err => {
      return {
        code: `ssn.${code}.${err.code}`,
        valid: err.valid
      }
    })

    const requiredErrors = arr.concat(
      this.constructor.errors.map(err => {
        return {
          code: `ssn.${err.code}`,
          valid: err.func('', this.props),
          uid: this.state.uid
        }
      })
    )

    this.invalid = requiredErrors.some(
      x => x.code === 'ssn.invalid' && x.valid === false
    )
    this.props.onError(value, requiredErrors)
    return arr
  }

  render() {
    const klass = `ssn ${this.props.className || ''} ${
      this.invalid ? 'usa-input-error' : ''
    }`.trim()
    const required = this.props.required && !this.props.notApplicable

    return (
      <div className={klass}>
        <Text
          name="first"
          ref="first"
          className="first eapp-short-input"
          placeholder={i18n.t('identification.ssn.placeholder.first')}
          maxlength="3"
          pattern="^[0-9]{3}$"
          prefilter={digitsOnly}
          clipboard={false}
          value={this.props.first}
          disabled={this.props.notApplicable}
          onUpdate={this.updateFirst}
          onError={this.handleErrorFirst}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          tabNext={() => {
            this.props.tab(this.refs.middle.refs.text.refs.input)
          }}
          required={required}
        />
        <Text
          name="middle"
          ref="middle"
          className="middle eapp-short-input"
          placeholder={i18n.t('identification.ssn.placeholder.middle')}
          maxlength="2"
          pattern="^[0-9]{2}$"
          prefilter={digitsOnly}
          clipboard={false}
          value={this.props.middle}
          disabled={this.props.notApplicable}
          onUpdate={this.updateMiddle}
          onError={this.handleErrorMiddle}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          tabBack={() => {
            this.props.tab(this.refs.first.refs.text.refs.input)
          }}
          tabNext={() => {
            this.props.tab(this.refs.last.refs.text.refs.input)
          }}
          required={required}
        />
        <Text
          name="last"
          ref="last"
          className="last eapp-short-input"
          placeholder={i18n.t('identification.ssn.placeholder.last')}
          maxlength="4"
          pattern="^[0-9]{4}$"
          prefilter={digitsOnly}
          clipboard={false}
          value={this.props.last}
          disabled={this.props.notApplicable}
          onUpdate={this.updateLast}
          onError={this.handleErrorLast}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          tabBack={() => {
            this.props.tab(this.refs.middle.refs.text.refs.input)
          }}
          required={required}
        />
        <Show when={!this.props.hideNotApplicable}>
          <div className="flags">
            <Checkbox
              name="notApplicable"
              label={i18n.t('identification.ssn.label.notApplicable')}
              className="not-applicable"
              ref="notApplicable"
              toggle="false"
              value={this.props.notApplicable}
              checked={this.props.notApplicable}
              onUpdate={this.updateNotApplicable}
              onError={this.handleErrorNotApplicable}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          </div>
        </Show>
      </div>
    )
  }
}

SSN.defaultProps = {
  name: 'ssn',
  value: '',
  first: '',
  middle: '',
  last: '',
  hideNotApplicable: false,
  notApplicable: false,
  focus: false,
  error: false,
  valid: false,
  tab: input => {
    input.focus()
  },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}

SSN.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required && props.notApplicable === false) {
        return !!props.first && !!props.middle && !!props.last
      }
      return true
    }
  },
  {
    code: 'invalid',
    func: (value, props) => {
      // Legacy system only excluded explicit values
      const fullSSN = `${props.first}-${props.middle}-${props.last}`
      const legacyInvalid = ['999-99-9999', '123-45-6789']
      if (legacyInvalid.some(x => x === fullSSN)) {
        return false
      }

      // Randomization has been introduced since 2011
      // https://www.ssa.gov/employer/randomization.html
      if (props.first) {
        const ifirst = parseInt(props.first, 10)
        const boundaries = [
          { lower: 0, upper: 0 },
          { lower: 666, upper: 666 },
          { lower: 900, upper: 999 }
        ]
        if (boundaries.some(x => x.lower <= ifirst && x.upper >= ifirst)) {
          return false
        }
      }

      return true
    }
  }
]
