import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Contacts from './Contacts'
import { i18n } from '../../../../config'

describe('The contacts component', () => {
  const mockStore = configureMockStore()
  const defaultAppState = {
    application: {
      AddressBooks: {}
    }
  }
  let createComponent

  beforeEach(() => {
    const store = mockStore(defaultAppState)
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Contacts {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display accordion when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Name: {} } }] }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  const contactDatesSetup = {
    name: 'contacts',
    HasForeignContacts: {
      value: 'Yes'
    },
    applicantBirthdate: {
      estimated: false,
      day: '1',
      month: '1',
      name: 'birthdate',
      year: '1970'
    },
    List: {
      items: [
        {
          Item: {
            Birthdate: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'Birthdate',
              year: '1980'
            },
            FirstContact: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'FirstContact',
              year: '1990'
            },
            LastContact: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'LastContact',
              year: '2000'
            }
          },
          open: true
        }
      ]
    }
  }

  describe('handles dates', () => {
    it('with good data - the date of first contact is after the applicant and contact DOB', () => {
      const props = {
        valid: true
      }

      const component = createComponent(props)
      expect(
        component
          .find('.error-messages [data-i18n="error.foreignContact.min"]')
          .children().length
      ).toEqual(0)
    })
    it('with bad data - the date of first contact is before the applicant and contact DOB', () => {
      const props = {
        ...contactDatesSetup,
        List: {
          items: [
            {
              Item: {
                ...contactDatesSetup.List.items[0].Item,
                FirstContact: {
                  estimated: false,
                  day: '1',
                  month: '1',
                  name: 'FirstContact',
                  year: '1950'
                }
              }
            }
          ]
        },
        valid: false
      }

      const component = createComponent(props)
      expect(
        component
          .find('.error-messages [data-i18n="error.foreignContact.min"]')
          .text()
      ).toEqual(
        `${i18n.t('error.foreignContact.min.title')}${i18n.t(
          'error.foreignContact.min.message'
        )}`
      )
    })
  })
})
