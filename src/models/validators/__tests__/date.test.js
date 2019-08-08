import date from '../date'

describe.only('The date validator', () => {
  it('fails if the value is not an object', () => {
    const testData = 'date'
    expect(date(testData)).toEqual([
      'day.presence.REQUIRED',
      'month.presence.REQUIRED',
      'year.presence.REQUIRED',
    ])
  })

  it('fails if the value is not a valid date object', () => {
    const testData = { year: 23, month: 500, day: -1 }
    expect(date(testData)).toEqual(['date.datetime.INVALID_DATE'])
  })

  it('fails if year is an invalid value', () => {
    const testData = { year: 'abc' }
    expect(date(testData, { requireDay: false, requireMonth: false }))
      .toEqual(['date.datetime.INVALID_DATE'])
  })

  it('fails if year is too early', () => {
    const testData = { year: '0' }
    expect(date(testData, { requireDay: false, requireMonth: false }))
      .toEqual(['date.datetime.DATE_TOO_EARLY'])
  })

  it('fails if year is too late', () => {
    const testData = { year: '10001' }
    expect(date(testData, { requireDay: false, requireMonth: false }))
      .toEqual(['date.datetime.DATE_TOO_LATE'])
  })

  it('passes a valid date object', () => {
    const testData = { year: 2010, month: 5, day: 23 }
    expect(date(testData)).toBeNull()
  })

  describe('if year is not required', () => {
    it('passes with just day and month', () => {
      const testData = { month: 5, day: 23 }
      expect(date(testData, { requireYear: false })).toBeNull()
    })
  })

  describe('if month is not required', () => {
    it('passes with just day and year', () => {
      const testData = { year: 2010, day: 23 }
      expect(date(testData, { requireMonth: false })).toBeNull()
    })
  })

  describe('if day is not required', () => {
    it('passes with just year and month', () => {
      const testData = { month: 5, year: 2010 }
      expect(date(testData, { requireDay: false })).toBeNull()
    })
  })
})
