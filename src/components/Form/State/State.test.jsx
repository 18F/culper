import React from 'react'
import { shallow, mount } from 'enzyme'
import State from './State'
import { unitedStates, otherUsTerritories } from '../../../validators/location'

describe('The State component', () => {
  it('renders', () => {
    const expected = {
      name: 'state',
      className: 'state',
      value: ''
    }

    shallow(<State {...expected} />)
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

  it('returns the typed input', () => {
    const expected = {
      name: 'state',
      value: 'gibberish',
      className: 'state',
      onBlur: () => {},
      onFocus: () => {}
    }
    const component = shallow(<State {...expected} />)
    const instance = component.instance()
    expect(instance.getStatePostalCode('gibberish')).toEqual('gibberish')
  })

  it('returns the uppercased state postal code', () => {
    const props = {
      name: 'state',
      value: 'oregon',
      className: 'state',
      onBlur: () => {},
      onFocus: () => {}
    }

    const component = shallow(<State {...props} />)
    const instance = component.instance()
    expect(instance.getStatePostalCode('oregon')).toEqual('OR')
  })

  it('returns additional states renderd through props', () => {
    const expected = {
      name: 'state',
      value: 'gibberish',
      className: 'state',
      onBlur: () => {},
      onFocus: () => {},
      additionalStates: [{ name: 'Test State', postalCode: 'CH' }]
    }
    const component = mount(<State {...expected} />)
    const instance = component.instance()
    expect(instance.states.length).toEqual(unitedStates.length + otherUsTerritories.length + 1)
  })

  it('calls the onUpdate function with the correct arguments', () => {
    const props = {
      name: 'state',
      value: 'ca',
      className: 'state',
      onBlur: () => {},
      onFocus: () => {},
      onUpdate: jest.fn()
    }

    const component = shallow(<State {...props} />)
    const instance = component.instance()
    instance.handleUpdate({ value: 'ca' })
    expect(props.onUpdate).toHaveBeenCalledTimes(1)
    expect(props.onUpdate).toHaveBeenCalledWith({ value: 'CA' })
  })
})
