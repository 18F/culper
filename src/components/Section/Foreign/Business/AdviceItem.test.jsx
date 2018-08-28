import React from 'react'
import { mount } from 'enzyme'
import AdviceItem from './AdviceItem'

describe('The advice item component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-advice',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<AdviceItem {...expected} />)
    component.find('.advice-description textarea').simulate('change')
    component.find('.advice-name .first input').simulate('change')
    component.find('.advice-organization input').simulate('change')
    component.find('.advice-dates .to .day input').simulate('change')
    component.find('.advice-compensation textarea').simulate('change')
    component
      .find('.advice-country .react-autosuggest__container input')
      .simulate('change', { target: { value: 'C' } })
    expect(updates).toBe(6)
  })
})
