import React from 'react'
import { mount } from 'enzyme'

import { PackageReview } from './index'

import FormStatus from '../FormStatus'

describe('The PackageReview component', () => {
  const component = mount(<PackageReview />)

  it('renders without errors', () => {
    expect(component.exists()).toBe(true)
  })

  it('renders the FormStatus component', () => {
    const formStatus = component.find(FormStatus)
    expect(formStatus.length).toBe(1)
    expect(formStatus.prop('isTransitioning')).toBe(true)
    expect(formStatus.prop('progressWidth')).toBe(0)

    component.setState({ width: 50 })
    expect(formStatus.prop('progressWidth')).toBe(50)
  })
})
