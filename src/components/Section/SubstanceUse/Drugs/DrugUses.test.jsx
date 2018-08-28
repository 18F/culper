import React from 'react'
import { mount } from 'enzyme'
import DrugUses from './DrugUses'

describe('The DrugUses component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugUses />)
    expect(component.find('.drug-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugUses onUpdate={onUpdate} />)
    expect(component.find('.drug-uses').length).toBe(1)
    component.find('.used-drugs .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const list = {
      items: [
        {
          DrugUse: {
            DrugType: {
              DrugType: 'Cocaine',
              DrugTypeOther: null
            },
            FirstUse: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            RecentUse: {
              day: '1',
              month: '1',
              year: '2016'
            },
            NatureOfUse: {
              value: 'Some use'
            },
            UseWhileEmployed: 'Yes',
            UseWithClearance: 'Yes',
            UseInFuture: 'No',
            Explanation: {
              value: 'Foo'
            }
          }
        },
        {
          DrugUse: {
            DrugType: {
              DrugType: 'Other',
              DrugTypeOther: 'Zombie'
            },
            NatureOfUse: {
              value: 'Some use'
            },
            UseWhileEmployed: 'Yes',
            UseWithClearance: 'Yes',
            UseInFuture: 'No',
            Explanation: {
              value: 'Foo'
            }
          }
        },
        {
          DrugUse: {}
        }
      ]
    }
    const component = mount(
      <DrugUses onUpdate={onUpdate} UsedDrugs={{ value: 'Yes' }} List={list} />
    )
    expect(component.find('.drug-uses').length).toBe(1)
    component
      .find('.explanation textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
