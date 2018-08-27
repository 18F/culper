import DrugInvolvementsValidator, {
  DrugInvolvementValidator
} from './druginvolvements'

describe('Drug Involvement Validation', function() {
  it('should validate drug usage', function() {
    const tests = [
      {
        state: {
          Involved: { value: 'Nope' }
        },
        expected: false
      },
      {
        state: {
          Involved: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: []
          }
        },
        expected: false
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ DrugInvolvement: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ DrugInvolvement: {} }]
          }
        },
        expected: false
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
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
                  InvolvementWhileEmployed: { value: 'Yes' },
                  InvolvementWithClearance: { value: 'Yes' },
                  InvolvementInFuture: { value: 'No' }
                }
              }
            ]
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new DrugInvolvementsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate future use', function() {
    const tests = [
      {
        state: {
          InvolvementInFuture: { value: 'Yes' },
          Explanation: {
            value: 'Because'
          }
        },
        expected: true
      },
      {
        state: {
          InvolvementInFuture: { value: 'No' }
        },
        expected: true
      },
      {
        state: {
          InvolvementInFuture: { value: 'Nope' }
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new DrugInvolvementValidator(test.state).validFuture()).toBe(
        test.expected
      )
    })
  })
})
