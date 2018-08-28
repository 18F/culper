import React from 'react'
import { mount } from 'enzyme'
import Contact from './Contact'

describe('The foreign business contact component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-contact',
      HasForeignContact: { value: 'No' }
    }
    const component = mount(<Contact {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-contact',
      HasForeignContact: { value: 'Yes' }
    }
    const component = mount(<Contact {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-contact',
      HasForeignContact: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      }
    }
    const component = mount(<Contact {...expected} />)
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
      name: 'foreign-business-contact',
      HasForeignContact: { value: 'Yes' },
      List: {
        items: [
          {
            Name: {},
            Location: {},
            Date: {},
            Governments: {},
            Establishment: {},
            Representatives: {},
            Purpose: {},
            SubsequentContacts: {}
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Contact {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    updates = 0
    component
      .find('.foreign-business-contact-name .first input')
      .simulate('change')
    component
      .find('.foreign-business-contact-location .yes input')
      .simulate('change')
    component
      .find('.foreign-business-contact-date .day input')
      .simulate('change')
    component
      .find('.foreign-business-contact-establishment textarea')
      .simulate('change')
    component
      .find('.foreign-business-contact-representatives textarea')
      .simulate('change')
    component
      .find('.foreign-business-contact-purpose textarea')
      .simulate('change')
    component.find('.has-foreign-contacts .no input').simulate('change')
    expect(updates).toBe(7)
  })
})
