import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Address, Help, HelpIcon, Telephone } from '../../../Form'

export default class PhysicalAddress extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasDifferentAddress: props.HasDifferentAddress,
      Address: props.Address,
      Telephone: props.Telephone
    }
  }

  /**
   * Handle the change event.
   */
  onBranchUpdate (value) {
    this.setState({ HasDifferentAddress: value }, () => {
      this.doUpdate()
    })
  }

  doUpdate () {
    if (this.props.onUpdate) {
      let update = {
        name: this.props.name,
        HasDifferentAddress: this.state.HasDifferentAddress,
        Address: this.state.Address,
        Telephone: this.state.Telephone
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
        className="no-label"
        value={this.state.HasDifferentAddress}
        help="history.employment.physicalAddress.help"
        onUpdate={this.onBranchUpdate.bind(this)}>
      </Branch>
    )
  }
  render () {
    const klass = `physical ${this.props.className || ''}`.trim()
    let options = this.options()

    if (this.state.HasDifferentAddress === 'Yes') {
      return (
        <div className="has-different">
          <div className={klass + ' physical-address'}>
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
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onUpdate={this.handleAddressChange.bind(this)}
              />
              <HelpIcon className="address"/>
            </Help>
          </div>

          <h4>{i18n.t('history.employment.physicalAddress.heading.telephone')}</h4>
          <div className={klass}>
            <Help id="history.employment.physicalAddress.telephone.help">
              <Telephone name="telephone"
                {...this.props.Telephone}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                label={i18n.t('history.employment.physicalAddress.telephone.label')}
              />
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
