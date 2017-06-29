import React from 'react'
import { mount } from 'enzyme'
import ReleaseOfGeneralAndMedical from './ReleaseOfGeneralAndMedical'

describe('The ReleaseOfGeneralAndMedical Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<ReleaseOfGeneralAndMedical {...expected} />)
    expect(component.find('.general-medical-release').length).toBe(1)
    component.find('.general-release .fullname input').simulate('change')
    component.find('.medical-release .fullname input').simulate('change')
    expect(updates).toBe(2)
  })
})
