import React from 'react'
import { mount } from 'enzyme'
import ConferenceContacts from './ConferenceContacts'

describe('The foreign business conference contacts component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-conferences-contacts',
      List: {
        items: [{ Item: { Has: { value: 'No' } } }]
      }
    }
    const component = mount(<ConferenceContacts {...expected} />)
    expect(component.find('.conferences-explanation').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-conferences-contacts',
      List: {
        items: [{ Item: { Has: { value: 'Yes' } } }]
      }
    }
    const component = mount(<ConferenceContacts {...expected} />)
    expect(component.find('.conferences-explanation').length).toBe(1)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences-contacts',
      List: {
        items: [{ Item: { Has: { value: 'Yes' } } }]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ConferenceContacts {...expected} />)
    component.find('.conferences-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
