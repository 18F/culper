import React from 'react'
import { shallow, mount } from 'enzyme'

import { PackageReview } from './index'

import FormStatus from '../FormStatus'

describe('The PackageReview component', () => {
  it('renders without errors', () => {
    const component = shallow(<PackageReview />)
    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('renders the FormStatus component', () => {
    const component = mount(<PackageReview />)
    const formStatus = component.find(FormStatus)
    expect(formStatus.length).toBe(1)
    expect(formStatus.prop('isTransitioning')).toBe(true)
    expect(formStatus.prop('progressWidth')).toBe(0)

    component.setState({ width: 50 })
    expect(formStatus.prop('progressWidth')).toBe(50)
  })
})
