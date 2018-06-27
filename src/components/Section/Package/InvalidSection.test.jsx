import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import InvalidSection from './InvalidSection'

describe('The Invalid section submission component', () => {
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
