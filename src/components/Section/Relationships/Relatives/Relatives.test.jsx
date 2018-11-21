import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Relatives from './Relatives'
import { i18n } from '../../../../config'

const alternateAddressRenderMock = jest.fn();
const mountComponent = (mockStore, Component, props) => {
  const store = mockStore({ application: { AddressBooks: {} }})
  const finalProps = {
    render: alternateAddressRenderMock,
    ...props

  }

  return mount(
    <Provider store={store}>
      <Component {...finalProps} />
    </Provider>
  )
}

describe('The relatives component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Relatives {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = createComponent(expected)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      List: {
        items: [{ Item: { Relation: { value: 'Mother' } } }]
      },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find({ type: 'radio', value: 'Mother' }).simulate('change')
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: '123123123' } })
    expect(updates).toBeGreaterThan(1)
  })

  const relativeDatesSetup = {
    name: "relatives",
    applicantBirthdate: {
      estimated: false,
      day: "1",
      month: "1",
      name: "birthdate",
      year: "1970",
      date: new Date("1970", "1", "1")
    },
    List: {
      items: [{
        Item: {
          Birthdate: {
            estimated: false,
            day: "1",
            month: "1",
            name: "Birthdate",
            year: "1980",
            date: new Date("1980", "1", "1")
          },
          Citizenship: {
              value: ['Germany']
          },
          IsDeceased: {
            value: 'No'
          },
          FirstContact: {
            estimated: false,
            day: "1",
            month: "1",
            name: "FirstContact",
            year: "1990",
            date: new Date("1990", "1", "1")
          },
        },
      open: true
    }],
    }
  }

  describe('handles foreign relative dates', () => {
    it('with good data - date first contacted is after applicant and relative DOB', () => {
      const mockStore = configureMockStore()
      const props = {
        valid: true
      }

      const component = mountComponent(mockStore, Relatives, props)
      expect(component.find('.error-messages [data-i18n="error.date.min"]').children().length).toEqual(0)
    })

    it('with bad data - date first contacted is before applicant and relative DOB', () => {
      const mockStore = configureMockStore()
      const props = {
        List: {
          items: [{
            Item: {
              ...relativeDatesSetup.List.items[0].Item,
              FirstContact: {
                estimated: false,
                day: "1",
                month: "1",
                name: "FirstContact",
                year: "1960",
                date: new Date("1960", "1", "1")
              },
            },
        }],
      },
        valid: false
      }
      const component = mountComponent(mockStore, Relatives, props)
      expect(component.find('.error-messages [data-i18n="error.date.min"]').text()).toEqual(
        `${i18n.t('error.date.min.title')}${i18n.t('error.date.min.message')}`
      )
    })
  })

})
