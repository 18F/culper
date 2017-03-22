import DateRangeValidator from './daterange'

describe('Date range validator', function () {
  it('should validate date ranges', function () {
    const tests = [
      {
        state: {
          from: {
            date: new Date('1/1/2010')
          },
          to: {
            date: new Date('1/1/2012')
          },
          present: false
        },
        expected: true
      },
      {
        state: {
          from: {
            date: new Date('1/1/2010')
          },
          to: {
            date: null
          },
          present: false
        },
        expected: false
      },
      {
        state: {
          from: {
            date: null
          },
          to: {
            date: new Date('1/1/2010')
          },
          present: false
        },
        expected: false
      },
      {
        state: {
          from: {
            date: new Date('1/1/2012')
          },
          to: {
            date: new Date('1/1/2010')
          },
          present: false
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateRangeValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
