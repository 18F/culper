import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class State extends ValidationElement {
  render () {
    return (
      <Dropdown name={this.props.name}
                label={this.props.label}
                help="State is required"
                placeholder={this.props.placeholder}
                className={this.props.className}
                disabled={this.props.disabled}
                onChange={this.props.onChange}
                onValidate={this.props.onValidate}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                value={this.props.value}
                required={this.props.required}
                >
        <option value="">{this.props.placeholder}</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">Washington D.C.</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
        <option value="AS">American Samoa</option>
        <option value="FQ">FQ</option>
        <option value="GU">Guam</option>
        <option value="HQ">HQ</option>
        <option value="DQ">DQ</option>
        <option value="JQ">JQ</option>
        <option value="KQ">KQ</option>
        <option value="MH">Marshall Islands</option>
        <option value="FM">Micronesia</option>
        <option value="MQ">MQ</option>
        <option value="BQ">BQ</option>
        <option value="MP">Northern Mariana Islands</option>
        <option value="PW">Palau</option>
        <option value="LQ">LQ</option>
        <option value="PR">Puerto Rico</option>
        <option value="VI">Virgin Islands</option>
        <option value="WQ">WQ</option>
        { this.props.children }
      </Dropdown>
    )
  }
}
