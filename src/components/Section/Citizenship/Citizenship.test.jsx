import React from 'react'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Citizenship from '@components/Section/Citizenship'

const applicationState = {
  Citizenship: {}
}

describe('The citizenship section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <Citizenship subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['status', 'multiple']
    const store = mockStore({})

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <Citizenship subsection={section} />
        </Provider>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
