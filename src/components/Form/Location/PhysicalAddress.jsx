import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import Field from '../Field'
import Location from './Location'
import ValidationElement from '../ValidationElement';

class PhysicalAddress extends ValidationElement {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  // XXX This is not a great pattern, but we don't have a clear
  // way to update the state of this PhysicalAddress prop when
  // a user chooses a 'country' value that is not a military address
  componentWillUnmount() {
    this.props.onUpdate({})
  }

  handleUpdate(values) {
    const { name, HasDifferentAddress, Telephone } = this.props.physicalAddress

    this.props.onUpdate({
      Address: values
    })
  }

  render() {
    const { addressFieldMetadata, physicalAddress } = this.props

    return (
      <Field title={i18n.t('address.physicalLocationRequired')}>
        <Location
          {...addressFieldMetadata}
          {...physicalAddress.Address}
          addressBook={this.props.addressBook}
          addressBooks={this.props.addressBooks}
          geocode
          label={i18n.t('address.label')}
          layout={Location.ADDRESS}
          onUpdate={this.handleUpdate}
          required
        />
      </Field>
    )
  }
}

const mapStateToProps = ({ addressBooks }) => addressBooks

PhysicalAddress.defaultProps = {
  addressBook: 'Residence',
  addressFieldMetadata: {
    streetLabel: i18n.t('address.us.street.label'),
    streetPlaceholder: i18n.t('address.us.street.placeholder'),
    street2Label: i18n.t('address.us.street2.label'),
    stateLabel: i18n.t('address.us.state.label'),
    cityLabel: i18n.t('address.us.city.label'),
    zipcodeLabel: i18n.t('address.us.zipcode.label'),
    countyLabel: i18n.t('address.us.county.label'),
    countryLabel: i18n.t('address.international.country.label'),
  },
  physicalAddress: {}
}

export default PhysicalAddress
