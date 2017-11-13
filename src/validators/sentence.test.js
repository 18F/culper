import SentenceValidator from './sentence'

describe('Sentence record validation', function () {
  it('can validate basic branch checks', () => {
    const tests = [
      {
        state: {
          ExceedsYear: { value: 'Yes' },
          Incarcerated: { value: 'Yes' }
        },
        expected: true
      },
      {
        state: {
          ExceedsYear: { value: 'Nope' },
          Incarcerated: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          ExceedsYear: { value: 'Yes' },
          Incarcerated: { value: 'Nope' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.state, null).validChecks()).toBe(test.expected)
    })
  })

  it('can validate incarceration dates', () => {
    const tests = [
      {
        state: {
          IncarcerationDates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
              date: new Date('1/1/2004')
            },
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          IncarcerationDatesNA: {
            applicable: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.state, null).validIncarcerationDates()).toBe(test.expected)
    })
  })

  it('can validate probation dates', () => {
    const tests = [
      {
        state: {
          ProbationDates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
              date: new Date('1/1/2004')
            },
            present: false
          }
        },
        expected: true
      },
      {
        state: {
          ProbationDatesNA: {
            applicable: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new SentenceValidator(test.state, null).validProbationDates()).toBe(test.expected)
    })
  })

  it('can validate sentence', () => {
    const tests = [
      {
        state: {
          ExceedsYear: { value: 'Yes' },
          Incarcerated: { value: 'Yes' },
          IncarcerationDates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
              date: new Date('1/1/2004')
            },
            present: false
          },
          ProbationDates: {
            from: {
              date: new Date('1/1/2000')
            },
            to: {
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
      expect(new SentenceValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
