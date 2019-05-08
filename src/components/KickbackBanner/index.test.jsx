import React from 'react'
import { shallow } from 'enzyme'
import KickbackBanner from './index'

describe('The kickback banner', () => {
  it('renders without crashing', () => {
    shallow(<KickbackBanner />)
  })
})
