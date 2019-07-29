import DrugInvolvementsValidator, {
  DrugInvolvementValidator,
  validateDrugInvolvements,
} from './druginvolvements'

describe('validateDrugInvolvements function', () => {
  describe('for the SF-86', () => {
    it('fails if missing required fields', () => {
      const testData = {
        Involved: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfInvolvement: {
                  value: 'Some involvement',
                },
                Reasons: {
                  value: 'Some reason',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugInvolvements(testData, 'SF86')).toEqual(false)
    })

    it('passes valid data', () => {
      const testData = {
        Involved: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfInvolvement: {
                  value: 'Some involvement',
                },
                Reasons: {
                  value: 'Some reason',
                },
                InvolvementWhileEmployed: { value: 'Yes' },
                InvolvementWithClearance: { value: 'Yes' },
                InvolvementInFuture: { value: 'No' },
              },
            },
          ],
        },
      }

      expect(validateDrugInvolvements(testData, 'SF86')).toEqual(true)
    })
  })

  describe('for the SF-85', () => {
    it('fails if missing required fields', () => {
      const testData = {
        Involved: { value: 'Yes' },
        List: {
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfInvolvement: {
                  value: 'Some involvement',
                },
                InvolvementWhileEmployed: { value: 'Yes' },
                InvolvementWithClearance: { value: 'Yes' },
                InvolvementInFuture: { value: 'No' },
              },
            },
          ],
        },
      }

      expect(validateDrugInvolvements(testData, 'SF85')).toEqual(false)
    })

    it('passes valid data', () => {
      const testData = {
        Involved: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentInvolvement: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfInvolvement: {
                  value: 'Some involvement',
                },
                Reasons: {
                  value: 'Some reason',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugInvolvements(testData, 'SF85')).toEqual(true)
    })
  })
})

describe('Drug Involvement Validation', () => {
  it('should validate drug usage', () => {
    const tests = [
      {
        state: {
          Involved: { value: 'Nope' },
        },
        expected: false,
      },
      {
        state: {
          Involved: { value: 'No' },
        },
        expected: true,
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [],
          },
        },
        expected: false,
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ DrugInvolvement: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          Involved: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ DrugInvolvement: {} }],
          },
        },
        expected: false,
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
                    value: 'Cocaine',
                  },
                  FirstInvolvement: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  RecentInvolvement: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  NatureOfInvolvement: {
                    value: 'Some involvement',
                  },
                  Reasons: {
                    value: 'Some reason',
                  },
                  InvolvementWhileEmployed: { value: 'Yes' },
                  InvolvementWithClearance: { value: 'Yes' },
                  InvolvementInFuture: { value: 'No' },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]
    tests.forEach((test) => {
      expect(new DrugInvolvementsValidator(test.state).isValid()).toBe(
        test.expected
      )
    })
  })

  it('should validate future use', () => {
    const tests = [
      {
        state: {
          InvolvementInFuture: { value: 'Yes' },
          Explanation: {
            value: 'Because',
          },
        },
        expected: true,
      },
      {
        state: {
          InvolvementInFuture: { value: 'No' },
        },
        expected: true,
      },
      {
        state: {
          InvolvementInFuture: { value: 'Nope' },
        },
        expected: false,
      },
    ]
    tests.forEach((test) => {
      expect(new DrugInvolvementValidator(test.state).validFuture()).toBe(
        test.expected
      )
    })
  })
})
