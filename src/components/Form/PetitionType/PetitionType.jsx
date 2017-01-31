import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'
import Text from '../Text'
import { Help, HelpIcon } from '../Help'
import Address from '../Address'

export default class PetitionType extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      trustee: props.trustee,
      address: props.address
    }
  }

  /**
   * Handle the change event.
   */
  handleFieldChange (field, event) {
    let value = event.target.value
    this.setState({ [field]: value }, () => {
      super.handleChange(event)
      this.doUpdate()
    })
  }

  doUpdate () {
    if (this.props.onUpdate) {
      let update = {
        name: this.props.name,
        value: this.state.value,
        address: this.state.address
      }
      if (this.state.value === 'Chapter13') {
        update.trustee = this.state.trustee
      } else {
        update.trustee = ''
      }
      this.props.onUpdate(update)
    }
  }

  handleAddressChange (value) {
    console.log('handleChange')
    this.setState({ address: value }, () => {
      this.doUpdate()
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  options () {
    return (
      <RadioGroup className="option-list" selectedValue={this.state.value}>
        <Radio name="petition_type"
               label="Chapter 7"
               value="Chapter7"
               disabled={this.props.disabled}
               onChange={this.handleFieldChange.bind(this, 'value')}
               onValidate={this.props.onValidate}
               onBlur={this.props.onBlur}
               onFocus={this.props.onFocus}
               />
        <Radio name="petition_type"
               label="Chapter 11"
               value="Chapter11"
               disabled={this.props.disabled}
               onChange={this.handleFieldChange.bind(this, 'value')}
               onValidate={this.props.onValidate}
               onBlur={this.props.onBlur}
               onFocus={this.props.onFocus}
               />
        <Radio name="petition_type"
               label="Chapter 13"
               value="Chapter13"
               disabled={this.props.disabled}
               onChange={this.handleFieldChange.bind(this, 'value')}
               onValidate={this.props.onValidate}
               onBlur={this.props.onBlur}
               onFocus={this.props.onFocus}
               />
      </RadioGroup>
    )
  }
  render () {
    const klass = `petition-type ${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.value === 'Chapter13') {
      return (
        <div>
          <div className={klass}>
            {options}
          </div>

          <h4>Provide the trustee</h4>
          <div className={klass}>
            <Help id="financial.bankruptcy.trustee.help">
              <Text name="chapter13Trustee"
                    className="trustee"
                    value={this.state.trustee}
                    placeholder={i18n.t('financial.bankruptcy.trustee.placeholder')}
                    onChange={this.handleFieldChange.bind(this, 'trustee')}
                    />
              <HelpIcon className="trustee"/>
            </Help>
          </div>

          <h4>Provide the address of the trustee for this bankruptcy</h4>
          <div className={klass}>
            <Address name="trusteeAddress"
                     {...this.props.address}
                     onUpdate={this.handleAddressChange.bind(this)}
                     />
          </div>
        </div>
      )
    }

    return (
      <div className={klass}>
        {options}
      </div>
    )
  }
}
