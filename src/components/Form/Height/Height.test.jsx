import React from 'react'
import { mount } from 'enzyme'
import Height from './Height'

describe('The Height component', () => {
  let onUpdate = () => {}
  it('no error on empty', () => {
    let expected = {
      name: 'height',
      label: 'Feet',
      value: ''
    }
    const component = mount(
      <Height
        name={expected.name}
        label={expected.label}
        value={expected.value}
      />
    )
    component
      .find('.feet input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    component.find('.feet input').simulate('focus')
    component.find('.feet input').simulate('blur')
    expect(component.find('.feet label').text()).toEqual(expected.label)
    expect(component.find('.feet input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)

    expected = {
      name: 'height',
      label: 'Inches',
      value: ''
    }
    component.find('.inches input').simulate('change')
    expect(component.find('.inches label').text()).toEqual(expected.label)
    expect(component.find('.inches input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'height',
      tab: () => {
        tabbed = true
      }
    }
    const component = mount(<Height {...expected} />)
    component
      .find('.feet input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component
      .find('.feet input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'height',
      tab: () => {
        tabbed = true
      }
    }
    const component = mount(<Height {...expected} />)
    component
      .find('.inches input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component
      .find('.inches input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })
})
