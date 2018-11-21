import React from 'react'
import { mount } from 'enzyme'
import RadioGroup from './RadioGroup'
import Radio from '../Radio'

describe('The RadioGroup component', () => {
  it('renders radio button children', () => {
    const component = mount(
      <RadioGroup name={'rgroup'}>
        <Radio value="Option1" />
        <Radio value="Option2" />
      </RadioGroup>
    )
    expect(component.find('input[type="radio"]').length).toBe(2)
  })

  it('renders radio button children with selected radio', () => {
    const component = mount(
      <RadioGroup name={'rgroup'} selectedValue={'Option1'}>
        <Radio value="Option1" />
        <Radio value="Option2" />
      </RadioGroup>
    )

    expect(
      component
        .find('input[type="radio"]')
        .first()
        .props().checked
    ).toBe(true)
  })

  it('renders radio button children with selectedValue', () => {

    const component = mount(
      <RadioGroup name={'rgroup'} selectedValue="Option2">
        <Radio value="Option1" />
        <Radio value="Option2" />
      </RadioGroup>
    )

    expect(
      component
        .find('input[type="radio"]')
        .last()
        .props().checked
    ).toBe(true)
  })
})
