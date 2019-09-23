import React from 'react'

import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { mount } from 'enzyme'

import connectPackageSection from './PackageConnector'

describe('The PackageConnector HOC', () => {
  const mockStore = configureMockStore()

  const TestComponent = () => (
    <div>Testing!</div>
  )

  const Wrapper = connectPackageSection(TestComponent)

  const testState = {
    application: {
      Settings: { formType: 'SF86' },
      Identification: 'test identification',
      History: 'test history',
      Submission: 'test submission',
    },
    form: {},
  }

  const store = mockStore(testState)

  const component = mount(
    <Provider store={store}>
      <Wrapper />
    </Provider>
  )

  it('wraps and renders a given component', () => {
    expect(component.exists()).toBe(true)
    expect(component.find(TestComponent).length).toEqual(1)
  })

  it('passes an updateApplication function to the wrapped component', () => {
    expect(component.find(TestComponent).prop('updateApplication')).toBeTruthy()
  })

  it('passes the form status prop to the wrapped component', () => {
    expect(component.find(TestComponent).prop('formSections')).toBeTruthy()
    expect(component.find(TestComponent).prop('formIsValid')).toEqual(false)
  })

  it('passes an Application prop to the wrapped component', () => {
    expect(component.find(TestComponent).prop('Application')).toEqual(testState.application)
  })

  it('passes an Identification prop to the wrapped component', () => {
    expect(component.find(TestComponent).prop('Identification')).toEqual('test identification')
  })

  it('passes a History prop to the wrapped component', () => {
    expect(component.find(TestComponent).prop('History')).toEqual('test history')
  })

  it('passes a Submission prop to the wrapped component', () => {
    expect(component.find(TestComponent).prop('Submission')).toEqual('test submission')
  })
})
