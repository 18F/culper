import React from 'react'
import Location from '../Location'
import { throttle } from './Address'

export default class extends React.Component {
  render () {
    return (
      <Location
        {...this.props}
        geocode={true}
        layout={Location.ADDRESS}
      />
    )
  }
}

export { throttle }
