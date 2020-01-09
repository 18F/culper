import { totalYears, sort } from './helpers'

describe('the totalYears function', () => {
  describe('if birthdate is missing', () => {
    it('returns the years param', () => {
      expect(totalYears(undefined, 5)).toEqual(5)
    })
  })

  // TODO BUG this test case seems to be broken in the function and should be fixed.
  describe.skip('if birthdate is younger than 18', () => {
    const birthdate = new Date('1/1/2010')

    it('returns the minimum of 2 years', () => {
      expect(totalYears(birthdate)).toEqual(2)
    })
  })

  describe('if birthdate is less than 2 years older than 18', () => {
    const birthdate = new Date('1/1/2001')

    it('returns the minimum of 2 years', () => {
      expect(totalYears(birthdate)).toEqual(2)
    })
  })

  describe('if birthdate is less than the years param older than 18', () => {
    const birthdate = new Date('1/1/1996')

    it('returns the difference between age and years param', () => {
      expect(totalYears(birthdate, 10)).toEqual(7)
    })
  })

  describe('if birthdate is more than the years param older than 18', () => {
    const birthdate = new Date('1/1/1980')

    it('returns the years param', () => {
      expect(totalYears(birthdate, 10)).toEqual(10)
    })
  })
})

describe('the sort function', () => {
  it('sorts items by most recent date first', () => {
    const testItems = [
      { Item: { Dates: { to: { day: 1, month: 1, year: 2010 } } } },
      { Item: { Dates: { to: { day: 10, month: 12, year: 2004 } } } },
      { Item: { Dates: { to: { day: 30, month: 2, year: 2012 } } } },
      { Item: { Dates: null } },
    ]

    expect(testItems.sort(sort)).toEqual([
      { Item: { Dates: { to: { day: 30, month: 2, year: 2012 } } } },
      { Item: { Dates: { to: { day: 1, month: 1, year: 2010 } } } },
      { Item: { Dates: { to: { day: 10, month: 12, year: 2004 } } } },
      { Item: { Dates: null } },
    ])
  })

  it('sorts gap items last', () => {
    const testItems = [
      { Item: { Dates: { to: { day: 1, month: 1, year: 2010 } } } },
      { Item: { type: 'Gap' } },
      { Item: { Dates: { to: { day: 10, month: 12, year: 2004 } } } },
      { Item: { type: 'Gap' } },
      { Item: { Dates: { to: { day: 30, month: 2, year: 2012 } } } },
    ]

    expect(testItems.sort(sort)).toEqual([
      { Item: { Dates: { to: { day: 30, month: 2, year: 2012 } } } },
      { Item: { Dates: { to: { day: 1, month: 1, year: 2010 } } } },
      { Item: { Dates: { to: { day: 10, month: 12, year: 2004 } } } },
      { Item: { type: 'Gap' } },
      { Item: { type: 'Gap' } },
    ])
  })
})
