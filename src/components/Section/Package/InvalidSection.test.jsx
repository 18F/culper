import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import InvalidSection from './InvalidSection'

describe('The Invalid section submission component', () => {
  it('renders invalid section', () => {
    const expected = {
      section: {
        section: {
          label: 'Cool',
        },
        subsections: [
          {
            label: 'Full name',
            path: 'name',
          },
        ],
      },
    }

    const component = mount(
      <MemoryRouter>
        <InvalidSection {...expected} />
      </MemoryRouter>
    )

    expect(component.find('.usa-alert-error').length).toBe(1)
  })
})
