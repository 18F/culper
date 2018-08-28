import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import SectionTitle from './SectionTitle'
import { mount } from 'enzyme'

describe('The title section', () => {
  // Setup
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('can handle no title', () => {
    const store = mockStore({ section: { section: '' } })
    const component = mount(
      <Provider store={store}>
        <SectionTitle />
      </Provider>
    )
    expect(component.find('h1').length).toEqual(1)
    expect(component.find('h1').text()).toEqual('')
  })

  it('can handle title 1 deep', () => {
    const store = mockStore({ section: { section: 'legal', subsection: '' } })
    const component = mount(
      <Provider store={store}>
        <SectionTitle />
      </Provider>
    )
    expect(component.find('h1').length).toEqual(1)
    expect(component.find('h1').text()).toEqual(
      'Investigative and criminal history'
    )
  })

  it('can handle title 2 deep', () => {
    const store = mockStore({
      section: { section: 'legal', subsection: 'technology' }
    })
    const component = mount(
      <Provider store={store}>
        <SectionTitle />
      </Provider>
    )
    expect(component.find('h1').length).toEqual(1)
    expect(component.find('h1').text()).toEqual(
      'Investigative and criminal history > Use of information technology systems'
    )
  })

  it('can handle title 3 deep', () => {
    const store = mockStore({
      section: { section: 'legal', subsection: 'technology/unauthorized' }
    })
    const component = mount(
      <Provider store={store}>
        <SectionTitle />
      </Provider>
    )
    expect(component.find('h1').length).toEqual(1)
    expect(component.find('h1').text()).toEqual(
      'Investigative and criminal history > Use of information technology systems > Unauthorized access'
    )
  })
})
