import React from 'react'

import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { mount } from 'enzyme'

import connectHistorySection from './HistoryConnector'

describe('The HistoryConnector HOC', () => {
  const mockStore = configureMockStore()

  const TestComponent = () => (
    <div>Testing!</div>
  )

  const testConfig = {
    section: '',
    subsection: '',
    store: '',
    storeKey: '',
  }

  const Wrapper = connectHistorySection(TestComponent, testConfig)

  describe('default behavior', () => {
    const store = mockStore({
      authentication: { formType: 'SF86' },
    })

    const component = mount(
      <Provider store={store}>
        <Wrapper />
      </Provider>,
    )

    it('wraps and renders a given component', () => {
      expect(component.exists()).toBe(true)
      expect(component.find(TestComponent).length).toEqual(1)
    })

    it('passes an onUpdate handler to the wrapped component', () => {
      expect(component.find(TestComponent).prop('onUpdate')).toBeTruthy()
    })

    it('passes an onError handler to the wrapped component', () => {
      expect(component.find(TestComponent).prop('onError')).toBeTruthy()
    })

    it('passes a totalYears prop to the wrapped component', () => {
      expect(component.find(TestComponent).prop('totalYears')).toBeTruthy()
    })

    it('passes a sort prop to the wrapped component', () => {
      expect(component.find(TestComponent).prop('sort')).toBeTruthy()
    })
  })

  describe('if an applicant has less than 10 years of history', () => {
    const store = mockStore({
      authentication: { formType: 'SF86' },
      application: {
        Identification: {
          ApplicantBirthDate: {
            Date: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear() - 18}`,
              estimated: false,
            },
          },
        },
      },
    })

    const component = mount(
      <Provider store={store}>
        <Wrapper />
      </Provider>,
    )

    it('sets totalYears to be the proper value', () => {
      expect(component.find(TestComponent).prop('totalYears')).toEqual(2)
    })
  })

  describe('if an applicant has more than 10 years of history', () => {
    const store = mockStore({
      authentication: { formType: 'SF86' },
      application: {
        Identification: {
          ApplicantBirthDate: {
            Date: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear() - 30}`,
              estimated: false,
            },
          },
        },
      },
    })

    const component = mount(
      <Provider store={store}>
        <Wrapper />
      </Provider>,
    )

    it('sets totalYears to be the proper value', () => {
      expect(component.find(TestComponent).prop('totalYears')).toEqual(10)
    })
  })
})
