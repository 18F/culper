import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { OtherNames } from './OtherNames'

describe('The OtherNames component', () => {
  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({ ...defaultState })
    return mount(
      <Provider store={store}>
        <OtherNames {...props} />
      </Provider>
    )
  }

  it('renders without errors', () => {
    const component = shallow(<OtherNames />)

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('implements an onUpdate handler', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates += 1
      },
    }

    const component = mountComponentWithStore(props)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toEqual(1)
  })

  describe('default state', () => {
    it('has no names initially', () => {
      const component = shallow(<OtherNames />)
      expect(component.find('.first input').length).toEqual(0)
    })
  })

  describe('When Yes is selected', () => {
    const props = {
      HasOtherNames: { value: 'Yes' },
      List: {
        items: [{ Item: {} }],
      },
    }

    const component = mountComponentWithStore(props)

    it('renders the form', () => {
      expect(component.find('.details').length).toBeGreaterThan(0)
    })

    it('displays inputs', () => {
      expect(component.find('.first input').length).toEqual(1)
    })

    it.skip('adds a name when button is clicked then collapses', () => {
      // TODO - this should be implemented as a test of the Accordion component
      component.find('.addendum .branch .yes').simulate('click')
    })
  })

  describe('When No is selected', () => {
    const props = {
      HasOtherNames: { value: 'No' },
    }

    const component = mountComponentWithStore(props)

    it('does not render the form', () => {
      expect(component.find('.details').length).toBe(0)
    })

    it('does not display any fields', () => {
      expect(component.find('.first input').length).toEqual(0)
    })
  })
})
