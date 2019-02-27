import React from 'react'
import { Provider } from 'react-redux'
import { Physical } from 'components/Section/Identification/Physical/Physical'
import { mount } from 'enzyme'

describe('The physical attributes section', () => {
  it('no error on first composition', () => {
    const component = mount(<Physical name="physical" />)
    expect(component.find('.pounds input').length).toEqual(1)
    expect(component.find('.feet input').length).toEqual(1)
    expect(component.find('.inches input').length).toEqual(1)
    expect(component.find('.hair-colors').length).toBeGreaterThan(0)
    expect(component.find('.eye-colors input').length).toBeGreaterThan(0)
    expect(component.find('.sex input').length).toBeGreaterThan(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('loads data into physical section', () => {
    let updates = 0
    let data = {
      Comments: 'Hello',
      EyeColor: 'Black',
      HairColor: ['Bald'],
      Height: {
        feet: 5,
        inches: 10
      },
      Sex: 'Male',
      Weight: 180,
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Physical name="physical" {...data} />)
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
    expect(updates).toBeGreaterThan(0)
  })
})
