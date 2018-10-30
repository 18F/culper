import React from 'react'
import { connect } from 'react-redux';
import { i18n } from '../../../config'
import Field from '../Field'
import Branch from '../Branch'
import Show from '../Show'
import Location from './Location'
import LocationValidator, { countryString } from '../../../validators/location'
import ValidationElement from '../ValidationElement'

const physicalAddressDefaultState = () => ({
  Address: {},
  HasDifferentAddress: { value: '' }
})

class PhysicalAddress extends ValidationElement {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this);
    this.setAlternateAddress = this.setAlternateAddress.bind(this)
  }

  // XXX This is not a great pattern, but we don't have a clear
  // way to update the state of this PhysicalAddress prop when
  // a user chooses a 'country' value that is not a military address
  componentWillUnmount() {
    this.props.onUpdate(computedPhysicalAddressDefaultState())
  }

  handleUpdate(values) {
    this.props.onUpdate({
      ...this.props.physicalAddress,
      Address: values
    })
  }

  setAlternateAddress(values) {
    this.props.onUpdate({
      ...this.props.physicalAddress,
      HasDifferentAddress: values
    })
  }

  isForeignMilitaryAddress() {
    const { physicalAddress: { HasDifferentAddress } } = this.props
    return HasDifferentAddress.value === 'Yes' && this.isForeignAddress()
  }

  isMilitaryAddress() {
    return countryString(this.props.country) === 'POSTOFFICE'
  }

  isForeignAddress() {
    const country = countryString(this.props.country);

    return country !== null &&
      country !== undefined &&
      country !== 'POSTOFFICE' &&
      country !== 'United States'
  }

  prepareProps(extraProps = {}) {
    const defaults = {
      ...this.props.addressFieldMetadata,
      ...this.props.physicalAddress.Address,
      label: i18n.t('address.label'),
      onUpdate: this.handleUpdate,
      required: true
    }

    return {
      ...defaults,
      ...extraProps
    }
  }

  render() {
    return (
      <div>
        <Show when={this.isForeignAddress()}>
          <Branch
            label={i18n.t('address.militaryAddress')}
            labelSize="h3"
            onUpdate={this.setAlternateAddress}
            value={this.props.physicalAddress.HasDifferentAddress.value}
          />
        </Show>
        <Show when={this.isForeignMilitaryAddress()}>
          <Field title={i18n.t('address.physicalLocationRequired')}>
            <Location
              {...this.prepareProps({
                country: 'POSTOFFICE',
                disableToggle: true,
                layout: Location.US_ADDRESS
              })}
            />
          </Field>
        </Show>
        <Show when={this.isMilitaryAddress()}>
          <Field title={i18n.t('address.physicalLocationRequired')}>
            <Location
              {...this.prepareProps({
                addressBook: this.props.addressBook,
                addressBooks: this.props.addressBooks,
                geocode: true,
                layout: this.props.layout
              })}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

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
  layout: Location.ADDRESS,
}

const mapStateToProps = ({ application }, ownProps) => {
  let computed = { ...ownProps.physicalAddress }

  if (['United States', 'POSTOFFICE'].includes(countryString(ownProps.country))) {
    computed = computedPhysicalAddressDefaultState()
  }

  return {
    addressBooks: application.AddressBooks,
    physicalAddress: computed
  }
}

export { PhysicalAddress }
export default connect(mapStateToProps)(PhysicalAddress)
