import React from 'react'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'

describe('The Dropdown component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'state',
      value: '',
      className: 'dropdown-test'
    }
    const component = shallow(
      <Dropdown {...expected}>
        <option value="test">Test</option>
      </Dropdown>
    )
    expect(component.find('div.dropdown-test').length).toEqual(1)
  })
})
