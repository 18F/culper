import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import InvalidForm, { InvalidSection } from './InvalidForm'

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
    const component = mount(<MemoryRouter><InvalidForm {...expected} /></MemoryRouter>)
    expect(component.find('.invalid-form').length).toBe(1)
  })

  it('renders invalid section', () => {
    const expected = {
      onClick: () => {},
      mark: {
        section: {
          title: 'Cool'
        },
        subsections: [{
          name: 'Full name',
          url: 'name'
        }]
      }
    }
    const component = mount(<MemoryRouter><InvalidSection {...expected} /></MemoryRouter>)
    expect(component.find('.error-messages').length).toBe(1)
  })
})
