import React from 'react'
import { mount } from 'enzyme'
import Generic from './Generic'

describe('The generic component', () => {
  it('renders the default state', () => {
    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
    }

    const component = mount(<Generic {...testProps} />)

    expect(component.exists()).toBe(true)
    expect(component.instance().uid).toBeTruthy()
    expect(component.hasClass(testProps.className)).toBe(true)
    expect(component.find('label').text()).toEqual(testProps.label)
    expect(component.find('label').hasClass('usa-input-error-label')).toBe(false)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('input').prop('name')).toEqual(testProps.name)
    expect(component.find('input').prop('type')).toEqual(testProps.type)
  })

  it('validates on mount', () => {
    const testProps = {
      maxlength: 2,
      value: 'asinetaeirsnteansti',
    }

    const component = mount(<Generic {...testProps} />)
    expect(component.state('error')).toBe(true)
    expect(component.state('valid')).toBe(false)
  })

  it('validates when the value prop changes externally', () => {
    const testProps = {
      maxlength: 2,
      value: 'a',
    }

    const component = mount(<Generic {...testProps} />)
    expect(component.state('error')).toBe(false)
    expect(component.state('valid')).toBe(true)

    component.setProps({ value: 'abc' })
    expect(component.state('error')).toBe(true)
    expect(component.state('valid')).toBe(false)
  })

  it('renders the disabled state', () => {
    const testProps = {
      value: 'asinetaeirsnteansti',
      disabled: true,
      label: 'My Input',
    }

    const component = mount(<Generic {...testProps} />)
    expect(component.find('label').hasClass('disabled')).toBe(true)
    expect(component.find('input').prop('value')).toEqual('')
    expect(component.find('input').prop('disabled')).toEqual(true)
    expect(component.find('.text-print').text()).toEqual('')
  })

  it('renders the error state', () => {
    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
    }

    const component = mount(<Generic {...testProps} />)

    component.setState({ error: true, valid: false })

    expect(component.hasClass('usa-input-error')).toBe(true)
    expect(component.find('label').hasClass('usa-input-error-label')).toBe(true)
  })

  it('renders the disabled state even with other conditions', () => {
    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
      disabled: false,
    }

    const component = mount(<Generic {...testProps} />)

    component.setState({ error: true, valid: false })

    component.setProps({ disabled: true })

    expect(component.state('focus')).toBe(false)
    expect(component.state('error')).toBe(false)
    expect(component.state('valid')).toBe(false)

    expect(component.hasClass('usa-input-error')).toBe(false)
    expect(component.find('label').hasClass('usa-input-error-label')).toBe(false)

    component.setState({ focus: true, valid: true })

    expect(component.find('input').hasClass('usa-input-focus')).toBe(false)
    expect(component.find('input').hasClass('usa-input-success')).toBe(false)
  })

  it('renders the valid state', () => {
    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
    }

    const component = mount(<Generic {...testProps} />)

    component.setState({ valid: true })
    expect(component.find('input').hasClass('usa-input-success')).toBe(true)
  })

  it('handles the focus event', () => {
    let foci = 0
    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
      onFocus: function(event) {
        foci++
      }
    }

    const component = mount(<Generic {...testProps} />)
    
    component.find('input').simulate('focus')

    expect(component.state('focus')).toBe(true)
    expect(component.find('input').hasClass('usa-input-focus')).toEqual(true)
    expect(foci).toEqual(1)
  })

  it('handles the change event', () => {
    let changes = 0
    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
      onChange: function(event) {
        changes++
      }
    }

    const component = mount(<Generic {...testProps} />)
    
    component.find('input').simulate('change')
    expect(changes).toEqual(1)
  })

  it('handles the blur event', () => {
    let blurs = 0
    let currentValue = ''
    let persisted = false

    const testProps = {
      name: 'genericInput',
      label: 'My Input',
      type: 'text',
      className: 'testClass',
      onBlur: function(event) {
        blurs++
      },
      onChange: function(event) {
        currentValue = event.target.value
      }
    }

    const component = mount(<Generic {...testProps} />)

    component.find('input').simulate('focus')
    expect(component.state('focus')).toBe(true)

    component.find('input').simulate('change', {
      target: { value: '  my name ' }
    })
    expect(currentValue).toEqual('  my name ')

    component.setProps({ value: '  my name ' })
    component.find('input').simulate('blur', {
      persist: () => { persisted = true }
    })

    expect(component.state('focus')).toBe(false)
    expect(blurs).toEqual(1)
    expect(persisted).toEqual(true)
    expect(currentValue).toEqual('my name')
  })

  it('does not render the label if the text is not specified', () => {
    const expected = {
      name: 'input-success',
      type: 'text',
      value: 'test',
    }

    const component = mount(<Generic {...expected} />)
    expect(component.find('label').length).toEqual(0)
  })

  it('validates on mount and shows error if required with no value', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input required',
      type: 'text',
      value: '',
      required: true,
    }

    const component = mount(<Generic {...expected} />)
    expect(component.find('.usa-input-error').length).toEqual(1)
  })

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'input-type-text',
      maxlength: '1',
      tabNext: () => {
        tabbed = true
      }
    }
    const component = mount(<Generic {...expected} />)
    component
      .find('input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component
      .find('input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'input-type-text',
      maxlength: '1',
      tabBack: () => {
        tabbed = true
      }
    }
    const component = mount(<Generic {...expected} />)
    component
      .find('input')
      .simulate('keydown', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component
      .find('input')
      .simulate('keydown', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })

  it('does not autotab if text is selected', () => {
    let tabbed = false
    const expected = {
      name: 'input-type-text',
      value: '11',
      maxlength: '2',
      tabNext: () => {
        tabbed = true
      }
    }
    const component = mount(<Generic {...expected} />)
    component.find('input').simulate('keydown', {
      keyCode: 48,
      target: {
        value: '1',
        selectionDirection: 'forward',
        selectionStart: 0,
        selectionEnd: 2
      }
    })
    expect(tabbed).toBe(false)
  })

  it('trims whitespace on blur for validation', () => {
    let persisted = false
    const expected = {
      name: 'input-type-text',
      maxlength: '2',
      value: ' 12  '
    }
    const component = mount(<Generic {...expected} />)
    component.find('input').simulate('blur', {
      persist: () => {
        persisted = true
      },
      target: { name: expected.name }
    })
    expect(persisted).toBe(true)
    expect(component.find('input').hasClass('usa-input-success')).toEqual(true)
  })
})
