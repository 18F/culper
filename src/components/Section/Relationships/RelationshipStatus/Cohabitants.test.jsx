import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Cohabitants from './Cohabitants'
import { i18n } from '../../../../config'

const alternateAddressRenderMock = jest.fn()
const mountComponent = (mockStore, Component, props) => {
  const store = mockStore({ application: { AddressBooks: {} } })
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

describe('The cohabitants component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
  })

  it('performs updates ', () => {
    let updates = 0
    const expected = {
      name: 'cohabitants',
      HasCohabitant: { value: 'Yes' },
      CohabitantList: [
        {
          Cohabitant: {
            SameSpouse: true,
            spouse: {
              first: 'Foo',
              middle: 'FB',
              last: 'Far'
            },
            Name: {
              first: 'Foo',
              firstInitialOnly: false,
              middle: 'FB',
              middleInitialOnly: false,
              noMiddleName: false,
              last: 'Bar',
              lastInitialOnly: false,
              suffix: ''
            },
            SSN: {}
          }
        }
      ],
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
    updates = 0
    component.find('.has-cohabitant .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  const cohabitantDateSetup = {
    name: 'marital',
    HasCohabitant: {
      value: 'Yes'
    },
    applicantBirthdate: {
      estimated: false,
      day: '1',
      month: '1',
      name: 'birthdate',
      year: '1970'
    },
    CohabitantList: {
      items: [
        {
          Item: {
            Birthdate: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'birthdate',
              year: '1980'
            },
            CohabitationBegan: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'cohabitationBegan',
              year: '1990'
            }
          },
          open: true
        }
      ]
    }
  }

  describe('handles cohanbitant dates', () => {
    it('with good data - the date cohabitation began is after the applicant and cohabitant DOB', () => {
      const mockStore = configureMockStore()
      const props = {
        valid: true
      }
      const component = mountComponent(mockStore, Cohabitants, props)
      expect(
        component
          .find('.error-messages [data-i18n="error.cohabitant.min"]')
          .children().length
      ).toEqual(0)
    })
    it('with bad data - the date cohabitation began is before the applicant and cohabitant', () => {
      const mockStore = configureMockStore()
      const props = {
        ...cohabitantDateSetup,
        CohabitantList: {
          items: [
            {
              Item: {
                ...cohabitantDateSetup.CohabitantList.items[0].Item,
                CohabitationBegan: {
                  estimated: false,
                  day: '1',
                  month: '1',
                  name: 'cohabitationBegan',
                  year: '1960'
                }
              }
            }
          ]
        },
        valid: false
      }

      const component = mountComponent(mockStore, Cohabitants, props)
      expect(
        component
          .find('.error-messages [data-i18n="error.cohabitant.min"]')
          .text()
      ).toEqual(
        `${i18n.t('error.cohabitant.min.title')}${i18n.t(
          'error.cohabitant.min.message'
        )}`
      )
    })
  })
})
