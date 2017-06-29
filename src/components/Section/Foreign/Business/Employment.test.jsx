import React from 'react'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The foreign business employment component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'No'
    }
    const component = mount(<Employment {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'Yes'
    }
    const component = mount(<Employment {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'Yes',
      onError: (value, arr) => {
        validated = true
        return arr
      }
    }
    const component = mount(<Employment {...expected} />)
    component.find('.branch .yes input').at(0).simulate('change')
    component.find('.branch .yes input').at(0).simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'Yes',
      List: [{
        Item: {
          Address: { country: 'United States' },
          Accepted: 'Yes'
        }
      }],
      onUpdate: () => { updates++ }
    }
    const component = mount(<Employment {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.employment-name .first input').simulate('change')
    component.find('.employment-description textarea').simulate('change')
    component.find('.employment-date .day input').simulate('change')
    component.find('.employment-address .yes input').simulate('change')
    component.find('.employment-accepted .yes input').simulate('change')
    component.find('.employment-explanation textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
