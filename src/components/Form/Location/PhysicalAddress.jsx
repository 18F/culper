import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import Show from '../Show'
import Field from '../Field'
import Location from './Location'
import Branch from '../Branch'
import ValidationElement from '../ValidationElement'
import LocationValidator, { countryString } from '../../../validators/location';

class PhysicalAddress extends ValidationElement {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this)
    this.confirmMilitaryAddress = this.confirmMilitaryAddress.bind(this)
  }

  // XXX This is not a great pattern, but we don't have a clear
  // way to update the state of this PhysicalAddress prop when
  // a user chooses a 'country' value that is not a military address
  componentWillUnmount() {
    this.props.onUpdate({
      branch: { value: '' },
      items: [{
        Item: {
          Address: {},
          name: '',
          HasDifferentAddress: false,
          Telephone: {}
        }
      }]
    })
  }

  handleUpdate(values) {
    const { physicalAddress } = this.props
    const { name, HasDifferentAddress, Telephone } = physicalAddress.items[0].Item

    this.props.onUpdate({
      branch: physicalAddress.branch,
      items: [
        {
          Item: {
            Address: values,
            name,
            HasDifferentAddress,
            Telephone
          }
        }
      ]
    })
  }

  /**
   * Need to have two render functions, one to just show the physical location
   * field with a toggle, and the other to render the APO address choice branch,
   * and THEN display the location field if the user indicates that they had
   * a military address in the foreign country
   * 
   * so potentially we prepare props in a couple of different ways,
   * and have a show block around the branch piece
   * 
   */

  getCountry() {
    const maybeAddress = this.props.physicalAddress.items[0]
    const country = countryString(maybeAddress && maybeAddress.country)
    
    return countryString(this.props.country) || country
  }

  confirmMilitaryAddress(value) {
    this.props.onUpdate({
      branch: value,
      items: [
        {
          Item: this.props.physicalAddress.items[0].Item.Address || {}
        }
      ]
    })
  }

  render() {
    const { addressFieldMetadata, physicalAddress } = this.props
    const country = this.getCountry()
    const locationValidator = new LocationValidator({ country })

    return (
      <div>
        <Show when={this.props.isForeign}>
          <Branch
            label={i18n.t('address.militaryAddress')}
            labelSize="h3"
            onUpdate={this.confirmMilitaryAddress}
            value={physicalAddress.branch && physicalAddress.branch.value}
          />
        </Show>
        <Show when={physicalAddress.branch && physicalAddress.branch.value === 'Yes'}>
          <Field title={i18n.t('address.physicalLocationRequired')}>
            <Location
              {...addressFieldMetadata}
              {...physicalAddress.items[0].Item.Address}
              country='POSTOFFICE'
              addressBook={this.props.addressBook}
              addressBooks={this.props.addressBooks}
              geocode
              label={i18n.t('address.label')}
              layout={this.props.layout}
              disableToggle={this.props.disableToggle}
              onUpdate={this.handleUpdate}
              required
            />
          </Field>
        </Show>
        <Show when={locationValidator.isPostOffice()}>
          <Field title={i18n.t('address.physicalLocationRequired')}>
            <Location
              {...addressFieldMetadata}
              {...physicalAddress.items[0].Item.Address}
              addressBook={this.props.addressBook}
              addressBooks={this.props.addressBooks}
              geocode
              label={i18n.t('address.label')}
              layout={this.props.layout}
              onUpdate={this.handleUpdate}
              required
            />
          </Field>
        </Show>
      </div>
    )
  }
}

const mapStateToProps = state => state

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


export { PhysicalAddress }
export default connect(mapStateToProps)(PhysicalAddress)
