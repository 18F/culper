import React from 'react'
import { AddressSuggestion } from './AddressSuggestion'
import { mount } from 'enzyme'

describe('The AddressSuggestion component', () => {
  it('renders Address Suggestion', () => {
    const tests = [
      {
        suggestion: {
          Street: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22202'
        },
        current: {
          street: '123 Some Rd',
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          country: { value: 'United States' }
        },
        expected: 0
      },
      {
        suggestion: {
          Street: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22202'
        },
        current: {
          street: '123 Some Road',
          city: 'Arlington',
          state: 'VA',
          zipcode: '22202',
          country: { value: 'United States' }
        },
        expected: 1
      },
      {
        suggestion: {
          Street: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22202'
        },
        current: {
          street: '123 Some Road',
          city: 'A-Town',
          state: 'MD',
          zipcode: '22201',
          country: { value: 'United States' }
        },
        expected: 4
      }
    ]

    tests.forEach(test => {
      const component = mount(
        <AddressSuggestion
          suggestion={test.suggestion}
          current={test.current}
        />
      )
      expect(component.find('.highlight').length).toBe(test.expected)
    })
  })
})
