import React from 'react'
import ValidationElement from '../ValidationElement'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class MaidenName extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value
        })
      }
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `maiden.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render () {
    const klass = `maiden-name ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <label>{this.props.label}</label>
        <RadioGroup className="option-list" selectedValue={this.state.value}>
          <Radio name="maiden-name"
                 label="Yes"
                 value="Yes"
                 className="yes"
                 disabled={this.props.disabled}
                 readonly={this.props.readonly}
                 required={this.props.required}
                 onChange={this.handleChange}
                 onError={this.handleError}
                 />
          <Radio name="maiden-name"
                 label="No"
                 value="No"
                 className="no"
                 disabled={this.props.disabled}
                 readonly={this.props.readonly}
                 required={this.props.required}
                 onChange={this.handleChange}
                 onError={this.handleError}
                 />
        </RadioGroup>
      </div>
    )
  }
}

MaidenName.defaultProps = {
  value: '',
  onError: (value, arr) => { return arr }
}

MaidenName.errors = []
