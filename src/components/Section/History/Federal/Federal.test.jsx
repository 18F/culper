import React from 'react'
import { mount } from 'enzyme'
import Federal from './Federal'

describe('The federal component', () => {
  it('selects yes and loads form', () => {
    const expected = {
      name: 'federal_service'
    }
    const component = mount(<Federal name={expected.name} />)
    component.find({type: 'radio', name: 'has_federalservice', value: 'Yes'}).simulate('change')
    expect(component.find('.collection').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'federal_service'
    }
    const component = mount(<Federal name={expected.name} />)
    component.find({type: 'radio', name: 'has_federalservice', value: 'No'}).simulate('change')
    expect(component.find('.collection').length).toBe(0)
  })
})
