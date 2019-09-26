import React from 'react'
import { shallow } from 'enzyme'

import { EducationWrapper } from './EducationWrapper'

describe('EducationWrapper component', () => {
  describe('with default props', () => {
    const component = shallow(<EducationWrapper formType="SF86" />)

    it('renders without errors', () => {
      expect(component.exists()).toBe(true)
    })
  })
})
