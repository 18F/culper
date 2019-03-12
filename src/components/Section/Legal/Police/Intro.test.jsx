import React from 'react'
import { shallow } from 'enzyme'
import PoliceIntro from './Intro'

describe('Police Intro', () => {
  it('renders without crashing', () => {
    shallow(<PoliceIntro />)
  })
})
