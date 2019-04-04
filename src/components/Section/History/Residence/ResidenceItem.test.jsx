import React from 'react'
import { shallow, mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import ResidenceItem from './ResidenceItem'

describe('The ResidenceItem component', () => {
  it('renders without errors', () => {
    const component = shallow(
      <ResidenceItem
        Dates={{ maxDate: new Date('04/04/2019') }}
      />
    )

    expect(component.exists()).toBe(true)
    expect(component).toMatchSnapshot()
  })

  const mockStore = configureMockStore()

  const mountComponentWithStore = (props = {}, defaultState = {}) => {
    const store = mockStore({
      application: {},
      ...defaultState,
    })

    return mount(
      <Provider store={store}>
        <ResidenceItem {...props} />
      </Provider>
    )
  }

  it('implements an onUpdate handler', () => {
    const onUpdate = jest.fn()
    const testProps = {
      name: 'residence',
      Dates: {
        from: {
          day: '1',
          month: '1',
          year: '2014',
        },
        to: {
          day: '1',
          month: '1',
          year: '2018',
        },
      },
      onUpdate,
    }

    const component = mountComponentWithStore(testProps)
    component.find('.address .street input').first().simulate('change')
    component.find('.datecontrol .month input').first().simulate('change')
    component.find('.role input').first().simulate('change')
    component.find('.reference-name .first input').simulate('change')
    component.find('.reference-last-contact .month input').simulate('change')
    component.find('.reference-relationship-neighbor input').simulate('change')
    component.find('.reference-email input').simulate('change')
    component.find('.reference-address .street input').first().simulate('change')

    expect(onUpdate.mock.calls.length).toBe(8)
  })

  describe('default state', () => {
    const component = mountComponentWithStore()

    it('renders one residence', () => {
      expect(component.find('.residence').length).toEqual(1)
    })

    it('does not render any character reference', () => {
      expect(component.find('.reference').length).toEqual(0)
    })

    it('does not render the "Other" role text box', () => {
      expect(component.find('.other').length).toEqual(0)
    })
  })

  describe('with a residence within the last 3 years', () => {
    const testProps = {
      Dates: {
        from: {
          month: '1',
          day: '1',
          year: '2000',
        },
        to: {
          month: `${new Date().getMonth() + 1}`,
          day: `${new Date().getDate()}`,
          year: `${new Date().getFullYear()}`,
        },
      },
    }

    const component = mountComponentWithStore(testProps)

    it('displays a character reference', () => {
      expect(component.find('.reference').length).toEqual(1)
    })
  })

  describe('with "Other" role selected', () => {
    const testProps = {
      name: 'residence',
      Role: {
        value: 'Other',
      },
      OtherRole: {},
    }

    const component = mountComponentWithStore(testProps)

    it('displays the "Other" role text box', () => {
      expect(component.find('.other').length).toEqual(1)
    })
  })
})
