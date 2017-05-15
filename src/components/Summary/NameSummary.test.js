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
    expect(summary).toEqual(<span className="title-case">Bob</span>)
  })

  it('display only middle name', () => {
    const item = { first: '', middle: 'Joe', last: '' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toEqual(<span className="title-case">Joe</span>)
  })

  it('display only last name', () => {
    const item = { first: '', middle: '', last: 'Smith' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toEqual(<span className="title-case">Smith</span>)
  })

  it('display full name', () => {
    const item = { first: 'Bob', middle: 'Joe', last: 'Smith' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toEqual(<span className="title-case">Bob Joe Smith</span>)
  })
})
