import React from 'react'
import { mount } from 'enzyme'
import Checkbox from './Checkbox'

describe('The checkbox component', () => {
  it('renders the default state', () => {
    const testProps = { name: 'checkboxInput', label: 'My Checkbox', className: 'testClass' }
    const component = mount(<Checkbox {...testProps} />)

    expect(component.exists()).toBe(true)
    expect(component.instance().uid).toBeTruthy()
    expect(component.hasClass(testProps.className)).toBe(true)
    expect(component.find('label').text()).toEqual(testProps.label)
    expect(component.find('label').hasClass('usa-input-error-label')).toBe(false)
    expect(component.find(`input[name="${testProps.name}"]`).length).toEqual(1)
  })

  it('update handler toggles its checked value', () => {
    let isChecked = false
    const expected = {
      name: 'input',
      label: 'My Checkbox',
      checked: isChecked,
      onUpdate: function({ checked }) {
        isChecked = checked
      },
    }

    const component = mount(<Checkbox {...expected} />)
    component.instance().update()
    expect(isChecked).toEqual(true)

    component.setProps({ checked: true })
    component.instance().update()
    expect(isChecked).toEqual(false)
  })

  it('renders the checked state', () => {
    const testProps = { name: 'checkboxInput', label: 'My Checkbox', checked: true }
    const component = mount(<Checkbox {...testProps} />)

    expect(component.find('label').hasClass('checked')).toBe(true)
  })

  it('renders the disabled state', () => {
    const testProps = { name: 'checkboxInput', label: 'My Checkbox', disabled: true }
    const component = mount(<Checkbox {...testProps} />)

    expect(component.hasClass('disabled')).toBe(true)
  })

  it('renders the error state', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
    }

    const component = mount(<Checkbox {...expected} />)

    component.setState({ error: true })
    expect(component.hasClass('usa-input-error')).toBe(true)
    expect(component.find('label').hasClass('usa-input-error-label')).toBe(true)
  })

  it('renders the valid state', () => {
    const expected = {
      name: 'input-success',
      label: 'Text input success',
    }

    const component = mount(<Checkbox {...expected} />)

    component.setState({ valid: true })

    expect(component.find('input').hasClass('usa-input-success')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('handles the change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      onUpdate: function(values) {
        changes++
      }
    }

    const component = mount(<Checkbox {...expected} />)
    component.find('input').simulate('change')
    expect(changes).toEqual(1)
  })

  it('handles the key press event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      onUpdate: function(values) {
        changes++
      }
    }

    const component = mount(<Checkbox {...expected} />)
    component.find('input').simulate('keydown', { key: 'Enter' })
    expect(changes).toEqual(1)

    component.find('input').simulate('keydown', { key: ' ' })
    expect(changes).toEqual(2)

    component.find('input').simulate('keydown', { key: 'Tab' })
    expect(changes).toEqual(2)
  })

  it('handles the focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      onFocus: function(event) {
        foci++
      }
    }

    const component = mount(<Checkbox {...expected} />)
    component.find('input').simulate('focus')
    expect(component.state('focus')).toEqual(true)
    expect(foci).toEqual(1)
  })

  it('handles the blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      onBlur: function(event) {
        blurs++
      }
    }

    const component = mount(<Checkbox {...expected} />)
    component.setState({ focus: true })
    component.find('input').simulate('blur')
    expect(component.state('focus')).toBe(false)
    expect(blurs).toEqual(1)
  })
})
