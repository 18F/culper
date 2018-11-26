import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Contacts from './Contacts'
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

describe('The contacts component', () => {
  it('display nothing when "no" is clicked', () => {
    const mockStore = configureMockStore()
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'No' }
    }
    const component = mountComponent(mockStore, Contacts, expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display accordion when "yes" is clicked', () => {
    const mockStore = configureMockStore()
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Name: {} } }] }
    }
    const component = mountComponent(mockStore, Contacts, expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  const contactDatesSetup = {
    name: "contacts",
    HasForeignContacts: {
      value: 'Yes'
    },
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
          FirstContact: {
            estimated: false,
            day: "1",
            month: "1",
            name: "FirstContact",
            year: "1990",
            date: new Date("1990", "1", "1")
          },
          LastContact: {
            estimated: false,
            day: "1",
            month: "1",
            name: "LastContact",
            year: "2000",
            date: new Date("2000", "1", "1")
          },
      },
      open: true
      }]
    }
  }

  describe('handles dates', () => {
    it('with good data - the date of first contact is after the applicant and contact DOB', () => {
      const mockStore = configureMockStore()
      const props = {
        valid: true
      }

      const component = mountComponent(mockStore, Contacts, props)
      expect(component.find('.error-messages [data-i18n="error.foreignContact.min"]').children().length).toEqual(0)
    })
    it('with bad data - the date of first contact is before the applicant and contact DOB', () => {
      const mockStore = configureMockStore()
      const props = {
        ...contactDatesSetup,
        List: {
          items: [{
            Item: {
              ...contactDatesSetup.List.items[0].Item,
              FirstContact: {
                estimated: false,
                day: "1",
                month: "1",
                name: "FirstContact",
                year: "1950",
                date: new Date("1950", "1", "1")
              },
            },
          }],
        },
        valid: false
      }

      const component = mountComponent(mockStore, Contacts, props)
      expect(component.find('.error-messages [data-i18n="error.foreignContact.min"]').text()).toEqual(
        `${i18n.t('error.foreignContact.min.title')}${i18n.t('error.foreignContact.min.message')}`
      )
    })
  })

})
