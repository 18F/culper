import DateRangeValidator from './daterange'

describe('Date range validator', function () {
  it('should validate date ranges', function () {
    const tests = [
      {
        state: {
          from: new Date('1/1/2010'),
          to: new Date('1/1/2012'),
          present: false
        },
        expected: true
      },
      {
        state: {
          from: new Date('1/1/2010'),
          to: null,
          present: false
        },
        expected: false
      },
      {
        state: {
          from: null,
          to: new Date('1/1/2010'),
          present: false
        },
        expected: false
      },
      {
        state: {
          from: new Date('1/1/2012'),
          to: new Date('1/1/2010'),
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
