import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Radio, RadioGroup, Comments, DateRange, Address, Textarea, Text, Help, HelpIcon } from '../../../Form'

export default class PhysicalAddress extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
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
        <Radio name="physicalAddress"
               label="Yes"
               value="Yes"
               disabled={this.props.disabled}
               onChange={this.handleFieldChange.bind(this, 'value')}
               onValidate={this.props.onValidate}
               onBlur={this.props.onBlur}
               onFocus={this.props.onFocus}
               />
        <Radio name="physicalAddress"
               label="No"
               value="No"
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
    const klass = `physical ${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.value === 'Yes') {
      return (
        <div>
          <div className={klass + ' physical-address no-label'}>
            <Help id="history.employment.physicalAddress.help">
              {options}
              <HelpIcon className="physical-address" />
            </Help>
          </div>

          <h3>{i18n.t('history.employment.heading.physicalAddress')}</h3>
          <div className={klass}>
            <Help id="history.employment.physicalAddress.address.help">
              <Address name="address"
                className="address"
                {...this.props.address}
                label={i18n.t('history.employment.physicalAddress.address.label')}
                placeholder={i18n.t('history.employment.physicalAddress.address.placeholder')}
                onChange={this.handleAddressChange.bind(this)}
              />
              <HelpIcon className="address"/>
            </Help>
          </div>

          <h3>{i18n.t('history.employement.physicalAddress.heading.telephone')}</h3>
          <div>
            <Help id="history.employment.physicalAddress.telephone.help">
              <div>TODO: Telephone</div>
              <HelpIcon className="telephone"/>
            </Help>
          </div>
        </div>
      )
    }

    return (
      <div className={klass + ' physical-address no-label'}>
        <Help id="history.employment.physicalAddress.help">
          {options}
          <HelpIcon className="physical-address" />
        </Help>
      </div>
    )
  }
}
