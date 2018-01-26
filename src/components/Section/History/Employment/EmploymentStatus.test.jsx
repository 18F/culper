import React from 'react'
import { mount } from 'enzyme'
import EmploymentStatus from './EmploymentStatus'

describe('The employment status component', () => {
  it('selects an employment status', () => {
    let counter = 0
    let expected = {
      onUpdate: () => {
        counter++
      }
    }

    const component = mount(<EmploymentStatus {...expected} />)
    const selected = component.find('.employment-status .fulltime input')
    selected.simulate('change')
    expect(counter).toBe(1)
  })
})
