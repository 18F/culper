
import React from 'react'
import { mount } from 'enzyme'
import PetitionType from './PetitionType'

describe('The petition type component', () => {
  it('renders defaults', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<PetitionType {...expected} />)
    expect(component.find('input[name="petition_type"]').length).toBe(4)
    component.find('input[name="petition_type"]').first().simulate('click')
    expect(updates).toBe(1)
  })

  it('renders chapter 13', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ },
      PetitionType: 'Chapter13'
    }
    const component = mount(<PetitionType {...expected} />)
    expect(component.find('.chapter13').length).toBe(1)
    component.find('input[name="chapter13Trustee"]').simulate('change')
    component.find('.address input[name="address"]').simulate('change')
    expect(updates).toBe(2)
  })
})
