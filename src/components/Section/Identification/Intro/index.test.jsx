import React from 'react'
import { shallow } from 'enzyme'

import Intro from './index'

describe('Identification Intro', () => {
  it('renders without errors', () => {
    const component = shallow(<Intro />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })
})
