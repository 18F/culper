import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { DiplomaItem } from './Diploma'

describe('The DiplomaItem component', () => {
  it('renders without errors', () => {
    const component = shallow(
      <DiplomaItem />
    )

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  it('renders the diploma type field', () => {
    const component = shallow(
      <DiplomaItem />
    )

    expect(component.find('.diploma').length).toEqual(1)
  })

  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({ ...defaultState })

    return mount(
      <Provider store={store}>
        <DiplomaItem {...props} />
      </Provider>
    )
  }

  it('implements an onUpdate handler', () => {
    const onUpdate = jest.fn()
    const testProps = {
      Diploma: { value: 'Other' },
      onUpdate,
    }

    const component = mountComponentWithStore(testProps)

    component.find('.diploma-highschool input').simulate('change')
    component.find('.diploma-other input').simulate('change')
    component
      .find('.other input')
      .simulate('change', { target: { name: 'DiplomaOther', value: 'Other' } })
    component
      .find('.date-awarded .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.date-awarded .year input')
      .simulate('change', { target: { name: 'year', value: '2010' } })

    expect(onUpdate.mock.calls.length).toEqual(5)
  })

  describe('with "Other" selected', () => {
    const testProps = {
      Diploma: { value: 'Other' },
    }

    const component = mountComponentWithStore(testProps)

    it('displays a textbox', () => {
      expect(component.find('.other').length).toEqual(1)
    })
  })

  describe('with "Other" not selected', () => {
    const testProps = {
      Diploma: { value: 'Doctorate' },
    }

    const component = mountComponentWithStore(testProps)

    it('does not display a textbox', () => {
      expect(component.find('.other').length).toEqual(0)
    })
  })
})
