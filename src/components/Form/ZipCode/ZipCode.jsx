import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class ZipCode extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }
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

  render () {
    return (
      <Text name={this.props.name}
            ref="zipcode"
            label={this.props.label}
            placeholder={this.props.placeholder}
            className={this.props.className}
            minlength="5"
            maxlength="10"
            pattern="^\d{5}(?:[-\s]\d{4})?$"
            required="true"
            value={this.state.value}
            onChange={this.handleChange}
            onError={this.props.onError}
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
  onError: (value, arr) => { return arr }
}
