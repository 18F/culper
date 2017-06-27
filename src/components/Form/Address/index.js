import React from 'react'
import Location from '../Location'

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

