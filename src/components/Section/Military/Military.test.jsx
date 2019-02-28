import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Military from '@components/Section/Military/Military'
import { mount } from 'enzyme'

describe('The military section', () => {
  const mockStore = configureMockStore()
  const createComponent = (expected = {}, store = mockStore({ application: { Military: {} }})) => {
    return mount(
      <MemoryRouter>
        <Provider store={store}>
          <Military {...expected} />
        </Provider>
      </MemoryRouter>
    )
  }

  it('can review all subsections', () => {
    const component = createComponent({ subsection: "review" })
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  xit('can go to each subsection', () => {
    const tests = [
      {
        section: 'selective',
        action: component => {
          component.find('.selective .branch .yes input').simulate('change')
        }
      },
      {
        section: 'history',
        action: component => {
          component
            .find('.military-history .branch .yes input')
            .simulate('change')
        }
      },
      {
        section: 'disciplinary',
        action: component => {
          component.find('.disciplinary .branch .yes input').simulate('change')
        }
      },
      {
        section: 'foreign',
        action: component => {
          component.find('.foreign .branch .yes input').simulate('change')
        }
      }
    ]

    tests.forEach(test => {
      console.log(test.section)
      const component = createComponent({ section: "military", subsection: test.section })
      test.action(component)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  xit('hides selective service if age is before December 31st, 1959', () => {
    const modifiedStore = mockStore({ application: {
      Identification: {
        ApplicantBirthDate: { Date: { month: '1', day: '1', year: '1900' } }
      },
      Military: {}
    }})
    const component = createComponent({ subsection: "intro" }, modifiedStore)
    expect(component.find('.actions.next .text .label').text()).not.toBe(
      'Selective service record'
    )
  })

  it('displays selective service if age is after December 31st, 1959', () => {
    const modifiedStore = mockStore({ application: {
      Identification: {
        ApplicantBirthDate: { Date: { month: '1', day: '1', year: '1980' } }
      },
      Military: {}
    }})
    const component = createComponent({ subsection: "intro" }, modifiedStore)
    expect(component.find('.actions.next .text .label').text()).toBe(
      'Selective service record'
    )
  })

  xit('hides disciplinary procedures if no valid military history', () => {
    const modifiedStore = mockStore({ application: {
      Military: { History: { HasServed: { value: 'No' } } }
    }})
    const component = createComponent({ subsection: "history" }, modifiedStore )
    console.log(modifiedStore)
    expect(component.find('.actions.next .text .label').text()).not.toBe(
      'Disciplinary procedures'
    )
  })

  xit('displays disciplinary procedures if military history is "Yes"', () => {
    const modifiedStore = mockStore({ application: {
      Military: { History: { HasServed: { value: 'Yes' } } }
    }})
    const component = createComponent({ subsection: "history" }, modifiedStore)
    console.log(component.debug())
    expect(component.find('.actions.next .text .label').text()).toBe(
      'Disciplinary procedures'
    )
  })
})
