
import React from 'react'
import { mount } from 'enzyme'
import OrderedCounselings from './OrderedCounselings'

describe('The OrderedCounselings component', () => {
  it('Renders without errors', () => {
    const component = mount(<OrderedCounselings />)
    expect(component.find('.ordered-counselings').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<OrderedCounselings onUpdate={onUpdate} />)
    expect(component.find('.ordered-counselings').length).toBe(1)
    component.find('.has-been-ordered .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ },
      HasBeenOrdered: 'Yes',
      ListBranch: 'No',
      List: [{
        OrderedCounseling: {
          ActionTaken: 'Yes',
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
          TreatmentProviderTelephone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          },
          CompletedTreatment: 'Yes'
        }
      }]
    }
    const component = mount(<OrderedCounselings {...expected} />)
    component.find('.seekers .seekers-employer input').simulate('change')
    expect(updates).toBe(2)
  })
})
