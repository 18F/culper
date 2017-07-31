import React from 'react'
import { mount } from 'enzyme'
import CitizenshipItem from './CitizenshipItem'

describe('The citizenship item component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'citizenshipItem',
      Renounced: 'Yes',
      Dates: {
        from: {
          date: new Date('1/1/2010')
        },
        to: {
          date: new Date('1/1/2012')
        },
        present: true
      },
      Current: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<CitizenshipItem {...expected} />)
    component.find('.citizenship-country .country input').simulate('change', { target: { name: 'Country', value: 'United States' } })
    component.find({ type: 'checkbox', value: 'present' }).simulate('change')
    component.find('.citizenship-how textarea').simulate('change')
    component.find('.citizenship-renounced .yes input').simulate('change')
    component.find('.citizenship-renounced-explanation textarea').simulate('change')
    component.find('.citizenship-current .yes input').simulate('change')
    component.find('.citizenship-current-explanation textarea').simulate('change')
    expect(updates).toBe(7)
  })
})
