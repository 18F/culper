import React from 'react' // eslint-disable-line no-unused-vars
import { mount } from 'enzyme' // eslint-disable-line no-unused-vars
import { NameSummary } from './NameSummary'

describe('The name summary', () => {
  it('display unknown if no props', () => {
    const expected = 'Unknown'
    const summary = NameSummary(null, 'Unknown')
    expect(summary).toEqual(expected)
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

  it('suffix should be value from selection', () => {
    const item = { first: 'Bob', middle: 'Joe', last: 'Smith', suffix: 'Sr' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toEqual(<span className="title-case">Bob Joe Smith Sr</span>)
  })

  it('suffix should be capitalized', () => {
    const item = { first: 'Bob', middle: 'Joe', last: 'Smith', suffix: 'IV' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toEqual(<span className="title-case">Bob Joe Smith IV</span>)
  })

  it('suffix should be capitalized', () => {
    const item = { first: 'Bob', middle: 'Joe', last: 'Smith', suffix: 'Other', suffixOther: 'princess of power' }
    const summary = NameSummary(item, 'Unknown')
    expect(summary).toEqual(<span className="title-case">Bob Joe Smith Princess Of Power</span>)
  })
})
