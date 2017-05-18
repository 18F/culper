import React from 'react'
import { mount } from 'enzyme'
import ReceivedCounselings from './ReceivedCounselings'

describe('The ReceivedCounselings component', () => {
  it('Renders without errors', () => {
    const component = mount(<ReceivedCounselings />)
    expect(component.find('.received-counselings').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ReceivedCounselings onUpdate={onUpdate} />)
    expect(component.find('.received-counselings').length).toBe(1)
    component.find('.received-treatment .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ },
      ReceivedTreatment: 'Yes',
      ListBranch: 'No',
      List: [{
        ReceivedCounseling: {
          CounselingDates: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          },
          TreatmentProviderName: {
            value: 'The name'
          },
          TreatmentProviderAddress: {
            addressType: 'United States',
            address: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202'
          },
          CompletedTreatment: 'Yes'
        }
      }]
    }
    const component = mount(<ReceivedCounselings {...expected} />)
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    expect(updates).toBe(2)
  })
})
