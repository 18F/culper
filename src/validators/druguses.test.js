import DrugUsesValidator from './druguses'

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
                DrugType: {
                  DrugType: 'Cocaine',
                  DrugTypeOther: null
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                NatureOfUse: {
                  value: 'Some use'
                },
                UseWhileEmployed: { value: 'Yes' },
                UseWithClearance: { value: 'Yes' },
                UseInFuture: { value: 'No' },
                Explanation: {
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
      expect(new DrugUsesValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
