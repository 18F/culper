import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Disciplinary from './Disciplinary'

describe('The military disciplinary component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({
      authentication: { formType: 'SF86' },
    })

    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Disciplinary {...expected} />
        </Provider>
      )
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'military-disciplinary',
    }
    const component = createComponent(expected)
    expect(component.find('.branch').length).toBeGreaterThan(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting no to military disciplinary does nothing', () => {
    const expected = {
      name: 'military-disciplinary',
      HasDisciplinary: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting yes to military disciplinary displays the form', () => {
    const expected = {
      name: 'military-disciplinary',
      HasDisciplinary: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Date: {} } }] },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toEqual(1)
  })
})
