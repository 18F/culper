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
        <option value="Alabama">AL</option>
        <option value="Alaska">AK</option>
        <option value="Arizona">AZ</option>
        <option value="Arkansas">AR</option>
        <option value="California">CA</option>
        <option value="Colorado">CO</option>
        <option value="Connecticut">CT</option>
        <option value="Delaware">DE</option>
        <option value="Washington D.C.">DC</option>
        <option value="Florida">FL</option>
        <option value="Georgia">GA</option>
        <option value="Hawaii">HI</option>
        <option value="Idaho">ID</option>
        <option value="Illinois">IL</option>
        <option value="Indiana">IN</option>
        <option value="Iowa">IA</option>
        <option value="Kansas">KS</option>
        <option value="Kentucky">KY</option>
        <option value="Louisiana">LA</option>
        <option value="Maine">ME</option>
        <option value="Maryland">MD</option>
        <option value="Massachusetts">MA</option>
        <option value="Michigan">MI</option>
        <option value="Minnesota">MN</option>
        <option value="Mississippi">MS</option>
        <option value="Missouri">MO</option>
        <option value="Montana">MT</option>
        <option value="Nebraska">NE</option>
        <option value="Nevada">NV</option>
        <option value="New Hampshire">NH</option>
        <option value="New Jersey">NJ</option>
        <option value="New Mexico">NM</option>
        <option value="New York">NY</option>
        <option value="North Carolina">NC</option>
        <option value="North Dakota">ND</option>
        <option value="Ohio">OH</option>
        <option value="Oklahoma">OK</option>
        <option value="Oregon">OR</option>
        <option value="Pennsylvania">PA</option>
        <option value="Rhode Island">RI</option>
        <option value="South Carolina">SC</option>
        <option value="South Dakota">SD</option>
        <option value="Tennessee">TN</option>
        <option value="Texas">TX</option>
        <option value="Utah">UT</option>
        <option value="Vermont">VT</option>
        <option value="Virginia">VA</option>
        <option value="Washington">WA</option>
        <option value="West Virginia">WV</option>
        <option value="Wisconsin">WI</option>
        <option value="Wyoming">WY</option>
        <option value="American Samoa">AS</option>
        <option value="FQ">FQ</option>
        <option value="Guam">GU</option>
        <option value="HQ">HQ</option>
        <option value="DQ">DQ</option>
        <option value="JQ">JQ</option>
        <option value="KQ">KQ</option>
        <option value="Marshall Islands">MH</option>
        <option value="Micronesia">FM</option>
        <option value="MQ">MQ</option>
        <option value="BQ">BQ</option>
        <option value="Northern Mariana Islands">MP</option>
        <option value="Palau">PW</option>
        <option value="LQ">LQ</option>
        <option value="Puerto Rico">PR</option>
        <option value="Virgin Islands">VI</option>
        <option value="WQ">WQ</option>
        { this.props.children }
      </Dropdown>
    )
  }
}
