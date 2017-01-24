import React from 'react'
import { shallow } from 'enzyme'
import ApoFpoAddress from './ApoFpoAddress'

describe('The ApoFpoAddress component', () => {
  it('renders', () => {
    const expected = {
      name: 'apoFpoAddress',
      value: ''
    }
    const component = shallow(<ApoFpoAddress {...expected} />)
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
