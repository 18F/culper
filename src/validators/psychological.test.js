import PsychologicalValidator, { showQuestion21E } from './psychological'

describe('Psychologicalvalidation', function() {
  it('Should validate completion status', function() {
    const tests = [
      {
        data: {
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
        data: {
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
        data: {
          Psychological: {
            Competence: {
              IsIncompetent: { value: 'No' }
            },
            Consultations: {
              Consulted: { value: 'No' }
            },
            Diagnoses: {
              Diagnosed: { value: 'No' }
            },
            Hospitalizations: {
              Hospitalized: { value: 'No' }
            }
          },
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
        data: {
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
      expect(
        new PsychologicalValidator(test.data).completionStatus(test.Status)
      ).toBe(test.expected)
    })
  })

  it('Should determine when to show question 21E', function() {
    const tests = [
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: { value: 'No' }
            },
            Consultations: {
              Consulted: { value: 'No' }
            },
            Diagnoses: {
              Diagnosed: { value: 'No' }
            },
            Hospitalizations: {
              Hospitalized: { value: 'No' }
            }
          },
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        expected: true
      },
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: { value: 'Yes' }
            },
            Consultations: {
              Consulted: { value: 'No' }
            },
            Diagnoses: {
              Diagnosed: { value: 'No' }
            },
            Hospitalizations: {
              Hospitalized: { value: 'No' }
            }
          },
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(showQuestion21E(test.props.Psychological)).toBe(test.expected)
    })
  })
})
