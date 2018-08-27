import React from 'react'
import { mount } from 'enzyme'
import CheckboxGroup from './CheckboxGroup'
import Checkbox from '../Checkbox'

describe('The CheckboxGroup component', () => {
  it('renders checkbox button children', () => {
    const component = mount(
      <CheckboxGroup name={'rgroup'}>
        <Checkbox value="Option1" />
        <Checkbox value="Option2" />
      </CheckboxGroup>
    )
    expect(component.find('input[type="checkbox"]').length).toBe(2)
  })

  it('renders checkbox button children with selected radio', () => {
    const component = mount(
      <CheckboxGroup name={'rgroup'} selectedValues={['Option1']}>
        <Checkbox value="Option1" />
        <Checkbox value="Option2" />
      </CheckboxGroup>
    )

    expect(
      component
        .find('input[type="checkbox"]')
        .first()
        .props().checked
    ).toBe(true)
  })

  it('renders checkbox button children with selected func', () => {
    let selectedValueFunc = props => {
      return props.value === 'Option1'
    }

    const component = mount(
      <CheckboxGroup name={'rgroup'} selectedValueFunc={selectedValueFunc}>
        <Checkbox value="Option1" />
        <Checkbox value="Option2" />
      </CheckboxGroup>
    )

    expect(
      component
        .find('input[type="checkbox"]')
        .first()
        .props().checked
    ).toBe(true)
  })

  it('renders checkbox button children', () => {
    const component = mount(
      <CheckboxGroup required={true} name={'rgroup'} selectedValues={[]}>
        <Checkbox value="Option1" />
        <Checkbox value="Option2" />
      </CheckboxGroup>
    )
    expect(component.find('.usa-input-error').length).toBe(1)
  })
})
