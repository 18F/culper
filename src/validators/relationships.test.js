import RelationshipsValidator from './relationships'

describe('Psychologicalvalidation', function () {
  it('Should validate completion status', function () {
    const tests = [
      {
        data: {
          Completed: {
            relatives: {
              status: true
            }
          }
        },
        Status: {
          relatives: {
            status: true
          }
        },
        expected: 'neutral'
      },
      {
        data: {
          Completed: {
            relatives: {
              status: true
            }
          }
        },
        Status: {
          relatives: {
            status: false
          }
        },
        expected: 'incomplete'
      },
      {
        data: {
          Relationships: {
            relatives: {
              IsIncompetent: { value: 'No' }
            },
            marital: {
              Consulted: { value: 'No' }
            },
            cohabitants: {
              Diagnosed: { value: 'No' }
            },
            friends: {
              Hospitalized: { value: 'No' }
            }
          },
          Completed: {
            relatives: {
              status: true
            }
          }
        },
        Status: {
          relatives: {
            status: false
          }
        },
        expected: 'incomplete'
      },
      {
        data: {
          Completed: {
            relatives: {
              status: true
            },
            marital: {
              status: true
            },
            cohabitants: {
              status: true
            },
            friends: {
              status: true
            }
          }
        },
        Status: {
          Completed: {
            relatives: {
              status: true
            },
            marital: {
              status: true
            },
            cohabitants: {
              status: true
            },
            friends: {
              status: true
            }
          }
        },
        expected: 'complete'
      }
    ]

    tests.forEach(test => {
      expect(new RelationshipsValidator(test.data).completionStatus(test.Status)).toBe(test.expected)
    })
  })
})
