import React from 'react'
import { mount } from 'enzyme'
import { AppealItem } from './AppealItem'

describe('The appeal item component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<AppealItem {...expected} />)
    component
      .find('.appealcourtname input')
      .first()
      .simulate('change')
    component.find('.appealcourtaddress .city input').simulate('change')
    component
      .find('.disposition input')
      .first()
      .simulate('change')
    expect(updates).toBe(3)
  })
})
