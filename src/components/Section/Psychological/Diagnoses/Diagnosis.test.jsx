import React from 'react'
import { mount } from 'enzyme'
import Diagnosis from './Diagnosis'

describe('The Diagnosis component', () => {
  it('Renders without errors', () => {
    const component = mount(<Diagnosis />)
    expect(component.find('.diagnosis').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<Diagnosis onUpdate={onUpdate} />)
    component.find('.diagnosis-condition-psychotic input').simulate('change')
    component
      .find('.datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('.person .treatment input[name="Name"]').simulate('change')
    component.find('.facility .treatment input[name="Name"]').simulate('change')
    component.find('.effective .yes input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Performs updates and shows explanation', () => {
    let updates = 0
    const props = {
      Effective: {
        value: 'No'
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Diagnosis {...props} />)
    component.find('textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
