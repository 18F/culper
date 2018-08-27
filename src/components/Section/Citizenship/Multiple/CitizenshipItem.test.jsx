import React from 'react'
import { mount } from 'enzyme'
import CitizenshipItem from './CitizenshipItem'

describe('The citizenship item component', () => {
  it('display display question for current citizenship if NOT present', () => {
    const props = {
      Dates: {
        from: {},
        to: {},
        present: true
      }
    }
    const component = mount(<CitizenshipItem {...props} />)
    expect(component.find('.citizenship-current').length).toBe(0)
  })

  it('display display question for current citizenship if NOT present', () => {
    const props = {
      Dates: {
        from: {
          date: new Date('1/1/2009')
        },
        to: {
          date: new Date('1/1/2010')
        },
        present: false
      }
    }
    const component = mount(<CitizenshipItem {...props} />)
    expect(component.find('.citizenship-current').length).toBe(1)
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'citizenshipItem',
      Renounced: { value: 'Yes' },
      Dates: {
        from: {
          date: new Date('1/1/2010')
        },
        to: {
          date: new Date('1/1/2012')
        },
        present: false
      },
      Current: { value: 'Yes' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<CitizenshipItem {...expected} />)
    component
      .find('.citizenship-country .country input')
      .simulate('change', {
        target: { name: 'Country', value: 'United States' }
      })
    component.find('.citizenship-dates .to .year input').simulate('change')
    component.find('.citizenship-how textarea').simulate('change')
    component.find('.citizenship-renounced .yes input').simulate('change')
    component
      .find('.citizenship-renounced-explanation textarea')
      .simulate('change')
    component.find('.citizenship-current .yes input').simulate('change')
    component
      .find('.citizenship-current-explanation textarea')
      .simulate('change')
    expect(updates).toBe(7)
  })
})
