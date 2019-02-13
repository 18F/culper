import React from 'react'
import { i18n } from '../../../config'
import { Location, ValidationElement, Field, Text, Telephone } from '../../Form'

export default class Treatment extends ValidationElement {
  constructor(props) {
    super(props)

    this.updateName = this.updateName.bind(this)
    this.updatePhone = this.updatePhone.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Phone: this.props.Phone,
      Address: this.props.Address,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  updatePhone(values) {
    this.update({
      Phone: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  render() {
    const prefix = this.props.prefix
    return (
      <div className="treatment">
        <Field
          title={i18n.t(`psychological.${prefix}.heading.name`)}
          titleSize="label"
          adjustFor="labels"
          className="no-margin-bottom"
          scrollIntoView={this.props.scrollIntoView}>
          <Text
            name="Name"
            label={i18n.t(`psychological.${prefix}.label.name`)}
            className="treatment-name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          className="override-required treatment-telephone"
          adjustFor="telephone"
          scrollIntoView={this.props.scrollIntoView}>
          <Telephone
            name="Phone"
            label={i18n.t(`psychological.${prefix}.label.phone`)}
            {...this.props.Phone}
            allowNotApplicable={false}
            onUpdate={this.updatePhone}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t(`psychological.${prefix}.heading.address`)}
          help={`psychological.${prefix}.help.address`}
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="Address"
            {...this.props.Address}
            label={i18n.t(`psychological.${prefix}.label.address`)}
            layout={Location.ADDRESS}
            geocode={true}
            addressBooks={this.props.addressBooks}
            addressBook="Facility"
            showPostOffice={true}
            dispatch={this.props.dispatch}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

Treatment.defaultProps = {
  prefix: 'treatment',
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
