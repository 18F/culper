import React from 'react'
import AlternateAddress from './AlternateAddress'
import alternateAddress from '../../../schema/form/alternateAddress'

/**
 * Becuase of the way the app is structured, this component
 * MUST be passed an onUpdate function which conforms to the
 * `update` function included in every component in this app
 * 
*/

const alternateAddressProvider = (Component) => {
  class AddressProvider extends React.Component {
    constructor(props) {
      super(props)

      this.renderAlternateAddress = this.renderAlternateAddress.bind(this)
    }

    renderAlternateAddress(extraProps) {
      return (
        <AlternateAddress
          {...extraProps}
          addressBook={this.props.addressBook}
          allowForeignMilitary
        />
      );
    }

    render() {
      return (
        <Component 
          {...this.props}
          render={this.renderAlternateAddress}
        />
      )
    }
  }

  AddressProvider.defaultProps = {
    addressBook: 'Residence',
    allowForeignMilitary: true,
  }

  return AddressProvider
}


export default alternateAddressProvider
