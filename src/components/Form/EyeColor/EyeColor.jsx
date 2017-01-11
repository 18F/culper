import React from 'react'
import ValidationElement from '../ValidationElement'
import Help from '../Help'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

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
          <label>&nbsp;</label>
          <RadioGroup className="option-list eapp-extend-labels" selectedValue={this.state.value}>
            <Radio name={this.props.name}
                   label="Black"
                   value="Black"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye black" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Blue"
                   value="Blue"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye blue" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Brown"
                   value="Brown"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye brown" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Gray"
                   value="Gray"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye gray" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Green"
                   value="Green"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye green" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Hazel"
                   value="Hazel"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye hazel" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Maroon"
                   value="Maroon"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye maroon" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Multicolored"
                   value="Multicolored"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye multi" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Pink"
                   value="Pink"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-eye pink" aria-hidden="true"></i>
            </Radio>
            <Radio name={this.props.name}
                   label="Unknown"
                   value="Unknown"
                   help={this.props.help}
                   disabled={this.props.disabled}
                   onChange={this.handleChange}
                   onValidate={this.props.onValidate}
                   onBlur={this.props.onBlur}
                   onFocus={this.props.onFocus}
                   >
              <i className="fa fa-question-circle unknown" aria-hidden="true"></i>
            </Radio>
          </RadioGroup>
        </Help>
      </div>
    )
  }
}
