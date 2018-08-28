import DrugClearanceUsesValidator from './drugclearanceuses'

describe('Drug Use Validation', function() {
  it('should validate drug usage', function() {
    const tests = [
      {
        state: {
          UsedDrugs: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ DrugUse: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ DrugUse: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  InvolvementDates: {
                    from: {
                      month: '1',
                      day: '1',
                      year: '2010',
                      date: new Date('1/1/2010')
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                      date: new Date('1/1/2012')
                    }
                  },
                  Description: {
                    value: 'Foo'
                  },
                  EstimatedUse: {
                    value: 'Foo'
                  }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugClearanceUsesValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })
})
