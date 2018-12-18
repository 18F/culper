import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Marital from './Marital'
import { i18n } from '../../../../config'

describe('The relationship status component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore({ application: { addressBooks: {} } })
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Marital {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = createComponent(expected)
    expect(component.find('.marital').length).toEqual(1)
  })

  it('performs updates', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      Status: { value: 'Married' },
      onUpdate: () => {
        updates++
      }
    }

    const component = createComponent(expected)
    expect(component.find('.marital').length).toEqual(1)
    component.find('.status-options input[value="Married"]').simulate('change')
    component.find('.civil-union .civil .first input').simulate('change')
    component
      .find('.status-options input[value="NeverMarried"]')
      .simulate('change')
    expect(updates).toBe(3)
  })

  it('shows divorce stuff', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      Status: { value: 'Divorced' },
      DivorcedList: {
        branch: {
          value: 'Yes'
        },
        items: [
          {
            Divorce: {
              Status: { value: 'Divorced' },
              BirthPlace: { country: 'United States' },
              Deceased: { value: 'Yes' }
            }
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }

    const component = createComponent(expected)
    expect(component.find('.marital').length).toEqual(1)
    component.find('.status-options input[value="Divorced"]').simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
  })

  const civilUnionDatesSetup = {
    name: 'marital',
    Status: {
      checked: true,
      value: 'Married'
    },
    applicantBirthdate: {
      estimated: false,
      day: '1',
      month: '1',
      name: 'birthdate',
      year: '1970'
    },
    CivilUnion: {
      Birthdate: {
        estimated: false,
        day: '1',
        month: '1',
        name: 'birthdate',
        year: '1980'
      },
      EnteredCivilUnion: {
        estimated: false,
        day: '1',
        month: '1',
        name: 'enteredCivilUnion',
        year: '1990'
      }
    }
  }

  const divorcedDatesSetup = {
    name: 'marital',
    Status: {
      checked: true,
      value: 'Divorced'
    },
    applicantBirthdate: {
      estimated: false,
      day: '1',
      month: '1',
      name: 'birthdate',
      year: '1970'
    },
    DivorcedList: {
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
            Recognized: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'Recognized',
              year: '1990'
            },
            DateDivorced: {
              estimated: false,
              day: '1',
              month: '1',
              name: 'DateDivorced',
              year: '2000'
            }
          },
          open: true
        }
      ]
    }
  }

  describe('handles civil union dates', () => {
    it('with good data - where the date entered into civil union is after applicant and partner DOB', () => {
      const props = {
        valid: true
      }

      const component = createComponent(props)
      expect(
        component
          .find('.error-messages [data-i18n="error.civilUnion.min"]')
          .children().length
      ).toEqual(0)
    })
    it('with bad data - where the date entered into civil union is before applicant and partner DOB', () => {
      const props = {
        ...civilUnionDatesSetup,
        CivilUnion: {
          ...civilUnionDatesSetup.CivilUnion,
          EnteredCivilUnion: {
            estimated: false,
            day: '1',
            month: '1',
            name: 'enteredCivilUnion',
            year: '1960'
          }
        },
        valid: false
      }
      const component = createComponent(props)
      expect(
        component
          .find('.error-messages [data-i18n="error.civilUnion.min"]')
          .text()
      ).toEqual(
        `${i18n.t('error.civilUnion.min.title')}${i18n.t(
          'error.civilUnion.min.message'
        )}`
      )
    })
  })

  describe('handles divorce dates', () => {
    it('with good data - where the date divorced is after applicant and partner DOB as well as date entered into civil union', () => {
      const props = {
        valid: true
      }

      const component = createComponent(props)
      expect(
        component
          .find('.error-messages [data-i18n="error.divorceDate.min"]')
          .children().length
      ).toEqual(0)
    })
    it('with bad data - where the date divorced is before date entered into civil union', () => {
      const props = {
        ...divorcedDatesSetup,
        DivorcedList: {
          items: [
            {
              Item: {
                ...divorcedDatesSetup.DivorcedList.items[0].Item,
                DateDivorced: {
                  estimated: false,
                  day: '1',
                  month: '1',
                  name: 'DateDivorced',
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
          .find('.error-messages [data-i18n="error.divorceDate.min"]')
          .text()
      ).toEqual(
        `${i18n.t('error.divorceDate.min.title')}${i18n.t(
          'error.divorceDate.min.message'
        )}`
      )
    })
  })
})
