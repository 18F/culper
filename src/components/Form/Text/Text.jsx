import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Text extends ValidationElement {

  /**
   * Handle the change event.
   */
  handleChange(event) {
    event.persist()

    if (this.props.prefilter) {
      event.target.value === this.props.prefilter(event.target.value)
    }

    super.handleChange(event)
    this.props.onUpdate({
      value: event.target.value,
      name: this.props.name,
    })
  }

  handleError = (value, arr) => {
    if (this.props.prefix) {
      arr = arr.map(err => {
        return {
          code: `${this.props.prefix}.${err.code}`,
          valid: err.valid,
          uid: err.uid
        }
      })
    }

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render() {
    return (
        <Generic
          name={this.props.name}
          ariaLabel={this.props.ariaLabel}
          label={this.props.label}
          placeholder={this.props.placeholder}
          type="text"
          className={this.props.className}
          disabled={this.props.disabled}
          status={this.props.status}
          minlength={this.props.minlength}
          maxlength={this.props.maxlength}
          pattern={this.props.pattern}
          readonly={this.props.readonly}
          required={this.props.required}
          value={this.props.value}
          focus={this.props.focus}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onError={this.handleError}
          onKeyDown={this.props.onKeyDown}
          onCopy={this.props.onCopy}
          onCut={this.props.onCut}
          onPaste={this.props.onPaste}
          clipboard={this.props.clipboard}
          tabBack={this.props.tabBack}
          tabNext={this.props.tabNext}
          ref="text"
        />
    )
  }
}

Text.defaultProps = {
  name: 'text',
  value: '',
  prefix: '',
  required: false,
  status: true,
  prefilter: value => {
    return value
  },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Text.errors = []
