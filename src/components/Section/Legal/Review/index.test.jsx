import React from 'react'
import { shallow } from 'enzyme'
import Review from './index'

describe('Legal Review', () => {
  it('renders without crashing', () => {
    shallow(<Review />)
  })
})
