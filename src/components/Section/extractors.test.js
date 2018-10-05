import { extractApplicantBirthdate, extractMaritalStatus } from './extractors'

describe('Extractors', function() {
  it('should return a date', function() {
    const tests = [
      {
        state: {
          Identification: {
            ApplicantBirthDate: null
          }
        },
        expected: null
      },
      {
        state: {
          Identification: null
        },
        expected: null
      },
      {
        state: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                day: '1',
                month: '1',
                year: '2010'
              }
            }
          }
        },
        expected: new Date('1/1/2010')
      },
      {
        state: {
          Identification: {
            ApplicantBirthDate: {
              Date: {
                day: null,
                month: '1',
                year: '2010'
              }
            }
          }
        },
        expected: null
      }
    ]

    tests.forEach(test => {
      expect(extractApplicantBirthdate(test.state)).toEqual(test.expected)
    })
  })

  it('should return a marital status', function() {
    const tests = [
      {
        state: {
          Relationships: {
            Marital: {
              Status: null
            }
          }
        },
        expected: null
      },
      {
        state: {
          Relationships: {
            Marital: null
          }
        },
        expected: null
      },
      {
        state: {
          Relationships: {
            Marital: {
              Status: {
                value: 'Married'
              }
            }
          }
        },
        expected: 'Married'
      }
    ]

    tests.forEach(test => {
      expect(extractMaritalStatus(test.state)).toEqual(test.expected)
    })
  })
})
