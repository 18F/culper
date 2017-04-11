import PsychologicalValidator from './psychological'

describe('Psychologicalvalidation', function () {
  it('Should validate completion status', function () {
    const tests = [
      {
        props: {
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: true
          }
        },
        expected: 'neutral'
      },
      {
        props: {
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: false
          }
        },
        expected: 'incomplete'
      },
      {
        props: {
          Completed: {
            Competence: {
              status: true
            },
            Consultations: {
              status: true
            },
            Hospitalizations: {
              status: true
            },
            Diagnoses: {
              status: true
            },
            ExistingConditions: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: true
          },
          Consultations: {
            status: true
          },
          Hospitalizations: {
            status: true
          },
          Diagnoses: {
            status: true
          },
          ExistingConditions: {
            status: true
          }
        },
        expected: 'complete'
      }
    ]

    tests.forEach(test => {
      expect(new PsychologicalValidator(null, test.props).completionStatus(test.Status)).toBe(test.expected)
    })
  })
})
