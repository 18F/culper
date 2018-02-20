import React from 'react'
import { mount } from 'enzyme'
import OrderedCounselings from './OrderedCounselings'
import { Location } from '../../../Form'

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
      HasBeenOrdered: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [{
          Item: {
            ActionTaken: { value: 'Yes' },
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
              country: 'United States',
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            },
            TreatmentProviderTelephone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              timeOfDay: 'Both',
              extension: ''
            },
            CompletedTreatment: { value: 'Yes' }
          }
        }]
      }
    }
    const component = mount(<OrderedCounselings {...expected} />)
    component.find('.seekers .seekers-employer input').simulate('change')
    expect(updates).toBe(2)
  })

  it('Summary accordion text for seeker options', () => {
    const expected = {
      HasBeenOrdered: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [{
          Item: {
            Seekers: { values: ['Employer', 'MedicalProfessional', 'MentalHealthProfessional', 'CourtOfficial', 'NotOrdered', 'Other'] }
          }
        }]
      }
    }
    const component = mount(<OrderedCounselings {...expected} />)
    const text = component.find('.item').text()
    let options = ['Employer', 'Medical professional', 'Court official', 'Not ordered', 'Other']
    options.forEach(o => {
      expect(text.indexOf(o)).toBeGreaterThan(-1)
    })
  })
})
