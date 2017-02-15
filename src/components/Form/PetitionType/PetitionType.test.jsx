import React from 'react'
import { mount } from 'enzyme'
import PetitionType from './PetitionType'

describe('The petition type component', () => {
  let onUpdate = () => {}
  let onBlur = () => {}

  it('renders defaults', () => {
    const component = mount(<PetitionType name={'petition'} onUpdate={onUpdate} onBlur={onBlur} />)
    expect(component.find('input[name="petition_type"]').length).toBe(3)
    component.find('input[name="petition_type"]').first().simulate('blur')
    component.find('input[name="petition_type"]').first().simulate('focus')
    component.find('input[name="petition_type"]').first().simulate('change')
  })

  it('renders chapter 13', () => {
    const address = {
      address: '1234 Some Rd'
    }
    const component = mount(<PetitionType name={'petition'} onUpdate={onUpdate} onBlur={onBlur} value="Chapter13" address={address}/>)
    component.find('textarea#address').simulate('change')
    expect(component.find('.trustee').length).toBeGreaterThan(0)
  })
})
