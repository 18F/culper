import { validDate, rangeSorter, daysInMonth, gaps,
         daysAgo, today, ten } from './dateranges'

describe('date ranges ', function () {
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
      expect(validDate(test.month, test.day, test.year)).toBe(test.expected)
    })
  })

  it('sorts a range', () => {
    const tests = [
      {
        ranges: [
          { from: new Date('1/1/2009') },
          { from: new Date('1/1/2010') }
        ],
        expected: [
          { from: new Date('1/1/2009') },
          { from: new Date('1/1/2010') },
        ]
      },
      {
        ranges: [
          { from: new Date('1/1/2010') },
          { from: new Date('1/1/2010') }
        ],
        expected: [
          { from: new Date('1/1/2010') },
          { from: new Date('1/1/2010') }
        ]
      },
      {
        ranges: [
          { from: new Date('1/1/2012') },
          { from: new Date('1/1/2010') }
        ],
        expected: [
          { from: new Date('1/1/2010') },
          { from: new Date('1/1/2012') }
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
        ranges: [
          { from: ten, to: today }
        ],
        expected: []
      },
      {
        ranges: [
          { from: daysAgo(today, 365 * 5), to: today }
        ],
        expected: [
          { from: ten, to: daysAgo(today, 365 * 5) }
        ]
      },
      {
        ranges: [
          { from: daysAgo(today, 365 * 1), to: today },
          { from: daysAgo(today, 365 * 3), to: daysAgo(today, 365 * 1) },
          { from: ten, to: daysAgo(today, 365 * 4) },
        ],
        expected: [
          { from: daysAgo(today, 365 * 4), to: daysAgo(today, 365 * 3) }
        ]
      },
    ]

    const equality = (expected, actual) => {
      if (actual.date) {
        return expected.getMonth() === actual.date.getMonth() &&
          expected.getFullYear() === actual.date.getFullYear()
      }

      return expected.getMonth() === actual.getMonth() &&
        expected.getFullYear() === actual.getFullYear()
    }

    const minitest = (holes, expected) => {
      if (holes.length !== expected.length) {
        return false
      }

      for (const hole of holes) {
        if (!expected.some(x => equality(x.from, hole.from) && equality(x.to, hole.to))) {
          return false
        }
      }

      return true
    }

    tests.forEach(test => {
      expect(minitest(gaps(test.ranges), test.expected)).toBe(true)
    })
  })
})
