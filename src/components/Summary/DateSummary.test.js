import React from 'react'
import { mount } from 'enzyme'
import { DateSummary } from './DateSummary'

describe('The date summary', () => {
  it('display unknown if no props', () => {
    const summary = DateSummary(null, 'Unknown')
    expect(summary).toBe('')
  })

  it('display empty if missing from and to in date range', () => {
    const item = { to: {}, from: {}}
    const summary = DateSummary(item, 'Unknown')
    expect(summary).toBe('')
  })

  it('display empty if missing date value', () => {
    const item = { date: {} }
    const summary = DateSummary(item, 'Unknown')
    expect(summary).toBe('')
  })

  it('display date for single value', () => {
    const expected = '6/1982'
    const item = { date: new Date('6/1/1982') }
    const summary = DateSummary(item, 'Unknown')
    expect(summary).toBe(expected)
  })

  it('display date range with missing from value', () => {
    const expected = 'NA - 6/1982'
    const item = { to: { date: new Date('6/1/1982') } }
    const summary = DateSummary(item, 'NA')
    expect(summary).toBe(expected)
  })

  it('display date range with missing to value', () => {
    const expected = '6/1982 - NA'
    const item = { from: { date: new Date('6/1/1982') } }
    const summary = DateSummary(item, 'NA')
    expect(summary).toBe(expected)
  })

  it('display date range', () => {
    const expected = '6/1982 - 6/1982'
    const item = { from: { date: new Date('6/1/1982') }, to: { date: new Date('6/1/1982') } }
    const summary = DateSummary(item, 'NA')
    expect(summary).toBe(expected)
  })
})
