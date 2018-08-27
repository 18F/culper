import SentenceValidator from './sentence'

describe('Sentence record validation', function() {
  it('can validate basic branch checks', () => {
    const tests = [
      {
        data: {
          ExceedsYear: { value: 'Yes' },
          Incarcerated: { value: 'Yes' }
        },
        expected: true
      },
      {
        data: {
          ExceedsYear: { value: 'Nope' },
          Incarcerated: { value: 'Yes' }
        },
        expected: false
      },
      {
        data: {
          ExceedsYear: { value: 'Yes' },
          Incarcerated: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.data).validChecks()).toBe(test.expected)
    })
  })

  it('can validate incarceration dates', () => {
    const tests = [
      {
        data: {
          IncarcerationDates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: '1',
              day: '1',
              year: '2004',
              date: new Date('1/1/2004')
            },
            present: false
          }
        },
        expected: true
      },
      {
        data: {
          IncarcerationDatesNA: {
            applicable: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.data).validIncarcerationDates()).toBe(
        test.expected
      )
    })
  })

  it('can validate probation dates', () => {
    const tests = [
      {
        data: {
          ProbationDates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: '1',
              day: '1',
              year: '2004',
              date: new Date('1/1/2004')
            },
            present: false
          }
        },
        expected: true
      },
      {
        data: {
          ProbationDatesNA: {
            applicable: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.data).validProbationDates()).toBe(
        test.expected
      )
    })
  })

  it('can validate sentence', () => {
    const tests = [
      {
        data: {
          ExceedsYear: { value: 'Yes' },
          Incarcerated: { value: 'Yes' },
          IncarcerationDates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: '1',
              day: '1',
              year: '2004',
              date: new Date('1/1/2004')
            },
            present: false
          },
          ProbationDates: {
            from: {
              month: '1',
              day: '1',
              year: '2000',
              date: new Date('1/1/2000')
            },
            to: {
              month: '1',
              day: '1',
              year: '2004',
              date: new Date('1/1/2004')
            },
            present: false
          },
          Description: {
            value: 'Foo'
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.data).isValid()).toBe(test.expected)
    })
  })
})
