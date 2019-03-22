import React from 'react'
import { shallow } from 'enzyme'
import Intro from './index'

describe('Foreign Intro', () => {
  it('renders without crashing', () => {
    shallow(<Intro />)
  })
})
