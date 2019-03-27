import React from 'react'
import { mount } from 'enzyme'
import { OrderedTreatments } from './OrderedTreatments'

describe('The OrderedTreatments component', () => {
  it('Renders without errors', () => {
    const component = mount(<OrderedTreatments />)
    expect(component.find('.ordered-treatments').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates += 1
    }
    const component = mount(<OrderedTreatments onUpdate={onUpdate} />)
    expect(component.find('.ordered-treatments').length).toBe(1)
    component.find('.treatment-ordered .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const onUpdate = () => {
      updates += 1
    }
    const list = {
      items: [
        {
          OrderedTreatment: {
            OrderedBy: ['Employer'],
            Explanation: {
              value: 'The explanation',
            },
            ActionTaken: 'Yes',
            DrugType: 'Cocaine',
            TreatmentProvider: {
              value: 'Provider',
            },
            TreatmentProviderAddress: {
              country: 'United States',
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS,
            },
            TreatmentProviderTelephone: {
              noNumber: '',
              number: '7031112222',
              numberType: 'Home',
              timeOfDay: 'Both',
              extension: '',
            },
            TreatmentDates: {
              from: {
                month: '1',
                day: '1',
                year: '2010',
              },
              to: {
                month: '1',
                day: '1',
                year: '2012',
              },
            },
            TreatmentCompleted: 'Yes',
          },
        },
      ],
    }
    const component = mount(
      <OrderedTreatments
        onUpdate={onUpdate}
        TreatmentOrdered={{ value: 'Yes' }}
        List={list}
      />
    )
    expect(component.find('.ordered-treatments').length).toBe(1)
    component.find('.explanation textarea').simulate('change')
    expect(updates).toBe(2)
  })
})
