import React from 'react'
import { shallow } from 'enzyme'
import SelectDropdown from './SelectDropdown'

describe('SelectDropdown Component', () => {
  const requiredProps = {
    name: 'test',
    onChange: jest.fn(),
    onError: jest.fn(),
    value: ''
  }

  it('should render without crashing', () => {
    shallow(
      <SelectDropdown {...requiredProps}>
        <option value="" />
      </SelectDropdown>
    )
  })

  it('should have the proper class names', () => {
    const wrapper = shallow(
      <SelectDropdown
        {...requiredProps}
        className="test-class-name"
      >
        <option value="" />
      </SelectDropdown>
    )

    expect(wrapper.find('.test-class-name').length).toEqual(1)
  })

  it('should render select field success class name when valid', () => {
    const wrapper = shallow(
      <SelectDropdown {...requiredProps}>
        <option value="" />
      </SelectDropdown>
    )

    wrapper.setState({ isValid: true })
    expect(wrapper.find('select.usa-input-success').length).toEqual(1)
  })

  it('should render error class name when errors are present', () => {
    const wrapper = shallow(
      <SelectDropdown {...requiredProps}>
        <option value="" />
      </SelectDropdown>
    )

    wrapper.setState({ hasErrors: true })
    expect(wrapper.find('div.usa-input-error').length).toEqual(1)
  })
})
