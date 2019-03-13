import React from 'react'
import { shallow } from 'enzyme'
import Review from './index'

describe('Financial Review', () => {
  it('should render without crashing', () => {
    shallow(<Review />)
  })
})
