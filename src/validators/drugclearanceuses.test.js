import DrugClearanceUsesValidator from './drugclearanceuses'

describe('Drug Use Validation', function () {
  it('should validate drug usage', function () {
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
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: [{DrugUse: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: [{DrugUse: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          ListBranch: 'No',
          List: [
            {
              Item: {
                InvolvementDates: {
                  from: {
                    date: new Date('1/1/2010')
                  },
                  to: {
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
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugClearanceUsesValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
