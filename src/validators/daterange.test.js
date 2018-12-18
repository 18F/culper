import DateRangeValidator from './daterange'

describe('Date range validator', function() {
  it('should validate date ranges', function() {
    const tests = [
      {
        data: {
          from: {
            month: '1',
            day: '1',
            year: '2010'
          },
          to: {
            month: '1',
            day: '1',
            year: '2012'
          },
          present: false
        },
        expected: true
      },
      {
        data: {
          from: {
            month: '1',
            day: '1',
            year: '2010'
          },
          to: {},
          present: false
        },
        expected: false
      },
      {
        data: {
          from: {},
          to: {
            month: '1',
            day: '1',
            year: '2010'
          },
          present: false
        },
        expected: false
      },
      {
        data: {
          from: {
            month: '1',
            day: '1',
            year: '2012'
          },
          to: {
            month: '1',
            day: '1',
            year: '2010'
          },
          present: false
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateRangeValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
