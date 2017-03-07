import React from 'react'
import { mount, shallow } from 'enzyme'
import { EmploymentItem } from './Employment'

describe('The employment item component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'employment'
    }
    const component = mount(<EmploymentItem name={expected.name} />)
    expect(component.find('h3').length).toEqual(9)
  })
})
