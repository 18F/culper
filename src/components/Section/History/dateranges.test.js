import {
  validDate,
  rangeSorter,
  daysInMonth,
  gaps,
  daysAgo,
  today,
  ten,
  utc,
  julian,
  fromJulian,
  endOfMonth,
  daysBetween,
  findPercentage
} from './dateranges'

describe('date ranges ', function() {
  it('validate valid date', () => {
    const tests = [
      {
        month: '1',
        day: '1',
        year: '2000',
        expected: true
      },
      {
        month: '1f',
        day: '1',
        year: '2000',
        expected: false
      },
      {
        month: '1',
        day: '1f',
        year: '2000',
        expected: false
      },
      {
        month: '1',
        day: '1',
        year: '2000f',
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(validDate(test)).toBe(test.expected)
    })
  })

  it('sorts a range', () => {
    const tests = [
      {
        ranges: [
          { from: { month: '1', day: '1', year: '2009' } },
          { from: { month: '1', day: '1', year: '2010' } }
        ],
        expected: [
          { from: { month: '1', day: '1', year: '2009' } },
          { from: { month: '1', day: '1', year: '2010' } }
        ]
      },
      {
        ranges: [
          { from: { month: '1', day: '1', year: '2010' } },
          { from: { month: '1', day: '1', year: '2010' } }
        ],
        expected: [
          { from: { month: '1', day: '1', year: '2010' } },
          { from: { month: '1', day: '1', year: '2010' } }
        ]
      },
      {
        ranges: [
          { from: { month: '1', day: '1', year: '2012' } },
          { from: { month: '1', day: '1', year: '2010' } }
        ],
        expected: [
          { from: { month: '1', day: '1', year: '2010' } },
          { from: { month: '1', day: '1', year: '2012' } }
        ]
      }
    ]

    tests.forEach(test => {
      expect(test.ranges.sort(rangeSorter)).toEqual(test.expected)
    })
  })

  it('can handle bad data for days in month', () => {
    expect(daysInMonth('g', '')).toBe(31)
    expect(daysInMonth('-', '')).toBe(31)
    expect(daysInMonth('13', '')).toBe(31)
    expect(daysInMonth('2', '')).toBe(28)
  })

  it('gaps', () => {
    const tests = [
      {
        ranges: [{ from: ten, to: today }],
        expected: []
      },
      {
        ranges: [{ from: daysAgo(today, 365 * 5), to: today }],
        expected: [{ from: ten, to: daysAgo(today, 365 * 5) }]
      },
      {
        ranges: [
          { from: daysAgo(today, 365 * 1), to: today },
          { from: daysAgo(today, 365 * 3), to: daysAgo(today, 365 * 1) },
          { from: ten, to: daysAgo(today, 365 * 4) }
        ],
        expected: [
          { from: daysAgo(today, 365 * 4), to: daysAgo(today, 365 * 3) }
        ]
      }
    ]

    const equality = (expected, actual) => {
      return (
        expected.getMonth() === actual.getMonth() &&
        expected.getFullYear() === actual.getFullYear()
      )
    }

    const minitest = (holes, expected) => {
      if (holes.length !== expected.length) {
        return false
      }

      for (const hole of holes) {
        if (
          !expected.some(
            x => equality(x.from, hole.from) && equality(x.to, hole.to)
          )
        ) {
          return false
        }
      }

      return true
    }

    tests.forEach(test => {
      expect(minitest(gaps(test.ranges), test.expected)).toBe(true)
    })
  })

  it('can utc', () => {
    expect(utc(null)).toBe(null)
    expect(utc('')).toBe(null)
    expect(utc(new Date())).not.toBe(null)
  })

  it('can julian', () => {
    expect(julian(null)).toBe(null)
    expect(julian(new Date())).not.toBe(null)
  })

  it('can calc end of month', () => {
    expect(endOfMonth(null)).toBe(null)
    expect(endOfMonth(new Date('1/1/2010'))).not.toBe(null)
  })

  it('can calc days between', () => {
    let start = new Date('1/1/2010')
    let end = new Date('1/2/2010')
    expect(daysBetween(null, null)).toBe(0)
    expect(daysBetween(start, end)).toBe(1)
  })

  it('can find percentage/position within a date range', () => {
    expect(findPercentage(10, 2, 2)).toBe(0)
    expect(findPercentage(4, 10, 2)).toBe(0)
    expect(findPercentage(170, 5, 40)).toBe(21.21)
    expect(findPercentage(170, 5, 230)).toBe(100)
  })

  it('can go from juilian', () => {
    expect(fromJulian(2458239)).not.toBe(null)
  })
})
