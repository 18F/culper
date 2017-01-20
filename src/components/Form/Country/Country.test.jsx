import React from 'react'
import { shallow } from 'enzyme'
import Country from './Country'

describe('The Country component', () => {
  it('renders', () => {
    const expected = {
      name: 'country',
      value: ''
    }
    const component = shallow(<Country {...expected} />).dive()
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
