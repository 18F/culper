import React from 'react'
import { shallow } from 'enzyme'
import Intro from './index'

describe('Legal Intro component', () => {
  it('renders without crashing', () => {
    shallow(<Intro />)
  })
})
