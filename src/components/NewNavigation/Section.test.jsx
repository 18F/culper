import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Section from './Section'

describe("The Section component", () => {
  it("Renders a basic Section", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mount(<MemoryRouter><Section section={section}/></MemoryRouter>)
    expect(component.find('a').length).toBe(1)
  })

  it("Renders a Section with subsections", () => {
    const section = {
      name: 'Foo',
      url: 'foo',
      subsections: [
        {
          name: 'Bar',
          url: 'bar'
        },
        {
          name: 'Baz',
          url: 'baz'
        }
      ]
    }

    const component = mount(<MemoryRouter><Section section={section}/></MemoryRouter>)

    expect(component.find('a').length).toBe(3)
    expect(component.find('a[href="/form/foo"]').length).toBe(1)
    expect(component.find('a[href="/form/foo/bar"]').length).toBe(1)
    expect(component.find('a[href="/form/foo/bar"]').length).toBe(1)
  })
})
