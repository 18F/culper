import DateControlValidator from './datecontrol'

describe('date control validator', function () {
  it('validate has month error', () => {
    const tests = [
      {
        error: { month: 'max' },
        expected: true
      },
      {
        error: null,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator().hasMonthError(test.error)).toBe(test.expected)
    })
  })

  it('validate has day error', () => {
    const tests = [
      {
        error: { day: 'max' },
        expected: true
      },
      {
        error: null,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator().hasDayError(test.error)).toBe(test.expected)
    })
  })

  it('validate has year error', () => {
    const tests = [
      {
        error: { year: 'max' },
        expected: true
      },
      {
        error: null,
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator().hasYearError(test.error)).toBe(test.expected)
    })
  })

  it('validate has errors', () => {
    const tests = [
      {
        error: { year: 'max' },
        expected: true
      },
      {
        error: { day: 'max' },
        expected: true
      },
      {
        error: { month: 'max' },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator().hasErrors(test.error)).toBe(test.expected)
    })
  })

  it('validate max date', () => {
    const tests = [
      {
        state: {
          month: '1',
          day: '1',
          year: '2005'
        },
        props: {
          maxDate: new Date('1/1/2004')
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new DateControlValidator(test.state, test.props).validMaxDate()).toBe(test.expected)
    })
  })
})
