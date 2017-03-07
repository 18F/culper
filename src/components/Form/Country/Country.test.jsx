import React from 'react'
import { shallow, mount } from 'enzyme'
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

  it('renders with values', () => {
    const expected = {
      name: 'country',
      value: 'Germany',
      onBlur: () => {},
      onFocus: () => {}
    }
    const component = mount(<Country {...expected} />)
    component.find('input#country').simulate('change', {
      target: {
        value: 'Belg'
      }
    })
    component.find('input#country').simulate('focus')
    expect(component.find('.react-autosuggest__suggestions-list').length).toBeGreaterThan(0)
    component.find('input#country').simulate('blur')
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
