import DrugUsesValidator from './druguses'

describe('Drug Use Validation', function () {
  it('should validate drug usage', function () {
    const tests = [
      {
        state: {
          UsedDrugs: 'Nope'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'No'
        },
        expected: true
      },
      {
        state: {
          UsedDrugs: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'Yes',
          List: [{DrugUse: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'Yes',
          List: [{DrugUse: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          UsedDrugs: 'Yes',
          ListBranch: 'No',
          List: [
            {
              DrugUse: {
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
                UseWhileEmployed: 'Yes',
                UseWithClearance: 'Yes',
                UseInFuture: 'No',
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
