import React from 'react'
import { shallow } from 'enzyme'

import { PackageSubmit } from './index'

import FormStatus from '../FormStatus'

describe('The PackageSubmit component', () => {
  const component = shallow(<PackageSubmit />)

  it('renders without errors', () => {
    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('renders the FormStatus component', () => {
    const formStatus = component.find(FormStatus)
    expect(formStatus.length).toBe(1)
    expect(formStatus.prop('isValid')).toBe(true)
    expect(formStatus.prop('isTransitioning')).toBe(false)
  })

  it('renders a submit button', () => {
    expect(component.find('button.submit').length).toBe(1)
  })
})
