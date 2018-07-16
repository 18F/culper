import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Text extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.prefilter(props.value)
    }

    this.handleError = this.handleError.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.value === nextProps.value) {
      return
    }
    this.setState({ value: this.props.prefilter(nextProps.value) })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    this.setState({ value: this.props.prefilter(event.target.value) }, () => {
      super.handleChange(event)
      this.props.onUpdate({
        value: this.state.value,
        name: this.props.name
      })
    })
  }

  handleError (value, arr) {
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

  render () {
    return (
      <Generic name={this.props.name}
               label={this.props.label}
               ariaLabel={this.props.ariaLabel}
               placeholder={this.props.placeholder}
               type="text"
               className={this.props.className}
               disabled={this.props.disabled}
               minlength={this.props.minlength}
               maxlength={this.props.maxlength}
               pattern={this.props.pattern}
               readonly={this.props.readonly}
               required={this.props.required}
               value={this.state.value}
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
  prefilter: (value) => { return value },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}

Text.errors = []
