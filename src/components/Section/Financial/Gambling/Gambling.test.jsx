import React from 'react'
import { mount } from 'enzyme'
import Gambling from './Gambling'

let gamblingData = [
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
      name: 'gambling'
    }
    const component = mount(<Gambling name={expected.name} />)
    component.find({type: 'radio', name: 'has_gamblingdebt', value: 'Yes'}).simulate('change')
    expect(component.find('.details').length).toBeGreaterThan(0)
  })

  it('selects no', () => {
    const expected = {
      name: 'gambling'
    }
    const component = mount(<Gambling name={expected.name} />)
    component.find({type: 'radio', name: 'has_gamblingdebt', value: 'No'}).simulate('change')
    expect(component.find('.details').length).toBe(0)
  })

  it('load data and add another gambling debt', () => {
    const expected = {
      name: 'gambling'
    }
    let onUpdate = () => {}
    const component = mount(
      <Gambling
        name={expected.name}
        List={gamblingData}
        HasGamblingDebt={true}
        Comments={'Test'}
        onUpdate={onUpdate}
      />
    )
    component.find({type: 'radio', name: 'has_gamblingdebt', value: 'Yes'}).simulate('change')
    expect(component.find('.details').length).toBeGreaterThan(0)
    component.find('textarea#Comments').simulate('change')

    component.find('button.add').simulate('click')
    expect(component.find('.row.open').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      HasGamblingDebt: 'Yes'
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.losses').length).toEqual(2)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      HasGamblingDebt: 'No'
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.losses').length).toEqual(0)
  })
})
