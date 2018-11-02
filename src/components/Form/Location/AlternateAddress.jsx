import React from 'react'
import { connect } from 'react-redux';
import { i18n } from '../../../config'
import Field from '../Field'
import Branch from '../Branch'
import Show from '../Show'
import Location from './Location'
import LocationValidator, { countryString } from '../../../validators/location'
import ValidationElement from '../ValidationElement'

const alternateAddressDefaultState = () => ({
  Address: {},
  HasDifferentAddress: { value: '' }
})

class AlternateAddress extends ValidationElement {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this);
    this.setAlternateAddress = this.setAlternateAddress.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (countryString(prevProps.country) !== countryString(this.props.country)) {
      this.props.onUpdateCountry(alternateAddressDefaultState());
    }
  }

  handleUpdate(values) {
    this.props.onUpdate({
      ...this.props.alternateAddress,
      Address: values
    })
  }

  setAlternateAddress(values) {
    this.props.onUpdate({
      ...this.props.alternateAddress,
      HasDifferentAddress: values
    })
  }

  isForeignMilitaryAddress() {
    const { alternateAddress: { HasDifferentAddress } } = this.props
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
      ...this.props.alternateAddress.Address,
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
            value={this.props.alternateAddress.HasDifferentAddress.value}
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

AlternateAddress.defaultProps = {
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
  onUpdateCountry: () => ({})
}

const mapStateToProps = ({ application }, ownProps) => ({
  addressBooks: application.AddressBooks
})

export { AlternateAddress }
export default connect(mapStateToProps)(AlternateAddress)
