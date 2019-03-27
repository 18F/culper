import React from 'react'
import { shallow } from 'enzyme'
import { Review } from './index'

describe('Citizenship Review', () => {
  it('renders without crashing', () => {
    shallow(<Review />)
  })
})
