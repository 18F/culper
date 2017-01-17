import React from 'react'
import { ValidationElement, Help, Radio, City, MilitaryState, County, Country, RadioGroup } from '../../../Form'
import { api } from '../../../../services/api'

export default class ApplicantBirthPlace extends ValidationElement {
  constructor (props) {
    super(props)
    let domestic = (props.country === undefined ? null : (props.country === 'United States' ? 'yes' : 'no'))
    let disabledCountry = null
    let disabledState = null

    if (domestic !== null) {
      disabledCountry = props.country === 'United States'
      disabledState = !disabledCountry
    }

    this.state = {
      name: props.name,
      label: props.label,
      city: props.city,
      state: props.state,
      county: props.county,
      country: props.country,
      domestic: domestic,
      disabledState: disabledState,
      disabledCountry: disabledCountry,
      errorCodes: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let part = this.extractPart(event.target.id)
    let value = event.target.value
    let updated = null

    switch (part) {
      case 'domestic':
        if (value === 'no') {
          updated = {
            country: '',
            state: '',
            disabledCountry: false,
            disabledState: true,
            domestic: value
          }
        } else if (value === 'yes') {
          updated = {
            country: 'United States',
            state: '',
            disabledCountry: true,
            disabledState: false,
            domestic: value
          }
        } else {
          updated = {
            country: '',
            state: '',
            disabledCountry: true,
            disabledState: true
          }
        }
        break

      case 'city':
        updated = { city: value }
        break

      case 'state':
        updated = {
          state: value
        }
        break

      case 'county':
        updated = { county: value }
        break

      case 'country':
        updated = {
          country: value,
          disabledState: !(value === '' || value === 'United States')
        }
        break
    }

    if (updated !== null) {
      this.setState(updated, () => {
        super.handleChange(event)
        if (this.props.onUpdate) {
          this.props.onUpdate({
            city: this.state.city,
            state: this.state.state,
            county: this.state.county,
            country: this.state.country
          })
        }
      })
    } else {
      super.handleChange(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, error)
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.state.country === 'United States' && this.state.state && this.state.city) {
      complexStatus = true
    } else if (this.state.country !== 'United States' && this.state.city && this.state.county && this.state.country) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.state.name]: codes }
      let s = { [this.state.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)

      // api
      //   .validateApplicantBirthplace({
      //     City: this.state.city,
      //     State: this.state.state,
      //     County: this.state.county,
      //     Country: this.state.country
      //   })
      //   .then((response) => {
      //     // TODO: Display and assign the errors as necessary
      //     if (response.Errors) {
      //     }

      //     if (response.Suggestions) {
      //     }
      //   })
      //   .then(() => {
      //     super.handleValidation(event, status)
      //   })
    })
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.state.name + '-' + part
  }

  /**
   * Returns the part name from the pull generated identifier.
   */
  extractPart (id) {
    return id.split('-').pop()
  }

  options () {
    return (
          <Help id="identification.birthplace.help">
            <label>&nbsp;</label>
            <RadioGroup className="option-list branch" selectedValue={this.state.domestic}>
              <Radio name="domestic"
                label="Yes"
                value="yes"
                onChange={this.handleChange}
              />
              <Radio name="domestic"
                label="No"
                value="no"
                onChange={this.handleChange}
              />
            </RadioGroup>
          </Help>
    )
  }

  render () {
    if (this.state.disabledCountry === null && this.state.disabledState === null) {
      return (
        <div>
          <h2>Place of birth</h2>
          <label>Were you born in the United States of America</label>
          {this.options()}
        </div>
      )
    } else if (this.state.disabledCountry) {
      return (
        <div>
          <h2>Place of birth</h2>
          <label>Were you born in the United States of America</label>
          {this.options()}
          <MilitaryState name="state"
            label="State"
            value={this.state.state}
            includeStates="true"
            required="true"
            disabled={this.state.disabledState}
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <City name="city"
            label="City"
            value={this.state.city}
            placeholder="Please enter your city of birth"
            maxlength="100"
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <County name="county"
            label="County"
            value={this.state.county}
            placeholder="Please enter your county of birth"
            maxlength="255"
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
        </div>
      )
    }

    return (
      <div>
        <h2>Place of birth</h2>
        <label>Were you born in the United States of America</label>
        {this.options()}
        <City name="city"
          label="City"
          value={this.state.city}
          placeholder="Please enter your city of birth"
          maxlength="100"
          onChange={this.handleChange}
          onValidate={this.handleValidation}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <County name="county"
          label="County"
          value={this.state.county}
          placeholder="Please enter your county of birth"
          maxlength="255"
          onChange={this.handleChange}
          onValidate={this.handleValidation}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <Country name="country"
          label="Country"
          value={this.state.country}
          required="true"
          disabled={this.state.disabledCountry}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }
}
