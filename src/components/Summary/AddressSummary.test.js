import React from 'react'
import { mount } from 'enzyme'
import { AddressSummary } from './AddressSummary'

describe('The address summary', () => {
  it('display unknown if no props', () => {
    const summary = AddressSummary(null, 'Unknown')
    expect(summary).toBe('Unknown')
  })

  it('display unknown if no address line 1', () => {
    const item = {}
    const summary = AddressSummary(item, 'Unknown')
    expect(summary).toBe('Unknown')
  })

  it('display United States address', () => {
    const expected = '123 some rd, springfield, IL 12345'
    const item = {
      addressType: 'United States',
      address: '123 Some Rd',
      city: 'Springfield',
      state: 'IL',
      zipcode: '12345'
    }
    const summary = AddressSummary(item, 'Unknown')
    expect(summary).toBe(expected)
  })

  it('display APO/FPO address', () => {
    const expected = '123 some rd, FPO, AA 12345'
    const item = {
      addressType: 'APOFPO',
      address: '123 Some Rd',
      apoFpoType: 'FPO',
      apoFpo: 'AA',
      zipcode: '12345'
    }
    const summary = AddressSummary(item, 'Unknown')
    expect(summary).toBe(expected)
  })

  it('display international address', () => {
    const expected = '123 some rd, frankfurt, germany'
    const item = {
      addressType: 'International',
      address: '123 Some Rd',
      city: 'Frankfurt',
      country: 'Germany'
    }
    const summary = AddressSummary(item, 'Unknown')
    expect(summary).toBe(expected)
  })
})
