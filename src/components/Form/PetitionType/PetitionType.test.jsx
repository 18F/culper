import React from 'react'
import { mount } from 'enzyme'
import PetitionType from './PetitionType'

describe('The petition type component', () => {
  it('renders defaults', () => {
    let blur = 0
    let updates = 0
    let onUpdate = () => { updates++ }
    let onBlur = () => { blur++ }
    const component = mount(<PetitionType name={'petition'} onUpdate={onUpdate} onBlur={onBlur} />)
    component.find('input[name="petition_type"]').first().simulate('blur')
    component.find('input[name="petition_type"]').first().simulate('focus')
    component.find('input[name="petition_type"]').first().simulate('change')
    expect(component.find('input[name="petition_type"]').length).toBe(4)
    expect(blur).toBe(1)
    expect(updates).toBe(1)
  })

  it('renders chapter 13', () => {
    const address = {
      address: '1234 Some Rd'
    }
    const component = mount(<PetitionType name={'petition'} value="Chapter13" address={address}/>)
    component.find('textarea#address').simulate('change')
    expect(component.find('.trustee').length).toBeGreaterThan(0)
  })
})
