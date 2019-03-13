import React from 'react'
import { shallow } from 'enzyme'
import Intro from './index'

describe('Financial Intro', () => {
  it('should render without crashing', () => {
    shallow(<Intro />)
  })
})
