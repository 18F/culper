import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { i18n } from '../../../../config'
import { today, daysAgo } from '../dateranges'
import ReasonLeft from './ReasonLeft'

describe('The reason left component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <ReasonLeft {...expected} />
      </Provider>
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'peace_i_am_out',
    }
    const component = createComponent(expected)
    expect(component.find('.employment-left').length).toEqual(0)
    expect(component.find('.explanation-left').length).toEqual(0)
    expect(component.find('.date-left').length).toEqual(0)
  })

  it('no description or question if still employed', () => {
    const past = daysAgo(today, 365 * 1)
    const expected = {
      name: 'peace_i_am_out',
      Dates: {
        present: true,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getUTCDate()}`,
          year: `${past.getFullYear()}`,
        },
        to: {},
      },
    }
    const component = createComponent(expected)
    expect(component.find('.reason-description').length).toEqual(0)
    expect(component.find('.reason-options').length).toEqual(0)
  })

  it('show description and question if no longer employed and less than 7 years', () => {
    const past = daysAgo(today, 365 * 1)
    const expected = {
      name: 'peace_i_am_out',
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getUTCDate()}`,
          year: `${past.getFullYear()}`,
        },
        to: {},
      },
    }
    const component = createComponent(expected)
    expect(component.find('.reason-description').length).toEqual(1)
    expect(component.find('.reason-options').length).toEqual(1)
  })

  it('show description and not question if no longer employed and greater than 7 years', () => {
    const past = daysAgo(today, 365 * 10)
    const expected = {
      name: 'peace_i_am_out',
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getUTCDate()}`,
          year: `${past.getFullYear()}`,
        },
        to: {},
      },
    }
    const component = createComponent(expected)
    expect(component.find('.reason-description').length).toEqual(1)
    expect(component.find('.reason-options').length).toEqual(0)
  })

  it('display explanation and date when a value is selected', () => {
    const past = daysAgo(today, 365 * 7)
    const expected = {
      name: 'peace_i_am_out',
      Dates: {
        present: false,
        from: {
          month: `${past.getMonth() + 1}`,
          day: `${past.getUTCDate()}`,
          year: `${past.getFullYear()}`,
        },
        to: {},
      },
      Comments: { value: 'Hello' },
      Reasons: { items: [{ Item: { Has: { value: 'Yes' } } }] },
    }
    const component = createComponent(expected)
    expect(component.find('.employment-left').length).toEqual(1)
  })

  it('renders verbiage differently based on reason', () => {
    const past = daysAgo(today, 365 * 7)
    const expectations = [
      {
        name: 'peace_i_am_out',
        Dates: {
          present: false,
          from: {
            month: `${past.getMonth() + 1}`,
            day: `${past.getUTCDate()}`,
            year: `${past.getFullYear()}`,
          },
          to: {},
        },
        Reasons: {
          items: [
            { Item: { Has: { value: 'Yes' }, Reason: { value: 'Fired' } } },
          ],
        },
        explanationText: i18n.t('history.employment.default.left.fired.text'),
        dateText: i18n.t('history.employment.default.left.fired.date'),
      },
      {
        name: 'peace_i_am_out',
        Dates: {
          present: false,
          from: {
            month: `${past.getMonth() + 1}`,
            day: `${past.getUTCDate()}`,
            year: `${past.getFullYear()}`,
          },
          to: {},
        },
        Reasons: {
          items: [
            { Item: { Has: { value: 'Yes' }, Reason: { value: 'Quit' } } },
          ],
        },
        explanationText: i18n.t('history.employment.default.left.quit.text'),
        dateText: i18n.t('history.employment.default.left.quit.date'),
      },
      {
        name: 'peace_i_am_out',
        Dates: {
          present: false,
          from: {
            month: `${past.getMonth() + 1}`,
            day: `${past.getUTCDate()}`,
            year: `${past.getFullYear()}`,
          },
          to: {},
        },
        Reasons: {
          items: [
            { Item: { Has: { value: 'Yes' }, Reason: { value: 'Charges' } } },
          ],
        },
        explanationText: i18n.t('history.employment.default.left.charges.text'),
        dateText: i18n.t('history.employment.default.left.charges.date'),
      },
      {
        name: 'peace_i_am_out',
        Dates: {
          present: false,
          from: {
            month: `${past.getMonth() + 1}`,
            day: `${past.getUTCDate()}`,
            year: `${past.getFullYear()}`,
          },
          to: {},
        },
        Reasons: {
          items: [
            {
              Item: { Has: { value: 'Yes' }, Reason: { value: 'Performance' } },
            },
          ],
        },
        explanationText: i18n.t(
          'history.employment.default.left.performance.text'
        ),
        dateText: i18n.t('history.employment.default.left.performance.date'),
      },
    ]

    for (let i = 0; i < expectations.length; i += 1) {
      const item = expectations[i]
      let updates = 0
      const expected = {
        ...item,
        onUpdate: () => {
          updates += 1
        },
      }
      const component = createComponent(expected)
      expect(component.find('.explanation-left h4').text()).toEqual(
        item.explanationText
      )
      expect(component.find('.date-left h4').text()).toEqual(
        item.dateText
      )
      component
        .find({ type: 'radio' })
        .first()
        .simulate('change')
      expect(updates).toBe(1)
    }
  })
})
