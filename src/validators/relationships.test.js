import RelationshipsValidator from './relationships'

describe('Psychologicalvalidation', function () {
  it('Should validate completion status', function () {
    const tests = [
      {
        props: {
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
        props: {
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
        props: {
          Relationships: {
            relatives: {
              IsIncompetent: 'No'
            },
            marital: {
              Consulted: 'No'
            },
            cohabitants: {
              Diagnosed: 'No'
            },
            friends: {
              Hospitalized: 'No'
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
        props: {
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
      expect(new RelationshipsValidator(null, test.props).completionStatus(test.Status)).toBe(test.expected)
    })
  })
})
