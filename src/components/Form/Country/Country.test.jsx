import React from 'react'
import { mount } from 'enzyme'
import Country from './Country'

describe('The Country component', () => {
  it('renders', () => {
    const expected = {
      name: 'country',
      value: ''
    }
    const component = mount(<Country {...expected} />)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renders with values', () => {
    const expected = {
      name: 'country',
      value: 'Germany',
      onBlur: () => {},
      onFocus: () => {}
    }
    const options = [{ name: 'Belgium', value: 'Belgium' }].map(x => {
      return (
        <option key={x.value} value={x.value}>
          {x.name}
        </option>
      )
    })
    const component = mount(<Country {...expected}>{options}</Country>)
    component.find('.country input').simulate('change', {
      target: {
        value: 'Belg'
      }
    })
    component.find('.country input').simulate('focus')
    expect(
      component.find('.react-autosuggest__suggestions-list').length
    ).toBeGreaterThan(0)
    component.find('.country input').simulate('blur')
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
