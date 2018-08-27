import React from 'react'
import { mount } from 'enzyme'
import DrugInvolvements from './DrugInvolvements'

describe('The DrugInvolvements component', () => {
  it('Renders without errors', () => {
    const component = mount(<DrugInvolvements />)
    expect(component.find('.drug-involvements').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DrugInvolvements onUpdate={onUpdate} />)
    expect(component.find('.drug-involvements').length).toBe(1)
    component.find('.involved .yes input').simulate('change')
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
          DrugInvolvement: {
            DrugType: {
              DrugType: 'Cocaine',
              DrugTypeOther: null
            },
            FirstInvolvement: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            RecentInvolvement: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            NatureOfInvolvement: {
              value: 'Some involvement'
            },
            Reasons: {
              value: 'Some reason'
            },
            InvolvementWhileEmployed: { value: 'Yes' },
            InvolvementWithClearance: { value: 'Yes' },
            InvolvementInFuture: { value: 'No' }
          }
        },
        {
          DrugInvolvement: {
            DrugType: {
              DrugType: 'Cocaine',
              DrugTypeOther: null
            },
            FirstInvolvement: {
              day: '1',
              month: '1',
              year: '2016'
            },
            NatureOfInvolvement: {
              value: 'Some involvement'
            },
            Reasons: {
              value: 'Some reason'
            },
            InvolvementWhileEmployed: { value: 'Yes' },
            InvolvementWithClearance: { value: 'Yes' },
            InvolvementInFuture: { value: 'No' }
          }
        }
      ]
    }
    const component = mount(
      <DrugInvolvements
        onUpdate={onUpdate}
        Involved={{ value: 'Yes' }}
        List={list}
      />
    )
    expect(component.find('.drug-involvements').length).toBe(1)
    component
      .find('.reasons textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
