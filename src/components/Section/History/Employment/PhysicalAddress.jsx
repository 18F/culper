import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Branch,
  Location,
  Field,
  Telephone
} from '../../../Form'

export default class PhysicalAddress extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateTelephone = this.updateTelephone.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      name: this.props.name,
      HasDifferentAddress: this.props.HasDifferentAddress,
      Address: this.props.Address,
      Telephone: this.props.Telephone,
      ...queue
    })
  }

  /**
   * Handle the change event.
   */
  updateBranch(values) {
    this.update({
      HasDifferentAddress: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateTelephone(values) {
    this.update({
      Telephone: values
    })
  }

  options() {
    return (
      <Branch
        label={this.props.title}
        labelSize="h4"
        name="physicalAddress"
        {...this.props.HasDifferentAddress}
        className="has-different-address"
        help="history.employment.default.physicalAddress.help"
        onUpdate={this.updateBranch}
        onError={this.props.onError}
        required={this.props.required}
        scrollIntoView={this.props.scrollIntoView}
      />
    )
  }

  render() {
    const klass = `physical ${this.props.className || ''}`.trim()
    let options = this.options()

    if ((this.props.HasDifferentAddress || {}).value === 'Yes') {
      return (
        <div className="has-different">
          <div className={klass + ' physical-address'}>{options}</div>

          <Field
            title={i18n.t(
              'history.employment.default.physicalAddress.heading.address'
            )}
            titleSize="h4"
            optional={true}
            help="history.employment.default.physicalAddress.address.help"
            adjustFor="labels"
            shrink={true}
            scrollIntoView={this.props.scrollIntoView}>
            <Location
              name="address"
              className="physical-address-address"
              {...this.props.Address}
              label={i18n.t(
                'history.employment.default.physicalAddress.address.label'
              )}
              layout={Location.ADDRESS}
              geocode={true}
              addressBooks={this.props.addressBooks}
              addressBook={this.props.addressBook}
              showPostOffice={true}
              dispatch={this.props.dispatch}
              onUpdate={this.updateAddress}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Field
            title={i18n.t(
              'history.employment.default.physicalAddress.heading.telephone'
            )}
            titleSize="h4"
            className="override-required"
            adjustFor="telephone"
            scrollIntoView={this.props.scrollIntoView}>
            <Telephone
              name="telephone"
              {...this.props.Telephone}
              className="physical-address-telephone"
              onUpdate={this.updateTelephone}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </div>
      )
    }

    return <div className={klass + ' physical-address'}>{options}</div>
  }
}

PhysicalAddress.defaultProps = {
  title: '',
  HasDifferentAddress: {},
  addressBooks: {},
  addressBook: 'Company',
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
