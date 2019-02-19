import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Military from './Military'
import { mount } from 'enzyme'

const applicationState = {
  Military: {}
}

describe('The military section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <Military subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = [
      'selective',
      'history',
      'disciplinary',
      'foreign',
      'review'
    ]
    const store = mockStore({
      application: { Military: {} }
    })

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
      const component = mount(
        <Provider store={store}>
          <Military section="military" subsection={test.section} />
        </Provider>
      )
      test.action(component)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('hides selective service if age is before December 31st, 1959', () => {
    const modifiedState = {
      Identification: {
        ApplicantBirthDate: { Date: { month: '1', day: '1', year: '1900' } }
      },
      Military: {}
    }
    const store = mockStore({
      application: modifiedState
    })
    const component = mount(
      <Provider store={store}>
        <Military subsection="intro" />
      </Provider>
    )
    expect(component.find('.actions.next .text .label').text()).not.toBe(
      'Selective service record'
    )
  })

  it('displays selective service if age is after December 31st, 1959', () => {
    const modifiedState = {
      Identification: {
        ApplicantBirthDate: { Date: { month: '1', day: '1', year: '1980' } }
      },
      Military: {}
    }
    const store = mockStore({
      application: modifiedState
    })
    const component = mount(
      <Provider store={store}>
        <Military subsection="intro" />
      </Provider>
    )
    expect(component.find('.actions.next .text .label').text()).toBe(
      'Selective service record'
    )
  })

  it('hides disciplinary procedures if no valid military history', () => {
    const modifiedState = {
      Military: { History: { HasServed: { value: 'No' } } }
    }
    const store = mockStore({
      application: modifiedState
    })
    const component = mount(
      <Provider store={store}>
        <Military subsection="history" />
      </Provider>
    )
    expect(component.find('.actions.next .text .label').text()).not.toBe(
      'Disciplinary procedures'
    )
  })

  it('displays disciplinary procedures if military history is "Yes"', () => {
    const modifiedState = {
      Military: { History: { HasServed: { value: 'Yes' } } }
    }
    const store = mockStore({
      application: modifiedState
    })
    const component = mount(
      <Provider store={store}>
        <Military subsection="history" />
      </Provider>
    )
    expect(component.find('.actions.next .text .label').text()).toBe(
      'Disciplinary procedures'
    )
  })
})
