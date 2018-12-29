import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ValidationElement from './../ValidationElement'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default class SelectDropdown extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${props.name}-${super.guid()}`,
      hasErrors: false,
      isValid: false,
    }
    this.checkComponentValidityAndErrors = this.checkComponentValidityAndErrors.bind(this)
    this.errors = this.errors.bind(this)
    this.getSelectClassName = this.getSelectClassName.bind(this)
    this.getWrapperClassName = this.getWrapperClassName.bind(this)
  }

  componentDidMount() {
    const { value } = this.props
    this.checkComponentValidityAndErrors(value)
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.value !== value) {
      this.checkComponentValidityAndErrors(value)
    }
  }

  checkComponentValidityAndErrors(value) {
    const errors = this.errors(value)
    this.setState({
      hasErrors: errors.some(err => err.valid === false),
      isValid: errors.every(err => err.valid === true)
    })
  }

  errors(value, props = this.props) {
    return (
      this.props.onError(
        value,
        this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: err.func(value, props),
            uid: this.state.uid
          }
        })
      )
    )
  }

  getSelectClassName() {
    const { isValid } = this.state
    const classes = []
    if (isValid) {
      classes.push('usa-input-success')
    }

    return classes.join(' ')
  }

  getWrapperClassName() {
    const { className } = this.props
    const { hasErrors } = this.state
    const classes = []
    if (className) {
      classes.push(className)
    }

    if (hasErrors) {
    classes.push('usa-input-error')
    }

    return classes.join(' ')
  }

  render() {
    const {
      children,
      isDisabled,
      name,
      onChange,
      value,
    } = this.props

    return (
      <div className={this.getWrapperClassName()}>
        <select
          className={this.getSelectClassName()}
          name={name}
          onChange={onChange}
          value={value}
          disabled={isDisabled}
        >
          {children}
        </select>
      </div>
    )
  }
}

SelectDropdown.propTypes = propTypes

SelectDropdown.defaultProps = {
  className: "",
  isDisabled: false,
  isRequired: false,
}

SelectDropdown.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.isRequired) {
        return value ? true : false
      } else {
        return value ? true: null
      }
    }
  }
]
