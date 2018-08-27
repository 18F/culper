import React from 'react'
import { mount } from 'enzyme'
import DrugPublicSafetyUses from './DrugPublicSafetyUses'

describe('The DrugPublicSafetyUses component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugPublicSafetyUses />)
    expect(component.find('.drug-public-safety-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugPublicSafetyUses onUpdate={onUpdate} />)
    expect(component.find('.drug-public-safety-uses').length).toBe(1)
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
          DrugPublicSafetyUse: {
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
      <DrugPublicSafetyUses
        onUpdate={onUpdate}
        UsedDrugs={{ value: 'Yes' }}
        List={list}
      />
    )
    expect(component.find('.drug-public-safety-uses').length).toBe(1)
    component
      .find('.description textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
