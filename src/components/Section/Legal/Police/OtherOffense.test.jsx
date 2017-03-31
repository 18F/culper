import React from 'react'
import { mount } from 'enzyme'
import OtherOffense from './OtherOffense'

describe('The offense component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'offense'
    }
    const component = mount(<OtherOffense {...expected} />)
    expect(component.find('.offense-date').length).toEqual(2)
    expect(component.find('.offense-description').length).toEqual(1)
    expect(component.find('.offense-violence').length).toEqual(1)
    expect(component.find('.offense-firearms').length).toEqual(1)
    expect(component.find('.offense-substances').length).toEqual(1)
    expect(component.find('.offense-courtname').length).toEqual(1)
    expect(component.find('.offense-courtaddress').length).toEqual(1)
    expect(component.find('.offense-courttype').length).toEqual(1)
    expect(component.find('.offense-sentenced').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      onUpdate: () => { updates++ }
    }
    const component = mount(<OtherOffense {...expected} />)
    component.find('.offense-date .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.offense-date .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.offense-date .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.offense-description textarea').simulate('change', { target: { value: 'Some description' } })
    component.find('.offense-violence .yes input').simulate('change')
    component.find('.offense-firearms .yes input').simulate('change')
    component.find('.offense-substances .yes input').simulate('change')
    component.find('.offense-courtname input').simulate('change', { target: { value: 'Some court' } })
    component.find('.offense-courtaddress .city input').simulate('change', { target: { value: 'The city' } })
    component.find('.offense-courttype .charge-felony input').simulate('change')
    component.find('.offense-courtcharge input').simulate('change', { target: { value: 'charge' } })
    component.find('.offense-courtoutcome input').simulate('change', { target: { value: 'outcome' } })
    component.find('.offense-courtdate .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.offense-courtdate .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.offense-sentenced .yes input').simulate('change')
    component.find('textarea#description').simulate('change', { target: { value: 'Test' } })

    // Toggle to display awaiting trial
    component.find('.offense-sentenced .no input').simulate('change')
    component.find({ type: 'radio', name: 'awaiting_trial', value: 'Yes' }).simulate('change')
    component.find('#awaiting_trial_explanation').simulate('change')

    expect(updates).toBeGreaterThan(6)
  })
})

