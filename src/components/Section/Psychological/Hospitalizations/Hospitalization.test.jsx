import React from 'react'
import { mount } from 'enzyme'
import Hospitalization from './Hospitalization'

describe('The Hospitalization component', () => {
  it('Renders without errors', () => {
    const component = mount(<Hospitalization />)
    expect(component.find('.hospitalization').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<Hospitalization onUpdate={onUpdate} />)
    expect(component.find('.hospitalization').length).toBe(1)
    expect(component.find('input[name="Explanation"]').length).toBe(0)
    component
      .find('.datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('input[name="Facility"]').simulate('change')
    component.find('input[name="address"]').simulate('change')
    component.find({ type: 'radio', value: 'Voluntary' }).simulate('change')
    expect(updates).toBe(4)
  })

  it('Performs updates with explanation', () => {
    let updates = 0
    const admission = { value: 'Voluntary' }
    const onUpdate = () => {
      updates++
    }
    const component = mount(
      <Hospitalization onUpdate={onUpdate} Admission={admission} />
    )
    expect(component.find('.hospitalization').length).toBe(1)
    expect(component.find('textarea[name="Explanation"]').length).toBe(1)
    component.find('textarea').simulate('change')
    expect(updates).toBe(1)
  })

  it('Loads data', () => {
    let updates = 0
    const item = {
      Facility: {
        value: 'Place 1'
      },
      FacilityAddress: {
        country: 'United States',
        street: '1234 Some Rd',
        city: 'Arlington',
        state: 'Virginia',
        zipcode: '22202'
      },
      TreatmentDate: {
        from: {
          date: new Date('1/1/2010')
        },
        to: {
          date: new Date('1/1/2012')
        },
        present: false
      },
      Admission: 'Voluntary',
      Explanation: {
        value: 'Because I can'
      }
    }
    const onUpdate = () => {
      updates++
    }
    const component = mount(<Hospitalization onUpdate={onUpdate} {...item} />)
    expect(component.find('.hospitalization').length).toBe(1)
    component.find('textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
