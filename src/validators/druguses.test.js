import DrugUsesValidator, {
  validateDrugUses,
} from './druguses'

describe('validateDrugUses function', () => {
  describe('for the SF-86', () => {
    it('fails if missing required fields', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  DrugType: 'Cocaine',
                  DrugTypeOther: null,
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF86')).toEqual(false)
    })

    it('passes valid data', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  DrugType: 'Cocaine',
                  DrugTypeOther: null,
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                UseWhileEmployed: { value: 'Yes' },
                UseWithClearance: { value: 'Yes' },
                UseInFuture: { value: 'No' },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF86')).toEqual(true)
    })
  })

  describe('for the SF-85', () => {
    it('fails if missing required fields', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF85')).toEqual(false)
    })

    it('passes valid data', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  DrugType: 'Cocaine',
                  DrugTypeOther: null,
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF85')).toEqual(true)
    })
  })
})

describe('Drug Use Validation', () => {
  it('should validate drug usage', () => {
    const tests = [
      {
        state: {
          UsedDrugs: { value: 'Nope' },
        },
        expected: false,
      },
      {
        state: {
          UsedDrugs: { value: 'No' },
        },
        expected: true,
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [],
          },
        },
        expected: false,
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ DrugUse: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ DrugUse: {} }],
          },
        },
        expected: false,
      },
      {
        state: {
          UsedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [
              {
                Item: {
                  DrugType: {
                    DrugType: 'Cocaine',
                    DrugTypeOther: null,
                  },
                  FirstUse: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  RecentUse: {
                    day: '1',
                    month: '1',
                    year: '2016',
                  },
                  NatureOfUse: {
                    value: 'Some use',
                  },
                  UseWhileEmployed: { value: 'Yes' },
                  UseWithClearance: { value: 'Yes' },
                  UseInFuture: { value: 'No' },
                  Explanation: {
                    value: 'Foo',
                  },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]
    tests.forEach((test) => {
      expect(new DrugUsesValidator(test.state).isValid()).toBe(test.expected)
    })
  })
})
