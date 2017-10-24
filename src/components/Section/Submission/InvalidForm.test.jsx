import React from 'react'
import { mount } from 'enzyme'
import InvalidForm from './InvalidForm'

describe('The Invalid form submission component', () => {
  it('renders errors', () => {
    const expected = {
      sections: [
        {
          title: 'Identification',
          url: 'identification',
          subsections: [
            {
              url: 'identification/name',
              name: 'Full name',
              complete: false
            }
          ]
        },
        {
          title: 'Foreign activities',
          url: 'foreign',
          subsections: [
            {
              url: 'foreign/passport',
              name: 'U.S. passport information',
              complete: false
            }
          ]
        }
      ]
    }
    const component = mount(<InvalidForm {...expected} />)
    expect(component.find('.invalid-form').length).toBe(1)
    expect(component.find('.error-messages').length).toBe(2)
  })
})
