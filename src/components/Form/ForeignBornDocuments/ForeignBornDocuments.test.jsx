import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ForeignBornDocuments from '../ForeignBornDocuments'

describe('The ForeignBornDocuments component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ForeignBornDocuments {...expected} />
        </Provider>
      )
  })

  it('renders focus and blur', () => {
    let blurs = 0
    let focus = 0
    const expected = {
      onBlur: () => {
        blurs++
      },
      onFocus: () => {
        focus++
      }
    }
    const component = createComponent(expected)

    component
      .find('.born input')
      .first()
      .simulate('blur')
    component
      .find('.born input')
      .first()
      .simulate('focus')
    expect(blurs).toBe(1)
    expect(focus).toBe(1)
  })

  it('renders and updates', () => {
    let updates = 0
    const props = {
      DocumentType: { value: 'Other' },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(props)
    expect(component.find('.foreign-born-documents').length).toEqual(1)

    expect(component.find('.born').length).toEqual(2)
    expect(component.find('.naturalized').length).toEqual(3)
    expect(component.find('.notcitizen').length).toEqual(6)
    expect(component.find('.other').length).toEqual(1)

    component
      .find('.born input')
      .first()
      .simulate('change')
    expect(updates).toBe(1)

    component.find('.other input').simulate('change')
    component.find('.other-explanation textarea').simulate('change')
    component.find('.foreign-born-document-number input').simulate('change')
    component
      .find('.month input')
      .simulate('change', { target: { value: '1' } })
    component.find('.not-applicable .button input').simulate('change')
    expect(updates).toBe(6)
  })
})
