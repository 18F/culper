import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class ApoFpo extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleError = this.handleError.bind(this)
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `apofpo.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr)
  }

  render () {
    const klass = `apofpo ${this.props.className || ''}`.trim()
    return (
      <Dropdown name={this.props.name}
                label={this.props.label}
                placeholder={this.props.placeholder}
                className={this.props.className}
                disabled={this.props.disabled}
                onChange={this.props.onChange}
                onError={this.handleError}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                value={this.props.value}
                required={this.props.required}
                tabBack={this.props.tabBack}
                tabNext={this.props.tabNext}
                receiveProps={false}>
        <option key="AA" value="AA">AA</option>
        <option key="AE" value="AE">AE</option>
        <option key="AP" value="AP">AP</option>
      </Dropdown>
    )
  }
}
      // <Text name={this.props.name}
      //       label={this.props.label}
      //       className={klass}
      //       placeholder={this.props.placeholder}
      //       maxlength="2"
      //       pattern="[a-zA-Z]{2}"
      //       value={this.props.value}
      //       onChange={this.props.onChange}
      //       onError={this.handleError}
      //       tabBack={this.props.tabBack}
      //       tabNext={this.props.tabNext}
      //       required={this.props.required}
      //       />

ApoFpo.defaultProps = {
  tabBack: () => {},
  tabNext: () => {},
  onError: (value, arr) => { return arr },
  required: false
}

ApoFpo.errors = []
