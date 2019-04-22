import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class Street extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `street.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  label() {
    if (this.props.label && this.props.optional) {
      return (
        <span>
          {this.props.label}
          <span className="optional">
            {i18n.t('address.us.street2.optional')}
          </span>
        </span>
      )
    }

    return this.props.label
  }

  render() {
    const label = this.label()
    const props = {
      name: this.props.name,
      className: this.props.className,
      label,
      placeholder: this.props.placeholder,
      value: this.state.value,
      onUpdate: this.props.onUpdate,
      onError: this.handleError,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      required: this.props.required,
      disabled: this.props.disabled,
    }

    if (!this.props.isPoBoxAllowed) {
      props.pattern = '^((?!PO Box|P.O. Box|Post Office Box).)*$'
      props.prefix = 'poBox'
      props.regexFlags = 'i'
    }

    return (
      <Text {...props} />
    )
  }
}

Street.defaultProps = {
  value: '',
  label: '',
  optional: false,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Street.errors = []
