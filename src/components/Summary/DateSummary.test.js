import React from 'react' // eslint-disable-line no-unused-vars
import { mount } from 'enzyme' // eslint-disable-line no-unused-vars
import { DateSummary } from './DateSummary'

describe('The date summary', () => {
  it('display unknown if no props', () => {
    const summary = DateSummary(null, 'Unknown')
    expect(summary).toBe('')
  })

  it('display empty if missing from and to in date range', () => {
    const item = { to: {}, from: {} }
    const summary = DateSummary(item, 'Unknown')
    expect(summary).toBe('')
  })

  it('display empty if missing date value', () => {
    const expected = ''
    const item = {}
    const summary = DateSummary(item, 'Unknown')
    expect(summary).toEqual(expected)
  })

  it('display date for single value', () => {
    const expected = <span>6/1982</span>
    const item = {
      month: '6',
      day: '1',
      year: '1982'
    }

    const summary = DateSummary(item, 'Unknown')
    expect(summary).toEqual(expected)
  })

  it('display date range with missing from value', () => {
    const expected = <span>NA - 6/1982</span>
    const item = {
      to: {
        month: '6',
        day: '1',
        year: '1982'
      }
    }
    const summary = DateSummary(item, 'NA')
    expect(summary).toEqual(expected)
  })

  it('display date range with missing to value', () => {
    const expected = <span>6/1982 - NA</span>
    const item = {
      from: {
        month: '6',
        day: '1',
        year: '1982'
      }
    }
    const summary = DateSummary(item, 'NA')
    expect(summary).toEqual(expected)
  })

  it('display date range', () => {
    const expected = <span>6/1982 - 6/1982</span>
    const item = {
      from: {
        month: '6',
        day: '1',
        year: '1982'
      },
      to: {
        month: '6',
        day: '1',
        year: '1982'
      }
    }
    const summary = DateSummary(item, 'NA')
    expect(summary).toEqual(expected)
  })

  it('display date for single value with the day', () => {
    const expected = <span>6/1/1982</span>
    const item = {
      month: '6',
      day: '1',
      year: '1982'
    }
    const summary = DateSummary(item, 'Unknown', true)
    expect(summary).toEqual(expected)
  })

  it('display nothing if empty object', () => {
    const expected = ''
    const item = {}
    const summary = DateSummary(item, 'Unknown')
    expect(summary).toBe(expected)
  })
})
