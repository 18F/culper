import React from 'react'
import { mount } from 'enzyme'
import VoluntaryCounselings from './VoluntaryCounselings'
import { Location } from '../../../Form'

describe('The VoluntaryCounselings component', () => {
  it('Renders without errors', () => {
    const component = mount(<VoluntaryCounselings />)
    expect(component.find('.voluntary-counselings').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<VoluntaryCounselings onUpdate={onUpdate} />)
    expect(component.find('.voluntary-counselings').length).toBe(1)
    component.find('.sought-treatment .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      SoughtTreatment: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
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
          }
        ]
      }
    }
    const component = mount(<VoluntaryCounselings {...expected} />)
    component.find('input[name="TreatmentProviderName"]').simulate('change')
    expect(updates).toBe(2)
  })
})
