import React from 'react'
import { mount } from 'enzyme'
import Dropdown from './Dropdown'

describe('The Dropdown component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'state',
      value: '',
      maxlength: '1',
      className: 'dropdown-test'
    }
    const component = mount(<Dropdown {...expected} />)
    component.find('.dropdown input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    component.find('.dropdown input').simulate('focus')
    component.find('.dropdown input').simulate('blur')
    expect(component.find('div.dropdown-test').length).toEqual(1)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'dropdown',
      maxlength: '1',
      tabNext: () => { tabbed = true }
    }
    const component = mount(<Dropdown {...expected} />)
    component.find('.dropdown input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component.find('.dropdown input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'dropdown',
      maxlength: '1',
      tabBack: () => { tabbed = true }
    }
    const component = mount(<Dropdown {...expected} />)
    component.find('.dropdown input').simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component.find('.dropdown input').simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })

  it('disallows use of clipboard', () => {
    const expected = {
      name: 'dropdown',
      maxlength: '1',
      clipboard: false
    }
    const component = mount(<Dropdown {...expected} />)
    component.find({ type: 'text', name: 'dropdown' }).simulate('paste', { target: { value: '111' } })
    expect(component.find({ type: 'text', name: 'dropdown', value: '111' }).length).toBe(0)
    expect(component.find({ type: 'text', name: 'dropdown', value: '' }).length).toBe(1)
  })

  it('executes default displayText func', () => {
    const expected = {
      name: 'state',
      value: 'foo',
      maxlength: '1',
      className: 'dropdown-test',
      focus: false
    }
    const component = mount(
      <Dropdown {...expected}>
        <option value="bar">Foo</option>
        <option value="foo">Bar</option>
      </Dropdown>
    )
    expect(component.find('div.dropdown-test').length).toEqual(1)
    component.find('input').simulate('focus')
    expect(component.state().value).toBe('foo')
  })

  it('executes custom displayText func', () => {
    const expected = {
      name: 'state',
      value: 'foo',
      maxlength: '1',
      className: 'dropdown-test',
      displayText: (value, text) => {
        return `${value}---${text}`.trim()
      },
      focus: false
    }
    const component = mount(
      <Dropdown {...expected}>
        <option value="bar">Foo</option>
        <option value="foo">Bar</option>
      </Dropdown>
    )
    expect(component.find('div.dropdown-test').length).toEqual(1)
    expect(component.find('input').nodes[0].value).toEqual('foo---Bar')
    component.find('input').simulate('focus')
    expect(component.state().value).toBe('foo')
  })
})
