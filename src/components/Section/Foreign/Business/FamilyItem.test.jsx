import React from 'react'
import { mount } from 'enzyme'
import FamilyItem from './FamilyItem'

describe('The family item component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-family',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<FamilyItem {...expected} />)
    component.find('.family-name .first input').simulate('change')
    component.find('.family-agency input').simulate('change')
    component
      .find('.family-country .react-autosuggest__container input')
      .simulate('change', { target: { value: 'C' } })
    component.find('.family-date .day input').simulate('change')
    component.find('.family-circumstances textarea').simulate('change')
    expect(updates).toBe(5)
  })
})
