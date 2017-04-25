import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class State extends ValidationElement {
  render () {
    return (
      <Dropdown name={this.props.name}
                label={this.props.label}
                help="State is required"
                maxlength="2"
                placeholder={this.props.placeholder}
                className={this.props.className}
                disabled={this.props.disabled}
                onChange={this.props.onChange}
                onValidate={this.props.onValidate}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                value={this.props.value}
                required={this.props.required}
                tabBack={this.props.tabBack}
                tabNext={this.props.tabNext}
                >
        <option key="Alabama" value="Alabama">AL</option>
        <option key="Alaska" value="Alaska">AK</option>
        <option key="Arizona" value="Arizona">AZ</option>
        <option key="Arkansas" value="Arkansas">AR</option>
        <option key="California" value="California">CA</option>
        <option key="Colorado" value="Colorado">CO</option>
        <option key="Connecticut" value="Connecticut">CT</option>
        <option key="Delaware" value="Delaware">DE</option>
        <option key="Washington D.C." value="Washington D.C.">DC</option>
        <option key="Florida" value="Florida">FL</option>
        <option key="Georgia" value="Georgia">GA</option>
        <option key="Hawaii" value="Hawaii">HI</option>
        <option key="Idaho" value="Idaho">ID</option>
        <option key="Illinois" value="Illinois">IL</option>
        <option key="Indiana" value="Indiana">IN</option>
        <option key="Iowa" value="Iowa">IA</option>
        <option key="Kansas" value="Kansas">KS</option>
        <option key="Kentucky" value="Kentucky">KY</option>
        <option key="Louisiana" value="Louisiana">LA</option>
        <option key="Maine" value="Maine">ME</option>
        <option key="Maryland" value="Maryland">MD</option>
        <option key="Massachusetts" value="Massachusetts">MA</option>
        <option key="Michigan" value="Michigan">MI</option>
        <option key="Minnesota" value="Minnesota">MN</option>
        <option key="Mississippi" value="Mississippi">MS</option>
        <option key="Missouri" value="Missouri">MO</option>
        <option key="Montana" value="Montana">MT</option>
        <option key="Nebraska" value="Nebraska">NE</option>
        <option key="Nevada" value="Nevada">NV</option>
        <option key="New Hampshire" value="New Hampshire">NH</option>
        <option key="New Jersey" value="New Jersey">NJ</option>
        <option key="New Mexico" value="New Mexico">NM</option>
        <option key="New York" value="New York">NY</option>
        <option key="North Carolina" value="North Carolina">NC</option>
        <option key="North Dakota" value="North Dakota">ND</option>
        <option key="Ohio" value="Ohio">OH</option>
        <option key="Oklahoma" value="Oklahoma">OK</option>
        <option key="Oregon" value="Oregon">OR</option>
        <option key="Pennsylvania" value="Pennsylvania">PA</option>
        <option key="Rhode Island" value="Rhode Island">RI</option>
        <option key="South Carolina" value="South Carolina">SC</option>
        <option key="South Dakota" value="South Dakota">SD</option>
        <option key="Tennessee" value="Tennessee">TN</option>
        <option key="Texas" value="Texas">TX</option>
        <option key="Utah" value="Utah">UT</option>
        <option key="Vermont" value="Vermont">VT</option>
        <option key="Virginia" value="Virginia">VA</option>
        <option key="Washington" value="Washington">WA</option>
        <option key="West Virginia" value="West Virginia">WV</option>
        <option key="Wisconsin" value="Wisconsin">WI</option>
        <option key="Wyoming" value="Wyoming">WY</option>
        <option key="American Samoa" value="American Samoa">AS</option>
        <option key="FQ" value="FQ">FQ</option>
        <option key="Guam" value="Guam">GU</option>
        <option key="HQ" value="HQ">HQ</option>
        <option key="DQ" value="DQ">DQ</option>
        <option key="JQ" value="JQ">JQ</option>
        <option key="KQ" value="KQ">KQ</option>
        <option key="Marshall Islands" value="Marshall Islands">MH</option>
        <option key="Micronesia" value="Micronesia">FM</option>
        <option key="MQ" value="MQ">MQ</option>
        <option key="BQ" value="BQ">BQ</option>
        <option key="Northern Mariana Islands" value="Northern Mariana Islands">MP</option>
        <option key="Palau" value="Palau">PW</option>
        <option key="LQ" value="LQ">LQ</option>
        <option key="Puerto Rico" value="Puerto Rico">PR</option>
        <option key="Virgin Islands" value="Virgin Islands">VI</option>
        <option key="WQ" value="WQ">WQ</option>
        { this.props.children }
      </Dropdown>
    )
  }
}
