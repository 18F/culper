import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class ApoFpo extends ValidationElement {
  render () {
    const klass = `apofpo ${this.props.className || ''}`.trim()
    return (
      <Text name={this.props.name}
            label={this.props.label}
            className={klass}
            placeholder={this.props.placeholder}
            minlength="2"
            maxlength="2"
            required="true"
            pattern="[a-zA-Z]+"
            value={this.props.value}
            error={this.props.error}
            valid={this.props.valid}
            onChange={this.props.onChange}
            onValidate={this.props.onValidate}
            tabBack={this.props.tabBack}
            tabNext={this.props.tabNext}
            />
    )
  }
}
