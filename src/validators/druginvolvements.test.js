import DrugInvolvementsValidator, { DrugInvolvementValidator } from './druginvolvements'

describe('Drug Involvement Validation', function () {
  it('should validate drug usage', function () {
    const tests = [
      {
        state: {
          Involved: 'Nope'
        },
        expected: false
      },
      {
        state: {
          Involved: 'No'
        },
        expected: true
      },
      {
        state: {
          Involved: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          Involved: 'Yes',
          List: [{DrugInvolvement: {}}],
          ListBranch: 'Nope'
        },
        expected: false
      },
      {
        state: {
          Involved: 'Yes',
          List: [{DrugInvolvement: {}}],
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          Involved: 'Yes',
          ListBranch: 'No',
          List: [
            {
              Item: {
                DrugType: {
                  DrugType: 'Cocaine',
                  DrugTypeOther: null
                },
                FirstInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                RecentInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016'
                },
                NatureOfInvolvement: {
                  value: 'Some involvement'
                },
                Reasons: {
                  value: 'Some reason'
                },
                InvolvementWhileEmployed: 'Yes',
                InvolvementWithClearance: 'Yes',
                InvolvementInFuture: 'No'
              }
            }
          ]
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugInvolvementsValidator(test.state).isValid()).toBe(test.expected)
    })
  })

  it('should validate future use', function () {
    const tests = [
      {
        state: {
          InvolvementInFuture: 'Yes',
          Explanation: {
            value: 'Because'
          }
        },
        expected: true
      },
      {
        state: {
          InvolvementInFuture: 'No'
        },
        expected: true
      },
      {
        state: {
          InvolvementInFuture: 'Nope'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DrugInvolvementValidator(test.state).validFuture()).toBe(test.expected)
    })
  })
})
