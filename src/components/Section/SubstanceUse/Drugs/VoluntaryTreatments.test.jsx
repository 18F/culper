import React from 'react'
import { mount } from 'enzyme'
import VoluntaryTreatments from './VoluntaryTreatments'

describe('The VoluntaryTreatments component', () => {
  it('Renders without errors', () => {
    const component = mount(<VoluntaryTreatments />)
    expect(component.find('.voluntary-treatments').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<VoluntaryTreatments onUpdate={onUpdate} />)
    expect(component.find('.voluntary-treatments').length).toBe(1)
    component.find('.treatment-voluntary .yes input').simulate('change')
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
          VoluntaryTreatment: {
            TreatmentProvider: {
              value: 'Provider'
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
            TreatmentDates: {
              from: {
                date: new Date('1/1/2010')
              },
              to: {
                date: new Date('1/1/2012')
              }
            },
            TreatmentCompleted: 'Yes'
          }
        }
      ]
    }
    const component = mount(
      <VoluntaryTreatments
        onUpdate={onUpdate}
        TreatmentVoluntary={{ value: 'Yes' }}
        List={list}
      />
    )
    expect(component.find('.voluntary-treatments').length).toBe(1)
    component.find('.treatment-provider input').simulate('change')
    expect(updates).toBe(2)
  })
})
