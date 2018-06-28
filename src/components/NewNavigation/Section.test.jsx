import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Section from './Section'

describe("The Section component", () => {
  it("Renders a basic Section", () => {
    const section = {
      name: 'foo',
      url: 'foo'
    }
    const component = mount(<MemoryRouter><Section section={section}/></MemoryRouter>)
    expect(component.find('a').length).toBe(1)
  })
})
