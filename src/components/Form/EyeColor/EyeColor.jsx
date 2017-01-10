import React from 'react'
import ValidationElement from '../ValidationElement'
import Help from '../Help'
import Radio from '../Radio'

export default class EyeColor extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  render () {
    return (
      <div className="eye-colors">
        <h2>Eye Color</h2>
        <Help id="traits.eye.help">
          <div className="option-list">
            <Radio name="eye-color"
                   label="Black"
                   value="Black"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Blue"
                   value="Blue"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Brown"
                   value="Brown"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Gray"
                   value="Gray"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Green"
                   value="Green"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Hazel"
                   value="Hazel"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Maroon"
                   value="Maroon"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Multicolored"
                   value="Multicolored"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Pink"
                   value="Pink"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Radio>
            <Radio name="eye-color"
                   label="Unknown"
                   value="Unknown"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidation={this.props.onValidation}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-question-circle" aria-hidden="true"></i>
            </Radio>
          </div>
        </Help>
      </div>
    )
  }
}
