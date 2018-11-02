import React from 'react'
import PropTypes from 'prop-types'
import AlternateAddress from './AlternateAddress'

/**
 * Becuase of the way the app is structured, this component
 * MUST be passed an onUpdate function which conforms to the
 * `update` function included in every component in this app
 * 
 */
// const propTypes = {
//   onUpdate: PropTypes.func.isRequired
// }

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
          alternateAddress={this.props.AlternateAddress}
          onUpdate={extraProps.onUpdate}
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
    AlternateAddress: {
      Address: {},
      HasDifferentAddress: { value: '' }
    }
  }

  return AddressProvider
}


export default alternateAddressProvider
