import React from 'react'
import { shallow, mount } from 'enzyme'

import { Physical } from 'components/Section/Identification/Physical/Physical'

describe('The Physical component', () => {
  it('renders without errors', () => {
    const component = shallow(<Physical />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('renders the form inputs', () => {
    const component = mount(<Physical name="physical" />)
    expect(component.find('.pounds input').length).toEqual(1)
    expect(component.find('.feet input').length).toEqual(1)
    expect(component.find('.inches input').length).toEqual(1)
    expect(component.find('.hair-colors').length).toBeGreaterThan(0)
    expect(component.find('.eye-colors input').length).toBeGreaterThan(0)
    expect(component.find('.sex input').length).toBeGreaterThan(0)
  })

  it('displays no error by default', () => {
    const component = mount(<Physical name="physical" />)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('implements an onUpdate handler', () => {
    let updates = 0
    const testProps = {
      onUpdate: () => {
        updates += 1
      },
    }

    const component = mount(<Physical {...testProps} />)
    component.find('.pounds input').simulate('change')
    component.find('.feet input').simulate('change')
    component.find('.inches input').simulate('change')
    component.find('.bald input').simulate('change')
    component
      .find('.eye-colors input')
      .first()
      .simulate('change')
    component
      .find('.sex input')
      .first()
      .simulate('change')
    expect(updates).toBe(6)
  })
})
