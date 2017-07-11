import React from 'react'
import { i18n } from '../../../config'
import { Address, ValidationElement, Field, Text, Telephone } from '../../Form'

export default class Treatment extends ValidationElement {
  constructor (props) {
    super(props)

    this.updateName = this.updateName.bind(this)
    this.updatePhone = this.updatePhone.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Phone: this.props.Phone,
      Address: this.props.Address,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updatePhone (values) {
    this.update({
      Phone: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  render () {
    const prefix = this.props.prefix
    return (
      <div className="treatment">
        <Field title={i18n.t(`psychological.${prefix}.heading.name`)}
               help={`psychological.${prefix}.help.name`}
               adjustFor="labels">
          <Text name="Name"
                label={i18n.t(`psychological.${prefix}.label.name`)}
                className="treatment-name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                />
        </Field>

        <Field adjustFor="telephone">
          <Telephone name="Phone"
                     label={i18n.t(`psychological.${prefix}.label.phone`)}
                     {...this.props.Phone}
                     onUpdate={this.updatePhone}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t(`psychological.${prefix}.heading.address`)}
               help={`psychological.${prefix}.help.address`}
               adjustFor="address">
          <Address name="Address"
                   {...this.props.Address}
                   label={i18n.t(`psychological.${prefix}.label.address`)}
                   onUpdate={this.updateAddress}
                   onError={this.props.onError}
                   />
        </Field>
      </div>
    )
  }
}

Treatment.defaultProps = {
  prefix: 'treatment',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
