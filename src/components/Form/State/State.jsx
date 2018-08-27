import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class State extends ValidationElement {
  constructor(props) {
    super(props)
    this.handleError = this.handleError.bind(this)
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `state.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render() {
    return (
      <Dropdown
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        className={this.props.className}
        disabled={this.props.disabled}
        onUpdate={this.props.onUpdate}
        onError={this.handleError}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        value={this.props.value}
        required={this.props.required}
        tabBack={this.props.tabBack}
        tabNext={this.props.tabNext}
        receiveProps={true}>
        <option key="Alabama" value="AL">
          Alabama
        </option>
        <option key="Alaska" value="AK">
          Alaska
        </option>
        <option key="Arizona" value="AZ">
          Arizona
        </option>
        <option key="Arkansas" value="AR">
          Arkansas
        </option>
        <option key="California" value="CA">
          California
        </option>
        <option key="Colorado" value="CO">
          Colorado
        </option>
        <option key="Connecticut" value="CT">
          Connecticut
        </option>
        <option key="Delaware" value="DE">
          Delaware
        </option>
        <option key="Washington D.C." value="DC">
          Washington D.C.
        </option>
        <option key="Florida" value="FL">
          Florida
        </option>
        <option key="Georgia" value="GA">
          Georgia
        </option>
        <option key="Hawaii" value="HI">
          Hawaii
        </option>
        <option key="Idaho" value="ID">
          Idaho
        </option>
        <option key="Illinois" value="IL">
          Illinois
        </option>
        <option key="Indiana" value="IN">
          Indiana
        </option>
        <option key="Iowa" value="IA">
          Iowa
        </option>
        <option key="Kansas" value="KS">
          Kansas
        </option>
        <option key="Kentucky" value="KY">
          Kentucky
        </option>
        <option key="Louisiana" value="LA">
          Louisiana
        </option>
        <option key="Maine" value="ME">
          Maine
        </option>
        <option key="Maryland" value="MD">
          Maryland
        </option>
        <option key="Massachusetts" value="MA">
          Massachusetts
        </option>
        <option key="Michigan" value="MI">
          Michigan
        </option>
        <option key="Minnesota" value="MN">
          Minnesota
        </option>
        <option key="Mississippi" value="MS">
          Mississippi
        </option>
        <option key="Missouri" value="MO">
          Missouri
        </option>
        <option key="Montana" value="MT">
          Montana
        </option>
        <option key="Nebraska" value="NE">
          Nebraska
        </option>
        <option key="Nevada" value="NV">
          Nevada
        </option>
        <option key="New Hampshire" value="NH">
          New Hampshire
        </option>
        <option key="New Jersey" value="NJ">
          New Jersey
        </option>
        <option key="New Mexico" value="NM">
          New Mexico
        </option>
        <option key="New York" value="NY">
          New York
        </option>
        <option key="North Carolina" value="NC">
          North Carolina
        </option>
        <option key="North Dakota" value="ND">
          North Dakota
        </option>
        <option key="Ohio" value="OH">
          Ohio
        </option>
        <option key="Oklahoma" value="OK">
          Oklahoma
        </option>
        <option key="Oregon" value="OR">
          Oregon
        </option>
        <option key="Pennsylvania" value="PA">
          Pennsylvania
        </option>
        <option key="Rhode Island" value="RI">
          Rhode Island
        </option>
        <option key="South Carolina" value="SC">
          South Carolina
        </option>
        <option key="South Dakota" value="SD">
          South Dakota
        </option>
        <option key="Tennessee" value="TN">
          Tennessee
        </option>
        <option key="Texas" value="TX">
          Texas
        </option>
        <option key="Utah" value="UT">
          Utah
        </option>
        <option key="Vermont" value="VT">
          Vermont
        </option>
        <option key="Virginia" value="VA">
          Virginia
        </option>
        <option key="Washington" value="WA">
          Washington
        </option>
        <option key="West Virginia" value="WV">
          West Virginia
        </option>
        <option key="Wisconsin" value="WI">
          Wisconsin
        </option>
        <option key="Wyoming" value="WY">
          Wyoming
        </option>
        <option key="American Samoa" value="AS">
          American Samoa
        </option>
        <option key="FQ" value="FQ">
          FQ
        </option>
        <option key="Guam" value="GU">
          Guam
        </option>
        <option key="HQ" value="HQ">
          HQ
        </option>
        <option key="DQ" value="DQ">
          DQ
        </option>
        <option key="JQ" value="JQ">
          JQ
        </option>
        <option key="KQ" value="KQ">
          KQ
        </option>
        <option key="Marshall Islands" value="MH">
          Marshall Islands
        </option>
        <option key="Micronesia" value="FM">
          Micronesia
        </option>
        <option key="MQ" value="MQ">
          MQ
        </option>
        <option key="BQ" value="BQ">
          BQ
        </option>
        <option key="Northern Mariana Islands" value="MP">
          Northern Mariana Islands
        </option>
        <option key="Palau" value="PW">
          Palau
        </option>
        <option key="LQ" value="LQ">
          LQ
        </option>
        <option key="Puerto Rico" value="PR">
          Puerto Rico
        </option>
        <option key="Virgin Islands" value="VI">
          Virgin Islands
        </option>
        <option key="WQ" value="WQ">
          WQ
        </option>
        {this.props.children}
      </Dropdown>
    )
  }
}

State.defaultProps = {
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  required: false
}

State.errors = []
