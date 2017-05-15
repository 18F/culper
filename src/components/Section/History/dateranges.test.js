import { validDate, rangeSorter, daysInMonth } from './dateranges'

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
          {
            from: {
              date: new Date('1/1/2009')
            }
          },
          {
            from: {
              date: new Date('1/1/2010')
            }
          }
        ],
        expected: [
          {
            from: {
              date: new Date('1/1/2009')
            }
          },
          {
            from: {
              date: new Date('1/1/2010')
            }
          }
        ]
      },
      {
        ranges: [
          {
            from: {
              date: new Date('1/1/2010')
            }
          },
          {
            from: {
              date: new Date('1/1/2010')
            }
          }
        ],
        expected: [
          {
            from: {
              date: new Date('1/1/2010')
            }
          },
          {
            from: {
              date: new Date('1/1/2010')
            }
          }
        ]
      },
      {
        ranges: [
          {
            from: {
              date: new Date('1/1/2012')
            }
          },
          {
            from: {
              date: new Date('1/1/2010')
            }
          }
        ],
        expected: [
          {
            from: {
              date: new Date('1/1/2010')
            }
          },
          {
            from: {
              date: new Date('1/1/2012')
            }
          }
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
})
