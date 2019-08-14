import React from 'react'
import { mount } from 'enzyme'
import { TimeoutWarning } from 'components/Form/TimeoutWarning/TimeoutWarning'
import { testSnapshot } from 'components/test-helpers'

describe('The timeout warning component', () => {
  it('renders without errors', () => {
    const component = mount(<TimeoutWarning />)
    expect(component.exists()).toBe(true)
  })

  it('matches the snapshot', () => {
    testSnapshot(<TimeoutWarning />)
  })
})
