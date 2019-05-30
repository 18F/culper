import React from 'react'
import { shallow } from 'enzyme'
import Charge from './Intro'

describe('Charge', () => {
  it('renders without crashing', () => {
    shallow(<Charge />)
  })
})
