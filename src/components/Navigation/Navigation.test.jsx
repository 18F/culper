import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './Navigation'

describe('Navigation component', () => {
  it('renders correctly', () => {
    shallow(
      <Navigation sections={[]} />
    )
  })
})
