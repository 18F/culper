import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Radio, RadioGroup, Comments, DateRange, Address, Textarea, Text, Help, HelpIcon } from '../../../Form'

export default class PhysicalAddress extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasDifferentAddress: props.HasDifferentAddress,
      Address: props.Address
    }
  }

  /**
   * Handle the change event.
   */
  onBranchUpdate (value) {
    this.setState({ HasDifferentAddress: value }, () => {
      super.handleChange(event)
      this.doUpdate()
    })
  }

  doUpdate () {
    if (this.props.onUpdate) {
      let update = {
        name: this.props.name,
        HasDifferentAddress: this.state.HasDifferentAddress,
        Address: this.state.Address
      }
      this.props.onUpdate(update)
    }
  }

  handleAddressChange (value) {
    this.setState({ Address: value }, () => {
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
      <Branch name="physicalAddress"
        className="eapp-field-wrap no-label"
        value={this.state.HasDifferentAddress}
        help="history.employment.physicalAddress.help"
        onUpdate={this.onBranchUpdate.bind(this)}>
        <h4>{i18n.t('history.employment.physicalAddress.branch.label')}</h4>
      </Branch>
    )
  }
  render () {
    const klass = `physical ${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.HasDifferentAddress === 'Yes') {
      return (
        <div>
          <div className={klass + ' physical-address no-label'}>
              {options}
          </div>

          <h4>{i18n.t('history.employment.physicalAddress.heading.address')}</h4>
          <div className={klass}>
            <Help id="history.employment.physicalAddress.address.help">
              <Address name="address"
                className="address"
                {...this.props.Address}
                label={i18n.t('history.employment.physicalAddress.address.label')}
                placeholder={i18n.t('history.employment.physicalAddress.address.placeholder')}
                onUpdate={this.handleAddressChange.bind(this)}
              />
              <HelpIcon className="address"/>
            </Help>
          </div>

          <h4>{i18n.t('history.employment.physicalAddress.heading.telephone')}</h4>
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
          {options}
      </div>
    )
  }
}
