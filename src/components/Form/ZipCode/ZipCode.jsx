import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class ZipCode extends ValidationElement {
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
        code: `zipcode.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr)
  }

  render() {
    return (
      <Text
        name={this.props.name}
        ref="zipcode"
        label={this.props.label}
        placeholder={this.props.placeholder}
        className={this.props.className}
        pattern="^\d{5}(?:[-\s]{0,1}\d{4})?$"
        status={this.props.status}
        required={this.props.required}
        disabled={this.props.disabled}
        value={this.state.value}
        onUpdate={this.props.onUpdate}
        onError={this.handleError}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        tabBack={this.props.tabBack}
        tabNext={this.props.tabNext}
      />
    )
  }
}

ZipCode.defaultProps = {
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false,
  status: false
}

ZipCode.errors = []
