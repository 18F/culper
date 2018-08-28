import React from 'react'
import { mount } from 'enzyme'
import DrugClearanceUses from './DrugClearanceUses'

describe('The DrugClearanceUses component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugClearanceUses />)
    expect(component.find('.drug-clearance-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugClearanceUses onUpdate={onUpdate} />)
    expect(component.find('.drug-clearance-uses').length).toBe(1)
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
          DrugClearanceUse: {
            InvolvementDates: {
              from: {
                date: new Date('1/1/2010')
              },
              to: {
                date: new Date('1/1/2012')
              }
            },
            Description: {
              value: 'Foo'
            },
            EstimatedUse: {
              value: 'Foo'
            }
          }
        }
      ]
    }
    const component = mount(
      <DrugClearanceUses
        onUpdate={onUpdate}
        UsedDrugs={{ value: 'Yes' }}
        List={list}
      />
    )
    expect(component.find('.drug-clearance-uses').length).toBe(1)
    component
      .find('.description textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
