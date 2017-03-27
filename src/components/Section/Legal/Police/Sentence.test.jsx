import React from 'react'
import { mount } from 'enzyme'
import Sentence from './Sentence'

describe('The Sentence  component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'sentence'
    }
    const component = mount(<Sentence {...expected} />)
    expect(component.find('.description').length).toEqual(1)
    expect(component.find('.exceeds-year').length).toEqual(1)
    expect(component.find('.incarcerated').length).toEqual(1)
    expect(component.find('.incarceration-dates').length).toEqual(1)
    expect(component.find('.probation-dates').length).toEqual(1)
    expect(component.find('.awaiting-trial').length).toEqual(1)
    expect(component.find('.awaiting-trial-explanation').length).toEqual(0)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'sentence',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Sentence {...expected} />)

    let selectors = [
      '#description',
      { type: 'radio', name: 'exceeding_year', value: 'Yes' },
      { type: 'radio', name: 'incarcerated', value: 'Yes' },
      { type: 'radio', name: 'awaiting_trial', value: 'Yes' },
      '#awaiting_trial_explanation'
    ]

    selectors.forEach(selector => {
      component.find(selector).simulate('change')
    })

    selectors = [
      '.probation-dates input#month',
      '.incarceration-dates input#month'
    ]

    selectors.forEach(selector => {
      component.find(selector).first().simulate('change', { target: { value: '1' } })
    })

    expect(updates).toEqual(7)
  })
})
