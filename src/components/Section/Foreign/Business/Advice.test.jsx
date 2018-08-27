import React from 'react'
import { mount } from 'enzyme'
import Advice from './Advice'

describe('The foreign business advice component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-advice',
      HasForeignAdvice: { value: 'No' }
    }
    const component = mount(<Advice {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-advice',
      HasForeignAdvice: { value: 'Yes' }
    }
    const component = mount(<Advice {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-advice',
      HasForeignAdvice: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      }
    }
    const component = mount(<Advice {...expected} />)
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('change')
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-advice',
      HasForeignAdvice: { value: 'Yes' },
      List: { items: [{}] },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Advice {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.advice-description textarea').simulate('change')
    component.find('.advice-name .first input').simulate('change')
    component.find('.advice-organization input').simulate('change')
    component.find('.advice-country input').simulate('change')
    component.find('.advice-dates .to .day input').simulate('change')
    component.find('.advice-compensation textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
