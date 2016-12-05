import React from 'react'
import ValidationElement from '../validationElement'
import Dropdown from '../Dropdown'

export default class State extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      help: props.help,
      disabled: props.disabled,
      maxlength: props.maxlength,
      pattern: props.pattern,
      readonly: props.readonly,
      required: props.required,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  render () {
    return (
      <Dropdown name={this.props.name}
                label={this.props.label}
                help={this.props.help}>
        <option value="">{this.props.placeholder}</option>
        <option value="AL">AL</option>
        <option value="AK">AK</option>
        <option value="AZ">AZ</option>
        <option value="AR">AR</option>
        <option value="CA">CA</option>
        <option value="CO">CO</option>
        <option value="CT">CT</option>
        <option value="DE">DE</option>
        <option value="DC">DC</option>
        <option value="FL">FL</option>
        <option value="GA">GA</option>
        <option value="HI">HI</option>
        <option value="ID">ID</option>
        <option value="IL">IL</option>
        <option value="IN">IN</option>
        <option value="IA">IA</option>
        <option value="KS">KS</option>
        <option value="KY">KY</option>
        <option value="LA">LA</option>
        <option value="ME">ME</option>
        <option value="MD">MD</option>
        <option value="MA">MA</option>
        <option value="MI">MI</option>
        <option value="MN">MN</option>
        <option value="MS">MS</option>
        <option value="MO">MO</option>
        <option value="MT">MT</option>
        <option value="NE">NE</option>
        <option value="NV">NV</option>
        <option value="NH">NH</option>
        <option value="NJ">NJ</option>
        <option value="NM">NM</option>
        <option value="NY">NY</option>
        <option value="NC">NC</option>
        <option value="ND">ND</option>
        <option value="OH">OH</option>
        <option value="OK">OK</option>
        <option value="OR">OR</option>
        <option value="PA">PA</option>
        <option value="RI">RI</option>
        <option value="SC">SC</option>
        <option value="SD">SD</option>
        <option value="TN">TN</option>
        <option value="TX">TX</option>
        <option value="UT">UT</option>
        <option value="VT">VT</option>
        <option value="VA">VA</option>
        <option value="WA">WA</option>
        <option value="WV">WV</option>
        <option value="WI">WI</option>
        <option value="WY">WY</option>
        <option value="AS">AS</option>
        <option value="FQ">FQ</option>
        <option value="GU">GU</option>
        <option value="HQ">HQ</option>
        <option value="DQ">DQ</option>
        <option value="JQ">JQ</option>
        <option value="KQ">KQ</option>
        <option value="MH">MH</option>
        <option value="FM">FM</option>
        <option value="MQ">MQ</option>
        <option value="BQ">BQ</option>
        <option value="MP">MP</option>
        <option value="PW">PW</option>
        <option value="LQ">LQ</option>
        <option value="PR">PR</option>
        <option value="VI">VI</option>
        <option value="WQ">WQ</option>
        { this.props.children }
      </Dropdown>
    )
  }
}
