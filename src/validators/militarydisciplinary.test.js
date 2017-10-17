import MilitaryDisciplinaryValidator, { hideDisciplinaryProcedures } from './militarydisciplinary'

describe('Military disciplinary validation', function () {
  it('only display disciplinary procedures if military history is present', () => {
    const tests = [
      {
        store: {},
        hidden: true
      },
      {
        store: {
          Military: {
            History: {}
          }
        },
        hidden: true
      },
      {
        store: {
          Military: {
            History: {
              HasServed: { value: 'No' }
            }
          }
        },
        hidden: true
      },
      {
        store: {
          Military: {
            History: {
              HasServed: { value: 'Yes' }
            }
          }
        },
        hidden: false
      }
    ]

    tests.forEach(test => {
      expect(hideDisciplinaryProcedures(test.store)).toBe(test.hidden)
    })
  })

  it('handle whether subject has disciplinary procedures', () => {
    const tests = [
      {
        state: {
          HasDisciplinary: { value: '' }
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          HasDisciplinary: { value: 'Yes' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryDisciplinaryValidator(test.state, null).validDisciplinary()).toBe(test.expected)
    })
  })

  it('handle overall validity', function () {
    const tests = [
      {
        state: {
          HasDisciplinary: { value: 'Yes' }
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: { value: 'Yes' },
          List: [{}],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: { value: 'Yes' },
          List: [{}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: { value: 'Yes' },
          List: [
            {
              Item: {
                Date: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2012')
                },
                Offenses: {
                  value: 'Littering'
                },
                Name: {
                  value: 'Local law'
                },
                Court: {
                  value: 'In the Congo'
                },
                Outcome: {
                  value: 'Lost my right hand'
                }
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          HasDisciplinary: { value: 'No' }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryDisciplinaryValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
