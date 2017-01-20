import React from 'react'
import { shallow } from 'enzyme'
import State from './State'

describe('The State component', () => {
  it('renders', () => {
    const expected = {
      name: 'state',
      value: ''
    }
    const component = shallow(<State {...expected} />).dive()
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
