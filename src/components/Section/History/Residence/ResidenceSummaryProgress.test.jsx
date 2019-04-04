import React from 'react'
import { shallow } from 'enzyme'

import ResidenceSummaryProgress from './ResidenceSummaryProgress'

describe('The ResidenceSummaryProgress component', () => {
  it('renders without errors', () => {
    const component = shallow(
      <ResidenceSummaryProgress />
    )

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })
})
