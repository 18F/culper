import React from 'react'
import { shallow, mount } from 'enzyme'
import Country from './Country'

describe('The Country component', () => {
  it('renders', () => {
    const expected = {
      name: 'country',
      value: ''
    }
    const component = mount(<Country {...expected} />)
    expect(component.length).toBe(1)
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

  it('filters out and displays the correct country', () => {
    const props = {
      name: 'country',
      value: 'dOmiNiCa'
    }

    const wrapper = shallow(<Country {...props} />)
    const component = wrapper.instance()
    expect(component.filterValidCountries(props.value).length).toBe(1)

    const fixture = 'Dominica'
    expect(component.filterValidCountries(props.value)[0].value).toEqual(fixture)
  })
})
