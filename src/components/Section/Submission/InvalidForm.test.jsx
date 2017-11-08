import React from 'react'
import { mount } from 'enzyme'
import InvalidForm from './InvalidForm'

describe('The Invalid form submission component', () => {
  it('renders errors', () => {
    const expected = {
      'Identification': {
        errors: 1,
        section: {
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
        subsections: [{
          name: 'Full name',
          url: 'name'
        }]
      }
    }
    const component = mount(<InvalidForm {...expected} />)
    expect(component.find('.invalid-form').length).toBe(1)
    // expect(component.find('.error-messages').length).toBe(10)
  })
})
