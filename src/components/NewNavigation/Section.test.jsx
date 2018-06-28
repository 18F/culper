import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Section from './Section'

describe("The Section component", () => {
  it("renders a basic Section", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mount(<MemoryRouter><Section section={section}/></MemoryRouter>)
    expect(component.find('a').length).toBe(1)
    expect(component.find('.fa-angle-down').length).toBe(0)
  })

  it("renders a Section with subsections", () => {
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
          url: 'baz',
          subsections: [
            {
              name: 'Blip',
              url: 'blip'
            }
          ]
        }
      ]
    }

    const component = mount(
      <MemoryRouter initialEntries={['/form/foo/baz/blip']}>
        <Section section={section} />
      </MemoryRouter>
    )

    expect(component.find('a').length).toBe(4)
    expect(component.find('a[href="/form/foo"]').length).toBe(0)
    expect(component.find('a[href="/form/foo/bar"]').length).toBe(2)
    expect(component.find('a[href="/form/foo/baz"]').length).toBe(0)
    expect(component.find('a[href="/form/foo/baz/blip"]').length).toBe(2)

    expect(component.find('.fa-angle-down').length).toBe(0)

    expect(component.find('a.usa-current').length).toBe(3)
  })

  it("doesn't render a subsection when not at that path", () => {
    const section = {
      name: 'Foo',
      url: 'foo',
      subsections: [
        {
          name: 'Bar',
          url: 'bar'
        }
      ]
    }

    const component = mount(<MemoryRouter><Section section={section} /></MemoryRouter>)
    expect(component.find('.fa-angle-down').length).toBe(1)
    expect(component.find('.usa-sidenav-sub_list').length).toBe(0)
  })

  it("shows the section as 'active' when at the path", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mount(
      <MemoryRouter initialEntries={['/form/foo']}>
        <Section section={section}/>
      </MemoryRouter>
    )
    expect(component.find('a.usa-current').length).toBe(1)
  })

  it("doesn't show the section as 'active' when not at the path", () => {
    const section = {
      name: 'Foo',
      url: 'foo'
    }
    const component = mount(
      <MemoryRouter initialEntries={['/form/bar']}>
        <Section section={section}/>
      </MemoryRouter>
    )
    expect(component.find('a.usa-current').length).toBe(0)
  })
})
