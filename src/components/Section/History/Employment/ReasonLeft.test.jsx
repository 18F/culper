import React from 'react'
import { mount } from 'enzyme'
import { i18n } from '../../../../config'
import ReasonLeft, { ReasonOptions } from './ReasonLeft'

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
    const expected = {
      name: 'peace_i_am_out',
      Comments: 'Hello',
      Reasons: [{Has: 'Yes'}]
    }
    const component = mount(<ReasonLeft {...expected} />)
    expect(component.find('.employment-left').length).toEqual(1)
  })

  it('adds a comment and description', () => {
    let updates = 0
    const expected = {
      name: 'peace_i_am_out',
      Comments: '',
      ReasonDescription: 'Foo',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ReasonLeft {...expected} />)
    component.find({name: 'reason_description'}).simulate('change')
    component.find('.add-comment').simulate('click')
    let comment = component.find({name: 'comments'})
    expect(comment.length).toBe(1)
    comment.simulate('change')
    expect(updates).toBe(4)
  })

  it('renders verbiage differently based on reason', () => {
    const expectations = [
      {
        name: 'peace_i_am_out',
        Reasons: [{Has: 'Yes', Reason: {Reason: 'Fired'}}],
        explanationText: i18n.t('history.employment.default.left.fired.text'),
        dateText: i18n.t('history.employment.default.left.fired.date')
      },
      {
        name: 'peace_i_am_out',
        Reasons: [{Has: 'Yes', Reason: {Reason: 'Quit'}}],
        explanationText: i18n.t('history.employment.default.left.quit.text'),
        dateText: i18n.t('history.employment.default.left.quit.date')
      },
      {
        name: 'peace_i_am_out',
        Reasons: [{Has: 'Yes', Reason: {Reason: 'Charges'}}],
        explanationText: i18n.t('history.employment.default.left.charges.text'),
        dateText: i18n.t('history.employment.default.left.charges.date')
      },
      {
        name: 'peace_i_am_out',
        Reasons: [{Has: 'Yes', Reason: {Reason: 'Performance'}}],
        explanationText: i18n.t('history.employment.default.left.performance.text'),
        dateText: i18n.t('history.employment.default.left.performance.date')
      },
      {
        name: 'peace_i_am_out',
        Reasons: [{Has: 'Yes', Reason: {Reason: 'Other'}}],
        explanationText: i18n.t('history.employment.default.left.other.text'),
        dateText: i18n.t('history.employment.default.left.other.date')
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

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'peace_i_am_out',
      Reason: 'Fired',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ReasonOptions {...expected} />)
    component.find('textarea').simulate('change')
    component.find({type: 'text', name: 'month'}).simulate('change', { target: { value: '1' } })
    component.find({type: 'radio', value: 'Quit'}).simulate('click')
    expect(updates).toBe(3)
  })
})
