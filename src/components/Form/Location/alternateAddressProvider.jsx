import React from 'react'
import AlternateAddress from './AlternateAddress'
import alternateAddress from '../../../schema/form/alternateaddress'

const alternateAddressProvider = (Component) => {
  class AddressProvider extends React.Component {
    constructor(props) {
      super(props)

      this.renderAlternateAddress = this.renderAlternateAddress.bind(this)
    }


    /**
     * Becuase of the way the app is structured, this component
     * MUST be passed an `onUpdate` function in the extraProps obj that
     * conforms to the `update` function included in every component in this app
     *
    */
    renderAlternateAddress(extraProps) {
      return (
        <AlternateAddress
          {...extraProps}
          addressBook={this.props.addressBook}
          allowForeignMilitary={this.props.allowForeignMilitary}
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
