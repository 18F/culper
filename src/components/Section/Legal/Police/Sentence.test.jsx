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
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Sentence {...expected} />)

    let selectors = [
      '.description textarea',
      '.exceeds-year .yes input',
      '.incarcerated .yes input'
    ]

    selectors.forEach(selector => {
      component.find(selector).simulate('change')
    })

    selectors = [
      '.probation-dates .month input',
      '.incarceration-dates .month input'
    ]

    selectors.forEach(selector => {
      component
        .find(selector)
        .first()
        .simulate('change', { target: { value: '1' } })
    })

    selectors = [
      '.not-applicable .probation-dates-na .button input',
      '.not-applicable .incarceration-dates-na .button input'
    ]

    selectors.forEach(selector => {
      component
        .find(selector)
        .first()
        .simulate('change')
    })

    expect(updates).toEqual(7)
  })
})
