import {
  today, dateWithinRange, sortDateRanges, findTimelineGaps,
} from './date'

describe('The dateWithinRange helper function', () => {
  it('returns true if the date is within the range', () => {
    const testDate = today.minus({ years: 2 }).toObject()
    const testDuration = { years: 5 }

    expect(dateWithinRange(testDate, testDuration)).toBe(true)
  })

  it('returns false if the date is not within the range', () => {
    const testDate = today.minus({ years: 15 }).toObject()
    const testDuration = { years: 5 }

    expect(dateWithinRange(testDate, testDuration)).toBe(false)
  })

  it('returns true if the date is exactly at the range boundary', () => {
    const testDate = today.minus({ years: 5 }).toObject()
    const testDuration = { years: 5 }

    expect(dateWithinRange(testDate, testDuration)).toBe(true)
  })
})

describe('The sortDateRanges function', () => {
  it('sorts a list of date ranges', () => {
    const testData = [
      {
        from: today.minus({ years: 5 }).toObject(),
        to: today.minus({ years: 1 }).toObject(),
      },
      {
        from: today.minus({ years: 4, months: 11 }).toObject(),
        present: true,
      },
      {
        from: today.minus({ years: 10 }).toObject(),
        to: today.minus({ years: 3 }).toObject(),
      },
    ]

    const expected = [
      {
        from: today.minus({ years: 10 }),
        to: today.minus({ years: 3 }),
      },
      {
        from: today.minus({ years: 5 }),
        to: today.minus({ years: 1 }),
      },
      {
        from: today.minus({ years: 4, months: 11 }),
        to: today,
      },
    ]

    expect(sortDateRanges(testData)).toEqual(expected)
  })
})

describe('The findTimelineGaps function', () => {
  it('returns gaps for ranges that overlap', () => {
    const testDuration = { years: 3 }
    const testRanges = [
      {
        from: today.minus({ years: 8 }).toObject(),
        to: today.minus({ years: 6 }).toObject(),
      },
      {
        from: today.minus({ years: 5, months: 8 }).toObject(),
        to: today.minus({ years: 2, months: 10 }).toObject(),
      },
      {
        from: today.minus({ years: 2, months: 4 }).toObject(),
        to: today.minus({ years: 1, months: 11 }).toObject(),
      },
      {
        from: today.minus({ months: 6 }).toObject(),
        present: true,
      },
    ]

    const expectedGaps = [
      {
        from: today.minus({ years: 2, months: 10 }),
        to: today.minus({ years: 2, months: 4 }),
      },
      {
        from: today.minus({ years: 1, months: 11 }),
        to: today.minus({ months: 6 }),
      },
    ]

    expect(findTimelineGaps(testDuration, testRanges)).toEqual(expectedGaps)
  })

  it('returns gaps for ranges that are too early', () => {
    const testDuration = { years: 5 }
    const testRanges = [
      {
        from: today.minus({ years: 8 }).toObject(),
        to: today.minus({ years: 6 }).toObject(),
      },
    ]

    const expectedGaps = [
      {
        from: today.minus({ years: 5 }),
        to: today,
      },
    ]

    expect(findTimelineGaps(testDuration, testRanges)).toEqual(expectedGaps)
  })

  it('returns no gaps if the range is to the present', () => {
    const testDuration = { years: 5 }
    const testRanges = [
      {
        from: {
          day: '1',
          month: '1',
          year: '2005',
        },
        present: true,
      },
    ]

    const expectedGaps = []

    expect(findTimelineGaps(testDuration, testRanges)).toEqual(expectedGaps)
  })
})
