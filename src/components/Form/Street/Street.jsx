import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class Street extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  handleError (value, arr) {
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

  label () {
    if (this.props.label && this.props.optional) {
      return (
        <span>
          {this.props.label}
          <span className="optional">{i18n.t('address.us.street2.optional')}</span>
        </span>
      )
    }

    return this.props.label
  }

  render () {
    return (
      <Text name={this.props.name}
            className={this.props.className}
            label={this.label()}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}
            onError={this.handleError}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            required={this.props.required}
            />
    )
  }
}

Street.defaultProps = {
  value: '',
  label: '',
  optional: false,
  onError: (value, arr) => { return arr }
}

Street.errors = []
