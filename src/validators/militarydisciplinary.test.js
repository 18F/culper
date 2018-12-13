import MilitaryDisciplinaryValidator, {
  hideDisciplinaryProcedures
} from './militarydisciplinary'

describe('Military disciplinary validation', function() {
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
      expect(
        new MilitaryDisciplinaryValidator(test.state, null).validDisciplinary()
      ).toBe(test.expected)
    })
  })

  it('handle overall validity', function() {
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
          List: {
            branch: { value: '' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{}]
          }
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  Date: {
                    day: '1',
                    month: '1',
                    year: '2016'
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
            ]
          }
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
      expect(
        new MilitaryDisciplinaryValidator(test.state, null).isValid()
      ).toBe(test.expected)
    })
  })
})
