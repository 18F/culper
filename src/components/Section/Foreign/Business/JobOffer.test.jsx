import React from 'react'
import { mount } from 'enzyme'
import JobOffer from './JobOffer'

describe('The foreign business job offer component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      Address: { country: 'United States' },
      Accepted: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<JobOffer {...expected} />)
    component.find('.employment-name .first input').simulate('change')
    component.find('.employment-description textarea').simulate('change')
    component.find('.employment-date .day input').simulate('change')
    component.find('.employment-address .yes input').simulate('change')
    component.find('.employment-accepted .yes input').simulate('change')
    component.find('.employment-explanation textarea').simulate('change')
    expect(updates).toBe(5)
  })
})
