import React from 'react'
import { shallow } from 'enzyme'

import { Review } from './index'

describe('History Review', () => {
  it('renders without errors', () => {
    const component = shallow(<Review />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })
})
