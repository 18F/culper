import React from 'react'
import { shallow } from 'enzyme'

import { ResidenceWrapper } from './ResidenceWrapper'

describe('The ResidenceWrapper component', () => {
  it('renders without errors', () => {
    const component = shallow(
      <ResidenceWrapper />
    )

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })
})
