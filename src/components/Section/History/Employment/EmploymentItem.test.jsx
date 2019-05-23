import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { today, daysAgo } from '../dateranges'
import EmploymentItem from './EmploymentItem'
import ReasonLeft from './ReasonLeft'
import Reprimand from './Reprimand'

describe('The employment component', () => {
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
          <EmploymentItem {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'employment'
    }
    const component = createComponent(expected)
    expect(component.find('.h4').length).toBeGreaterThan(0)
  })

  it('can populate values for Military, NationalGuard and USPHS', () => {
    const expected = {
      name: 'employment',
      EmploymentActivity: { value: 'ActiveMilitary' },
      onUpdate: jest.fn()
    }
    const selectors = [
      '.employment-title',
      '.employment-duty-station',
      '.employment-status',
      '.daterange',
      '.address',
      '.telephone',
      '.supervisor'
    ]

    const component = createComponent(expected)
    selectors.forEach(selector => {
      var len = component.find(selector).length
      expect(len).toBeGreaterThan(0)
    })

    component
      .find({ type: 'radio', value: 'ActiveMilitary' })
      .simulate('change')
    expect(expected.onUpdate.mock.calls.length).toBe(1)
  })

  it('display displinary when within 7 years', () => {
    const past = daysAgo(today, 365 * 6)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: true,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reprimand-branch').length).toBe(1)
  })

  it('does not display disciplinary if not within 7 years', () => {
    const past = daysAgo(today, 365 * 8)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reprimand-branch').length).toBe(0)
  })

  it('display reason left options when within 7 years', () => {
    const past = daysAgo(today, 365 * 6)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reason-options').length).toBe(1)
  })

  it('does not display reason left options if not within 7 years', () => {
    const past = daysAgo(today, 365 * 8)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reason-options').length).toBe(0)
  })

  it('does not display reason left options if currently employed', () => {
    const past = daysAgo(today, 365 * 10)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: true,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reason-options').length).toBe(0)
  })

  it('does not display reason for leaving if currently employed', () => {
    const past = daysAgo(today, 365 * 3)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: true,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reason-description').length).toBe(0)
  })

  describe('when unemployment is selected', () => {
    let component

    beforeEach(() => {
      const past = daysAgo(today, 365 * 3)
      const props = {
        EmploymentActivity: { value: 'Unemployment' },
        Dates: {
          present: true,
          from: {
            month: `${past.getMonth() + 1}`,
            day: `${past.getDate()}`,
            year: `${past.getFullYear()}`
          },
          to: {}
        }
      }
      component = createComponent(props)
    })

    it('it does not display reason for leaving', () => {
      expect(component.contains(<ReasonLeft />)).toBe(false)
    })

    it('it does not display reprimand', () => {
      expect(component.contains(<Reprimand />)).toBe(false)
    })
  })

  it('it does display reason for leaving', () => {
    const past = daysAgo(today, 365 * 3)
    const props = {
      EmploymentActivity: { value: 'ActiveMilitary' },
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getDate()}`,
          year: `${past.getFullYear()}`
        },
        to: {}
      }
    }
    const component = createComponent(props)
    expect(component.find('.reason-description').length).toBe(1)
  })

  it('handles defaults', () => {
    expect(EmploymentItem.defaultProps.dispatch()).toEqual(undefined)
    expect(EmploymentItem.defaultProps.onUpdate()).toEqual(undefined)
    expect(EmploymentItem.defaultProps.onError(null, [])).toEqual([])
  })

  it('hides APO for address of employment if self employed', () => {
    const props = {
      EmploymentActivity: { value: 'SelfEmployment' },
    }

    const component = createComponent(props)
    const employmentAddressParent = component.find("[data-fieldName='employmentAddress']")
    expect(employmentAddressParent.find('.apofpo').length).toBe(0)
  })
})
