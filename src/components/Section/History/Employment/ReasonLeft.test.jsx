import React from 'react'
import { mount } from 'enzyme'
import { i18n } from '../../../../config'
import { today, daysAgo } from '../dateranges'
import ReasonLeft from './ReasonLeft'

describe('The reason left component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'peace_i_am_out'
    }
    const component = mount(<ReasonLeft {...expected} />)
    expect(component.find('.employment-left').length).toEqual(0)
    expect(component.find('.explanation-left').length).toEqual(0)
    expect(component.find('.date-left').length).toEqual(0)
  })

  it('display explanation and date when a value is selected', () => {
    const past = daysAgo(today, 366 * 7)
    const expected = {
      name: 'peace_i_am_out',
      Dates: {
        present: true,
        from: { month: `${past.getMonth()+1}`, day: `${past.getDate()}`, year: `${past.getFullYear()}` },
        to: {}
      },
      Comments: { value: 'Hello' },
      Reasons: { items: [{ Item: { Has: { value: 'Yes' } } }] }
    }
    const component = mount(<ReasonLeft {...expected} />)
    expect(component.find('.employment-left').length).toEqual(1)
  })

  it('adds a comment and description', () => {
    let updates = 0
    const past = daysAgo(today, 365 * 7)
    const expected = {
      name: 'peace_i_am_out',
      Dates: {
        present: false,
        from: { month: `${past.getMonth()+1}`, day: `${past.getDate()}`, year: `${past.getFullYear()}` },
        to: {}
      },
      Comments: { value: '' },
      ReasonDescription: { value: 'Foo' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ReasonLeft {...expected} />)
    component.find({name: 'reason_description'}).simulate('change')
    component.find('.comments-button.add').simulate('click')
    let comment = component.find({name: 'comments'})
    expect(comment.length).toBe(1)
    comment.simulate('change')
    expect(updates).toBe(1)
  })

  it('renders verbiage differently based on reason', () => {
    const past = daysAgo(today, 365 * 7)
    const expectations = [
      {
        name: 'peace_i_am_out',
        Dates: {
          present: true,
          from: { month: `${past.getMonth()+1}`, day: `${past.getDate()}`, year: `${past.getFullYear()}` },
          to: {}
        },
        Reasons: { items: [{ Item: { Has: { value: 'Yes' }, Reason: { value: 'Fired' } } }] },
        explanationText: i18n.t('history.employment.default.left.fired.text'),
        dateText: i18n.t('history.employment.default.left.fired.date')
      },
      {
        name: 'peace_i_am_out',
        Dates: {
          present: true,
          from: { month: `${past.getMonth()+1}`, day: `${past.getDate()}`, year: `${past.getFullYear()}` },
          to: {}
        },
        Reasons: { items: [{ Item: { Has: { value: 'Yes' }, Reason: { value: 'Quit' } } }] },
        explanationText: i18n.t('history.employment.default.left.quit.text'),
        dateText: i18n.t('history.employment.default.left.quit.date')
      },
      {
        name: 'peace_i_am_out',
        Dates: {
          present: true,
          from: { month: `${past.getMonth()+1}`, day: `${past.getDate()}`, year: `${past.getFullYear()}` },
          to: {}
        },
        Reasons: { items: [{ Item: { Has: { value: 'Yes' }, Reason: { value: 'Charges' } } }] },
        explanationText: i18n.t('history.employment.default.left.charges.text'),
        dateText: i18n.t('history.employment.default.left.charges.date')
      },
      {
        name: 'peace_i_am_out',
        Dates: {
          present: true,
          from: { month: `${past.getMonth()+1}`, day: `${past.getDate()}`, year: `${past.getFullYear()}` },
          to: {}
        },
        Reasons: { items: [{ Item: { Has: { value: 'Yes' }, Reason: { value: 'Performance' } } }] },
        explanationText: i18n.t('history.employment.default.left.performance.text'),
        dateText: i18n.t('history.employment.default.left.performance.date')
      }
    ]
    for (const dreams of expectations) {
      let updates = 0
      const component = mount(<ReasonLeft {...dreams} onUpdate={() => { updates++ }} />)
      expect(component.find('.explanation-left label').text()).toEqual(dreams.explanationText)
      expect(component.find('.date-left > label').text()).toEqual(dreams.dateText)
      component.find({type: 'radio'}).first().simulate('change')
      expect(updates).toBe(1)
    }
  })
})
