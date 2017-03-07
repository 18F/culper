import React from 'react'
import { shallow } from 'enzyme'
import MilitaryState from './MilitaryState'

describe('The MilitaryState component', () => {
  it('renders', () => {
    const expected = {
      name: 'militaryState',
      value: ''
    }
    const component = shallow(<MilitaryState {...expected} />).dive()
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
