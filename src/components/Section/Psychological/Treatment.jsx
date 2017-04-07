import React from 'react'
import { i18n } from '../../../config'
import { Address, ValidationElement, Help, HelpIcon, Text, Telephone } from '../../Form'

export default class Treatment extends ValidationElement {
  constructor (props) {
    super(props)
    this.updateName = this.updateName.bind(this)
    this.updatePhone = this.updatePhone.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Name: this.props.Name,
        Phone: this.props.Phone,
        Address: this.props.Address,
        [field]: values
      })
    }
  }

  updateName (values) {
    this.update('Name', values)
  }

  updatePhone (values) {
    this.update('Phone', values)
  }

  updateAddress (values) {
    this.update('Address', values)
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="treatment">
        <h3>{i18n.t(`psychological.${prefix}.heading.name`)}</h3>
        <div className="eapp-field-wrap no-label">
          <Help id={`psychological.${prefix}.help.name`}>
            <Text name="Name"
              className="name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>

        <div className="eapp-field-wrap help">
          <Telephone name="Phone"
            {...this.props.Phone}
            onUpdate={this.updatePhone}
            onValidate={this.props.onValidate}
          />
        </div>

        <h3>{i18n.t(`psychological.${prefix}.heading.address`)}</h3>
        <div className="eapp-field-wrap">
          <Help id={`psychological.${prefix}.help.address`}>
            <Address name="Address"
              {...this.props.Address}
              label={i18n.t(`psychological.${prefix}.label.address`)}
              onUpdate={this.updateAddress}
              onValidate={this.props.onValidate}
            />
            <HelpIcon />
          </Help>
        </div>
      </div>
    )
  }
}

Treatment.defaultProps = {
  prefix: 'treatment'
}
