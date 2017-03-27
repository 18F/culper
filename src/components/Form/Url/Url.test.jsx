import React from 'react'
import { mount } from 'enzyme'
import Url from './Url'

describe('The URL component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Url input error',
      type: 'text',
      error: true,
      focus: false,
      valid: false,
      readonly: true
    }
    const component = mount(<Url name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} readonly={expected.readonly} />)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Url input focused',
      type: 'text',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(<Url name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('input#' + expected.name).hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Url input success',
      type: 'text',
      error: false,
      focus: false,
      valid: true
    }
    const component = mount(<Url name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'Url input label',
      type: 'text',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<Url name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = mount(<Url name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('change')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<Url name={expected.name} onChange={expected.handleChange} />)
    component.find('input').first().simulate('change')
    expect(changes).toEqual(1)
  })

  it('bubbles up focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleFocus: function (event) {
        foci++
      }
    }
    const component = mount(<Url name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').first().simulate('focus')
    expect(foci).toEqual(1)
  })

  it('bubbles up blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<Url name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('renders returns appropriate responses to URLs', () => {
    let tests = [
      {
        url: 'http://google.com',
        valid: true
      },
      {
        url: 'https://google.com',
        valid: true
      },
      {
        url: 'https://www.google.com',
        valid: true
      },
      {
        url: 'https://www.GOOGLE.com',
        valid: true
      },
      {
        url: 'nope://www.google.com',
        valid: false
      },
      {
        url: '!!doesnotexist!!',
        valid: false
      }
    ]

    tests.forEach((t) => {
      const component = mount(<Url name="test-urls" label="URL" value={t.url} />)
      component.find('input').simulate('blur')
      expect(component.find('.usa-input-error-label').length).toEqual(t.valid ? 0 : 1)
    })
  })
})
