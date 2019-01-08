import DateRangeValidator from './daterange'

describe('Date range validator', function() {
  it('allows date ranges that are not touched', function() {
    const tests = [
      {
        data: {
          from: {
            month: '1',
            day: '1',
            year: '2010',
            touched: true
          },
          to: {
            month: '1',
            day: '1',
            year: '2012',
            touched: true
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
            year: '2010',
            touched: true
          },
          to: {
            month: '',
            day: '',
            year: '',
            touched: false
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
            year: '2010',
            touched: true
          },
          to: {},
          present: false
        },
        expected: false
      },
      {
        data: {
          from: {
            month: '',
            day: '',
            year: '',
            touched: true
          },
          to: {
            month: '1',
            day: '1',
            year: '2010',
            touched: true
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

  it('should validate date ranges', function() {
    const tests = [
      {
        data: {
          from: {
            month: '1',
            day: '1',
            year: '2010',
            touched: true
          },
          to: {
            month: '1',
            day: '1',
            year: '2012',
            touched: true
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
            year: '2010',
            touched: true
          },
          to: {
            month: '',
            day: '',
            year: '',
            touched: true
          },
          present: false
        },
        expected: false
      },
      {
        data: {
          from: {
            month: '',
            day: '',
            year: '',
            touched: true
          },
          to: {
            month: '1',
            day: '1',
            year: '2010',
            touched: true
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
            year: '2012',
            touched: true
          },
          to: {
            month: '1',
            day: '1',
            year: '2010',
            touched: true
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
