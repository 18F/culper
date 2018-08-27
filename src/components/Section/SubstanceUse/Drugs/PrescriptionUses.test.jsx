import React from 'react'
import { mount } from 'enzyme'
import PrescriptionUses from './PrescriptionUses'

describe('The PrescriptionUses component', () => {
  it('Renders without errors', () => {
    const component = mount(<PrescriptionUses />)
    expect(component.find('.prescription-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<PrescriptionUses onUpdate={onUpdate} />)
    expect(component.find('.prescription-uses').length).toBe(1)
    component.find('.misused .yes input').simulate('change')
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
          DrugPrescriptionUse: {
            InvolvementDates: {
              from: {
                date: new Date('1/1/2010')
              },
              to: {
                date: new Date('1/1/2012')
              }
            },
            PrescriptionName: {
              value: 'Foo'
            },
            Reason: {
              value: 'The reason'
            },
            UseWhileEmployed: 'Yes',
            UseWithClearance: 'Yes'
          }
        }
      ]
    }
    const component = mount(
      <PrescriptionUses
        onUpdate={onUpdate}
        MisusedDrugs={{ value: 'Yes' }}
        List={list}
      />
    )
    expect(component.find('.prescription-uses').length).toBe(1)
    component
      .find('.reason textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
