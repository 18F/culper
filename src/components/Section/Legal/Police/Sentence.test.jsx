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
      { type: 'radio', name: 'incarcerated', value: 'Yes' }
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

    selectors = [
      {type: 'checkbox', name: 'ProbationDatesNA'},
      {type: 'checkbox', name: 'IncarcerationDatesNA'}
    ]

    selectors.forEach(selector => {
      component.find(selector).first().simulate('change')
    })

    expect(updates).toEqual(7)
  })
})
