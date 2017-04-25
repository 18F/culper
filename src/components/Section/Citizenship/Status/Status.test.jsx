import React from 'react'
import { mount } from 'enzyme'
import Status from './Status'

describe('The status component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'status'
    }
    const component = mount(<Status {...expected} />)
    expect(component.find('.citizenship-status').length).toBe(1)
    expect(component.find('.block').length).toBeGreaterThan(0)
  })

  // it('triggers updates when changing values', () => {
  //   let updates = 0
  //   const expected = {
  //     name: 'status',
  //     onUpdate: (obj) => {
  //       updates++
  //     }
  //   }
  //   const component = mount(<Status {...expected} />)
  //   component.find('.citizenship-status-citizen input').simulate('change')

  //   component.find('.citizenship-status-foreignborn input').simulate('change')
  //   component.find('.citizenship-abroad-other input').simulate('change')
  //   component.find({ name: 'Explanation' }).simulate('change', { target: { value: 'explanation' } })
  //   component.find({ name: 'DocumentNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find('.document-issued .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.place-issued .domestic input').simulate('change')
  //   component.find('.place-issued .city input').simulate('change', { target: { name: 'city', value: 'City name' } })
  //   component.find('.document-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
  //   component.find({ name: 'CertificateNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find('.certificate-issued .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.certificate-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
  //   component.find('.born-on-military-installation .yes input').simulate('change')
  //   component.find({ name: 'MilitaryBase' }).simulate('change', { target: { value: 'base' } })

  //   component.find('.citizenship-status-naturalized input').simulate('change')
  //   component.find('.entry-date .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.entry-location .domestic input').simulate('change')
  //   component.find('.entry-location .city input').simulate('change', { target: { name: 'city', value: 'City name' } })
  //   component.find('.prior-citizenship input#PriorCitizenship').simulate('change', { target: { name: 'country', value: 'United States' } })
  //   component.find('.has-alien-registration .yes input').simulate('change')
  //   component.find({ name: 'AlienRegistrationNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find({ name: 'CertificateNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find({ name: 'CertificateCourtName' }).simulate('change', { target: { value: 'court name' } })
  //   component.find('.certificate-court-address .domestic input').simulate('change')
  //   component.find('.certificate-court-address .city input').simulate('change', { target: { name: 'city', value: 'City name' } })
  //   component.find('.certificate-issued .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.certificate-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
  //   component.find('.citizenship-basis-individual input').simulate('change')
  //   component.find({ name: 'Explanation' }).simulate('change', { target: { value: 'explanation' } })

  //   component.find('.citizenship-status-derived input').simulate('change')
  //   component.find({ name: 'AlienRegistrationNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find({ name: 'PermanentResidentCardNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find({ name: 'CertificateNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find('.certificate-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
  //   component.find('.certificate-issued .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.citizenship-basis-individual input').simulate('change')
  //   component.find({ name: 'Explanation' }).simulate('change', { target: { value: 'explanation' } })

  //   component.find('.citizenship-status-notcitizen input').simulate('change')
  //   component.find({ name: 'ResidenceStatus' }).simulate('change', { target: { value: 'status' } })
  //   component.find('.entry-date .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.entry-location .domestic input').simulate('change')
  //   component.find('.entry-location .city input').simulate('change', { target: { name: 'city', value: 'City name' } })
  //   component.find('.prior-citizenship input#PriorCitizenship').simulate('change', { target: { name: 'country', value: 'United States' } })
  //   component.find({ name: 'AlienRegistrationNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find('.document-expiration .day input').simulate('change', { target: { name: 'day', value: '1' } })
  //   component.find('.document-type-other input').simulate('change')
  //   component.find({ name: 'Explanation' }).simulate('change', { target: { value: 'explanation' } })
  //   component.find({ name: 'DocumentNumber' }).simulate('change', { target: { value: 'number' } })
  //   component.find('.document-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
  //   component.find('.document-issued .day input').simulate('change', { target: { name: 'day', value: '1' } })

  //   expect(updates).toBeGreaterThan(4)
  // })
})
