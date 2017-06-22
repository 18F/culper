import React from 'react'
import Location from '../Location'
import Address, { throttle } from './Address'

//export default Address
export default class extends React.Component {
  render () {
    return (
      <Location
        {...this.props}
        layout={Location.ADDRESS}
      />
    )
  }
}

export { throttle }
