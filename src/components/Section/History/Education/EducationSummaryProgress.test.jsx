import React from 'react'
import { shallow } from 'enzyme'

import EducationSummaryProgress from './EducationSummaryProgress'

describe('The EducationSummaryProgress component', () => {
  it('renders without errors', () => {
    const component = shallow(<EducationSummaryProgress />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })
})
