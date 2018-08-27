import React from 'react'
import { mount } from 'enzyme'
import Email from './Email'

describe('The Email component', () => {
  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function(event) {
        validations++
      }
    }
    const component = mount(
      <Email name={expected.name} onValidate={expected.handleValidation} />
    )
    component
      .find('input')
      .first()
      .simulate('change')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleChange: function(event) {
        changes++
      },
      onUpdate: function() {
        changes++
      }
    }
    const component = mount(
      <Email
        name={expected.name}
        onChange={expected.handleChange}
        onUpdate={expected.onUpdate}
      />
    )
    component
      .find('input')
      .first()
      .simulate('change')
    expect(changes).toEqual(2)
  })

  it('renders returns appropriate responses to addresses', () => {
    let tests = [
      {
        address: 'charles.xavier@gmail.com',
        valid: true
      },
      {
        address: 'charles@x-men.org',
        valid: true
      },
      {
        address: 'CHARLES@X-MEN.ORG',
        valid: true
      },
      {
        address: 'me@you',
        valid: false
      },
      {
        address: 'tj@123.com',
        valid: true
      },
      {
        address: 'tj@1  2 3.com',
        valid: false
      },
      {
        address: 't j@123.com',
        valid: false
      },
      {
        address: 'j@stonewall.support',
        valid: true
      }
    ]

    tests.forEach(t => {
      const component = mount(
        <Email name="test-emails" label="Email" value={t.address} />
      )
      expect(component.find('.usa-input-error-label').length).toEqual(
        t.valid ? 0 : 1
      )
    })
  })
})
