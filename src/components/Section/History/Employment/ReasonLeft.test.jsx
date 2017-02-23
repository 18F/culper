import React from 'react'
import { mount } from 'enzyme'
import { i18n } from '../../../../config'
import ReasonLeft from './ReasonLeft'

describe('The reason left component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'peace_i_am_out'
    }
    const component = mount(<ReasonLeft {...expected} />)
    expect(component.find('.employment-left').length).toEqual(1)
    expect(component.find('.explanation-left').length).toEqual(0)
    expect(component.find('.date-left').length).toEqual(0)
  })

  it('display explanation and date when a value is selected', () => {
    const expected = {
      name: 'peace_i_am_out',
      Reason: 'Performance'
    }
    const component = mount(<ReasonLeft {...expected} />)
    expect(component.find('.employment-left').length).toEqual(1)
    expect(component.find('.explanation-left').length).toEqual(1)
    expect(component.find('.date-left').length).toEqual(1)
  })

  it('renders verbiage differently based on reason', () => {
    const expectations = [
      {
        name: 'peace_i_am_out',
        Reason: 'Fired',
        explanationText: i18n.t('history.employment.default.left.fired.text'),
        dateText: i18n.t('history.employment.default.left.fired.date')
      },
      {
        name: 'peace_i_am_out',
        Reason: 'Quit',
        explanationText: i18n.t('history.employment.default.left.quit.text'),
        dateText: i18n.t('history.employment.default.left.quit.date')
      },
      {
        name: 'peace_i_am_out',
        Reason: 'Charges',
        explanationText: i18n.t('history.employment.default.left.charges.text'),
        dateText: i18n.t('history.employment.default.left.charges.date')
      },
      {
        name: 'peace_i_am_out',
        Reason: 'Performance',
        explanationText: i18n.t('history.employment.default.left.performance.text'),
        dateText: i18n.t('history.employment.default.left.performance.date')
      },
      {
        name: 'peace_i_am_out',
        Reason: 'Other',
        explanationText: i18n.t('history.employment.default.left.other.text'),
        dateText: i18n.t('history.employment.default.left.other.date')
      }
    ]

    for (const dreams of expectations) {
      const component = mount(<ReasonLeft {...dreams} />)
      expect(component.find('.explanation-left label').text()).toEqual(dreams.explanationText)
      expect(component.find('.date-left > label').text()).toEqual(dreams.dateText)
    }
  })
})
