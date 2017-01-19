import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Radio, City, MilitaryState, County, Country, RadioGroup } from '../../../Form'
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
        <RadioGroup className="option-list branch eapp-field-wrap" selectedValue={this.state.domestic}>
          <Radio name="domestic"
                 label={i18n.t('identification.birthplace.question.yes')}
                 value="yes"
                 onChange={this.handleChange}
                 />
          <Radio name="domestic"
                 label={i18n.t('identification.birthplace.question.no')}
                 value="no"
                 onChange={this.handleChange}
                 />
        </RadioGroup>
        <HelpIcon className="branch-help-icon" />
      </Help>
    )
  }

  render () {
    if (this.state.disabledCountry === null && this.state.disabledState === null) {
      return (
        <div className="birthplace">
          <h2>{i18n.t('identification.birthplace.title')}</h2>
          <label>{i18n.t('identification.birthplace.question.label')}</label>
          {this.options()}
        </div>
      )
    } else if (this.state.disabledCountry) {
      return (
        <div className="birthplace">
          <h2>{i18n.t('identification.birthplace.title')}</h2>
          <label>{i18n.t('identification.birthplace.question.label')}</label>
          {this.options()}
          <Help id="identification.birthplace.help.state">
            <MilitaryState name="state"
                           label={i18n.t('identification.birthplace.label.state')}
                           value={this.state.state}
                           className="state"
                           includeStates="true"
                           required="true"
                           disabled={this.state.disabledState}
                           onChange={this.handleChange}
                           onValidate={this.handleValidation}
                           onFocus={this.props.onFocus}
                           onBlur={this.props.onBlur}
                           />
            <HelpIcon className="" />
          </Help>
          <Help id="identification.birthplace.help.city">
            <City name="city"
                  label={i18n.t('identification.birthplace.label.city')}
                  value={this.state.city}
                  className="city"
                  placeholder={i18n.t('identification.birthplace.placeholder.city')}
                  maxlength="100"
                  onChange={this.handleChange}
                  onValidate={this.handleValidation}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  />
            <HelpIcon className="" />
          </Help>
          <Help id="identification.birthplace.help.county">
            <County name="county"
                    label={i18n.t('identification.birthplace.label.county')}
                    value={this.state.county}
                    className="county"
                    placeholder={i18n.t('identification.birthplace.placeholder.county')}
                    maxlength="255"
                    onChange={this.handleChange}
                    onValidate={this.handleValidation}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    />
            <HelpIcon className="" />
          </Help>
        </div>
      )
    }

    return (
      <div className="birthplace">
        <h2>{i18n.t('identification.birthplace.title')}</h2>
        <label>{i18n.t('identification.birthplace.question.label')}</label>
        {this.options()}
        <Help id="identification.birthplace.help.city">
          <City name="city"
                label={i18n.t('identification.birthplace.label.city')}
                value={this.state.city}
                className="city"
                placeholder={i18n.t('identification.birthplace.placeholder.city')}
                maxlength="100"
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                />
          <HelpIcon className="" />
        </Help>
        <Help id="identification.birthplace.help.country">
          <Country name="country"
                   label={i18n.t('identification.birthplace.label.country')}
                   value={this.state.country}
                   className="country"
                   required="true"
                   disabled={this.state.disabledCountry}
                   onChange={this.handleChange}
                   onValidate={this.handleValidation}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   />
          <HelpIcon className="" />
        </Help>
      </div>
    )
  }
}
