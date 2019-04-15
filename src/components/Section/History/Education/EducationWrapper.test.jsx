import React from 'react'
import { shallow } from 'enzyme'

import { EducationWrapper } from './EducationWrapper'

describe('The EducationWrapper component', () => {
  it('renders without errors', () => {
    const component = shallow(<EducationWrapper />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })
})
