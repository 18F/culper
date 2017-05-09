import React from 'react'
import { mount } from 'enzyme'
import { NameSummary } from './NameSummary'

describe('The name summary', () => {
  it('display unknown if no props', () => {
    const summary = NameSummary(null, 'Unknown')
    expect(summary).toBe('Unknown')
  })

  it('display only first name', () => {
    const item = { first: 'Bob', middle: '', last: '' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toBe('Bob')
  })

  it('display only middle name', () => {
    const item = { first: '', middle: 'Joe', last: '' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toBe('Joe')
  })

  it('display only last name', () => {
    const item = { first: '', middle: '', last: 'Smith' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toBe('Smith')
  })

  it('display full name', () => {
    const item = { first: 'Bob', middle: 'Joe', last: 'Smith' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toBe('Bob Joe Smith')
  })
})
