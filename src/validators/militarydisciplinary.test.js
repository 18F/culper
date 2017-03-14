import MilitaryDisciplinaryValidator from './militarydisciplinary'

describe('Military disciplinary validation', function () {
  it('handle whether subject has disciplinary procedures', () => {
    const tests = [
      {
        state: {
          HasDisciplinary: ''
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: 'No'
        },
        expected: true
      },
      {
        state: {
          HasDisciplinary: 'Yes'
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
          HasDisciplinary: 'Yes'
        },
        expected: false
      },
      {
        state: {
          HasDisciplinary: 'Yes',
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
          ]
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new MilitaryDisciplinaryValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
