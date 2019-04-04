import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import Section from 'components/Section'

describe('The military section', () => {
  const mockStore = configureMockStore()

  const emptyStore = mockStore({
    application: {
      Military: {},
      Settings: {
        formType: 'SF86',
      },
    },
  })

  const createComponent = (
    expected = { section: 'military', subsection: 'intro' },
    store = emptyStore,
    initialRoutes,
  ) => mount(
    <MemoryRouter initialEntries={initialRoutes}>
      <Provider store={store}>
        <Section section={expected.section} subsection={expected.subsection} />
      </Provider>
    </MemoryRouter>,
  )

  it('can review all subsections', () => {
    const component = createComponent(
      { section: 'military', subsection: 'review' },
      emptyStore,
      ['/form/military/review']
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const tests = [
      {
        section: 'selective',
        action: (component) => {
          component.find('.selective .branch .yes input').simulate('change')
        },
      },
      {
        section: 'history',
        action: (component) => {
          component
            .find('.military-history .branch .yes input')
            .simulate('change')
        },
      },
      {
        section: 'disciplinary',
        action: (component) => {
          component.find('.disciplinary .branch .yes input').simulate('change')
        },
      },
      {
        section: 'foreign',
        action: (component) => {
          component.find('.foreign .branch .yes input').simulate('change')
        },
      },
    ]

    tests.forEach((test) => {
      const component = createComponent(
        { section: 'military', subsection: test.section },
        emptyStore,
        [`/form/military/${test.section}`],
      )

      test.action(component)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('hides selective service if age is before December 31st, 1959', () => {
    const modifiedStore = mockStore({
      application: {
        Identification: {
          ApplicantBirthDate: { Date: { month: '1', day: '1', year: '1900' } },
        },
        Military: {},
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = createComponent(
      { section: 'military', subsection: 'intro' },
      modifiedStore,
      ['/form/military/intro']
    )

    expect(component.find('.actions.next .text .label').text()).not.toBe(
      'Selective service record',
    )
  })

  it('displays selective service if age is after December 31st, 1959', () => {
    const modifiedStore = mockStore({
      application: {
        Identification: {
          ApplicantBirthDate: { Date: { month: '1', day: '1', year: '1980' } },
        },
        Military: {},
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = createComponent(
      { section: 'military', subsection: 'intro' },
      modifiedStore,
      ['/form/military/intro']
    )

    expect(component.find('.actions.next .text .label').text()).toBe(
      'Selective service record',
    )
  })

  it('hides disciplinary procedures if no valid military history', () => {
    const modifiedStore = mockStore({
      application: {
        Military: { History: { HasServed: { value: 'No' } } },
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = createComponent(
      { section: 'military', subsection: 'history' },
      modifiedStore,
      ['/form/military/history']
    )

    expect(component.find('.actions.next .text .label').text()).not.toBe(
      'Disciplinary procedures',
    )
  })

  it('displays disciplinary procedures if military history is "Yes"', () => {
    const modifiedStore = mockStore({
      application: {
        Military: { History: { HasServed: { value: 'Yes' } } },
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = createComponent(
      { section: 'military', subsection: 'history' },
      modifiedStore,
      ['/form/military/history']
    )

    expect(component.find('.actions.next .text .label').text()).toBe(
      'Disciplinary procedures',
    )
  })
})
