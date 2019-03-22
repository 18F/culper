import React from 'react'
import { shallow } from 'enzyme'
import Review from './index'

describe('Substance Use Review', () => {
  it('renders without crashing', () => {
    shallow(<Review />)
  })
})
