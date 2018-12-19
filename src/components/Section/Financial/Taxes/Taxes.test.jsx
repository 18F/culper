import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Taxes from './Taxes'
import { i18n } from '../../../../config'

describe('The taxes component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Taxes {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'taxes'
    }
    const component = createComponent(expected)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'taxes',
      HasTaxes: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'taxes',
      HasTaxes: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'taxes',
      HasTaxes: { value: 'Yes' },
      List: { branch: { value: 'Yes' }, items: [{}] },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.branch .yes input')
      .first()
      .simulate('change')
    component.find('.failure-file input').simulate('change')
    component
      .find('.taxes-year .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.taxes-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.taxes-agency input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.taxes-taxtype input')
      .simulate('change', { target: { value: 'Income' } })
    component
      .find('.taxes-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component
      .find('.taxes-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.taxes-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.taxes-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.taxes-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBeGreaterThan(7)
  })

  describe('handles tax dates', () => {
    it('with good data - the year failed to file or pay is before the date satisfied', () => {
      const props = {
        valid: true
      }
      const component = createComponent(props)
      expect(
        component
          .find('.error-messages [data-i18n="error.taxesSatisfied.min"]')
          .children().length
      ).toEqual(0)
    })
    it('with bad data - the year failed to file or pay is after the date satisfied', () => {
      const props = {
        HasTaxes: {
          name: 'has_taxes',
          value: 'Yes'
        },
        List: {
          items: [
            {
              Item: {
                Year: {
                  estimated: false,
                  month: '1',
                  day: '1',
                  year: '2000'
                },
                Date: {
                  estimated: false,
                  month: '1',
                  day: '1',
                  year: '1970'
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
          .find('.error-messages [data-i18n="error.taxesSatisfied.min"]')
          .text()
      ).toEqual(
        `${i18n.t('error.taxesSatisfied.min.title')}${i18n.t(
          'error.taxesSatisfied.min.message'
        )}`
      )
    })
  })
})
