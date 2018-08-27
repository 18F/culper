import React from 'react'
import { mount } from 'enzyme'
import ReceivedCounselings from './ReceivedCounselings'
import { Location } from '../../../Form'

describe('The ReceivedCounselings component', () => {
  it('Renders without errors', () => {
    const component = mount(<ReceivedCounselings />)
    expect(component.find('.received-counselings').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<ReceivedCounselings onUpdate={onUpdate} />)
    expect(component.find('.received-counselings').length).toBe(1)
    component.find('.received-treatment .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      ReceivedTreatment: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              UseSameAddress: 'Yes',
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
              TreatmentBeganDate: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              AgencyName: {
                value: 'The agency name'
              },
              TreatmentEndDate: {
                day: '1',
                month: '1',
                year: '2016',
                date: new Date('1/1/2016')
              },
              CompletedTreatment: 'Yes',
              NoCompletedTreatmentExplanation: {
                value: 'Foo'
              }
            }
          }
        ]
      }
    }
    const component = mount(<ReceivedCounselings {...expected} />)
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    expect(updates).toBe(2)
  })
})
