import React from 'react'
import { mount } from 'enzyme'
import ConferenceContacts from './ConferenceContacts'

describe('The foreign business conference contacts component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences-contacts',
      onUpdate: () => { updates++ }
    }
    const component = mount(<ConferenceContacts {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.conferences-explanation').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences-contacts',
      onUpdate: () => { updates++ }
    }
    const component = mount(<ConferenceContacts {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.conferences-explanation').length).toBe(1)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences-contacts',
      onUpdate: () => { updates++ }
    }
    const component = mount(<ConferenceContacts {...expected} />)
    component.find('.branch .yes input').simulate('change')
    component.find('.conferences-explanation textarea').simulate('change')
    expect(updates).toBe(2)
  })
})
