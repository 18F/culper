import React from 'react'
import { mount } from 'enzyme'
import FederalItem from './FederalItem'

describe('The federal item component', () => {
  it('recieves updates from children', () => {
    let updates = 0
    const expected = {
      name: 'federal_service',
      HasFederalService: 'Yes',
      List: [{}],
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<FederalItem {...expected} />)
    component.find({ type: 'text', name: 'Position' }).simulate('change')
    component.find({ type: 'text', name: 'Name' }).simulate('change')
    component
      .find('.datecontrol .day input')
      .first()
      .simulate('change')
    component.find('.mailing input').simulate('change')
    expect(updates).toBeGreaterThan(3)
  })
})
