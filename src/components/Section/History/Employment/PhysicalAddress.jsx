import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Location, Field, Telephone } from '../../../Form'

export default class PhysicalAddress extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasDifferentAddress: props.HasDifferentAddress,
      Address: props.Address,
      Telephone: props.Telephone
    }

    this.onBranchUpdate = this.onBranchUpdate.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
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

  updateTelephone (value) {
    this.setState({ Telephone: value }, () => {
      this.doUpdate()
    })
  }

  options () {
    return (
      <Branch name="physicalAddress"
              value={this.state.HasDifferentAddress}
              help="history.employment.default.physicalAddress.help"
              onUpdate={this.onBranchUpdate}
              onError={this.props.onError}>
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

          <Field title={i18n.t('history.employment.default.physicalAddress.heading.address')}
                 titleSize="h4"
                 help="history.employment.default.physicalAddress.address.help"
                 adjustFor="labels"
                 shrink={true}>
            <Location name="address"
                      className="address"
                      {...this.props.Address}
                      label={i18n.t('history.employment.default.physicalAddress.address.label')}
                      placeholder={i18n.t('history.employment.default.physicalAddress.address.placeholder')}
                      layout={Location.ADDRESS}
                      geocode={true}
                      onUpdate={this.handleAddressChange}
                      onError={this.props.onError}
                      />
          </Field>

          <Field title={i18n.t('history.employment.default.physicalAddress.heading.telephone')}
                 titleSize="h4"
                 help="history.employment.default.physicalAddress.telephone.help"
                 adjustFor="telephone">
            <Telephone name="telephone"
                       {...this.props.Telephone}
                       label={i18n.t('history.employment.default.physicalAddress.telephone.label')}
                       onUpdate={this.updateTelephone}
                       onError={this.props.onError}
                       />
          </Field>
        </div>
      )
    }

    return (
      <div className={klass + ' physical-address'}>
        {options}
      </div>
    )
  }
}

PhysicalAddress.defaultProps = {
  onError: (value, arr) => { return arr }
}
