import React from 'react'
import { mount } from 'enzyme'
import Gambling from './Gambling'

let gamblingData = {
  branch: {},
  items: [
    {
      Actions: {
        name: 'Actions',
        value: 'No actions'
      },
      Dates: {
        from: new Date(),
        name: 'Dates',
        present: null,
        title: 'Date Range',
        to: new Date()
      },
      Description: {
        name: 'Description',
        value: 'Hello'
      },
      Losses: {
        name: 'Losses',
        value: '1000'
      }
    }
  ]
}

describe('The gambling component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'gambling'
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(0)
  })

  it('selects yes and loads form', () => {
    const expected = {
      name: 'gambling',
      HasGamblingDebt: { value: 'Yes' },
      List: { branch: {}, items: [{}] }
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.details').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'gambling'
    }
    const component = mount(<Gambling {...expected} />)
    component.find('.has-gambling-debt .no input').simulate('change')
    expect(component.find('.details').length).toBe(0)
  })

  it('load data and add another gambling debt', () => {
    let update = 0
    const expected = {
      name: 'gambling',
      List: gamblingData,
      HasGamblingDebt: { value: 'Yes' },
      onUpdate: () => {
        update++
      }
    }
    const component = mount(<Gambling {...expected} />)
    update = 0
    component.find('.addendum .yes input').simulate('change')
    expect(update).toBe(1)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      HasGamblingDebt: { value: 'Yes' },
      List: { branch: {}, items: [{}] }
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.losses').length).toEqual(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      HasGamblingDebt: { value: 'No' },
      List: { branch: {}, items: [{}] }
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.losses').length).toEqual(0)
  })

  it('can make fancy numbers', () => {
    const expected = {
      HasGamblingDebt: { value: 'No' },
      List: { branch: {}, items: [{}] }
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.instance().fancyNumber(1000)).toEqual('1,000')
    expect(component.instance().fancyNumber(10000)).toEqual('10,000')
  })
})
