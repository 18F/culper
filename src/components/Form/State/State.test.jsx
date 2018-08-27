import React from 'react'
import { shallow, mount } from 'enzyme'
import State from './State'

describe('The State component', () => {
  it('renders', () => {
    const expected = {
      name: 'state',
      className: 'state',
      value: ''
    }
    const component = shallow(<State {...expected} />).dive()
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renders with short value', () => {
    const expected = {
      name: 'state',
      className: 'state',
      value: 'Arizona',
      onBlur: () => {},
      onFocus: () => {}
    }
    const component = mount(<State {...expected} />)
    component.find('.state input').simulate('change', {
      target: {
        value: 'AZ'
      }
    })
    component.find('.state input').simulate('focus')
    expect(
      component.find('.react-autosuggest__suggestions-list').length
    ).toBeGreaterThan(0)
    component.find('.state input').simulate('blur')
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renders with long value', () => {
    const expected = {
      name: 'state',
      value: 'Arizona',
      className: 'state',
      onBlur: () => {},
      onFocus: () => {}
    }
    const component = mount(<State {...expected} />)
    component.find('.state input').simulate('change', {
      target: {
        value: 'arizona'
      }
    })
    component.find('.state input').simulate('focus')
    expect(
      component.find('.react-autosuggest__suggestions-list').length
    ).toBeGreaterThan(0)
    component.find('.state input').simulate('blur')
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
