import React from 'react'
import { mount } from 'enzyme'
import CardItem from './CardItem'

describe('The card item component', () => {
  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'card-abuse',
      onUpdate: obj => {
        updates++
      }
    }
    const component = mount(<CardItem {...expected} />)
    component
      .find('.card-agency input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.card-address .mailing input')
      .simulate('change', { target: { value: '123 Some Rd' } })
    component
      .find('.card-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.card-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.card-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component.find('.card-estimated input').simulate('change')
    component
      .find('.card-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBe(7)
  })
})
