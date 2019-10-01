import { showQuestion21E } from './psychological'

describe('Psychological; question 21E', () => {
  it('Should determine when to show question 21E', () => {
    const tests = [
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: { value: 'No' },
            },
            Consultations: {
              Consulted: { value: 'No' },
            },
            Diagnoses: {
              Diagnosed: { value: 'No' },
            },
            Hospitalizations: {
              Hospitalized: { value: 'No' },
            },
          },
          Completed: {
            Competence: {
              status: true,
            },
          },
        },
        expected: true,
      },
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: { value: 'Yes' },
            },
            Consultations: {
              Consulted: { value: 'No' },
            },
            Diagnoses: {
              Diagnosed: { value: 'No' },
            },
            Hospitalizations: {
              Hospitalized: { value: 'No' },
            },
          },
          Completed: {
            Competence: {
              status: true,
            },
          },
        },
        expected: false,
      },
    ]

    tests.forEach((test) => {
      expect(showQuestion21E(test.props.Psychological)).toBe(test.expected)
    })
  })
})
