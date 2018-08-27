import React from 'react'
import { mount } from 'enzyme'
import Supervisor from './Supervisor'

describe('The employment supervisor component', () => {
  it('responds to updates', () => {
    let updates = 0
    const expected = {
      name: 'supervisor',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Supervisor {...expected} />)
    component.find('.supervisor-name input').simulate('change')
    component.find('.supervisor-title input').simulate('change')
    component.find('.supervisor-email input').simulate('change')
    component.find('.supervisor-email-na.button input').simulate('change')
    component
      .find('.supervisor-address .street input')
      .at(0)
      .simulate('change')
    component
      .find('.supervisor-telephone .number input')
      .at(0)
      .simulate('change')
    expect(updates).toEqual(6)
  })
})
