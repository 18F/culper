import DrugPrescriptionUsesValidator, {
  validateDrugPrescriptionUses,
} from './drugprescriptionuses'

describe('validateDrugPrescriptionUses function', () => {
  describe('for the SF-86', () => {
    it('fails if missing required fields', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
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
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                PrescriptionName: {
                  value: 'Foo',
                },
                Reason: {
                  value: 'The reason',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugPrescriptionUses(testData, 'SF86')).toEqual(false)
    })

    it('passes valid data', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
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
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                PrescriptionName: {
                  value: 'Foo',
                },
                Reason: {
                  value: 'The reason',
                },
                UseWhileEmployed: { value: 'Yes' },
                UseWithClearance: { value: 'Yes' },
              },
            },
          ],
        },
      }

      expect(validateDrugPrescriptionUses(testData, 'SF86')).toEqual(true)
    })
  })

  describe('for the SF-85', () => {
    it('fails if missing required fields', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
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
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                PrescriptionName: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugPrescriptionUses(testData, 'SF85')).toEqual(false)
    })

    it('passes valid data', () => {
      const testData = {
        MisusedDrugs: { value: 'Yes' },
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
                  },
                  to: {
                    month: '1',
                    day: '1',
                    year: '2012',
                  },
                  present: false,
                },
                PrescriptionName: {
                  value: 'Foo',
                },
                Reason: {
                  value: 'The reason',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugPrescriptionUses(testData, 'SF85')).toEqual(true)
    })
  })
})

describe('Drug Prescription Validation', () => {
  it('should validate drug prescription misuse', () => {
    const tests = [
      {
        data: {
          MisusedDrugs: { value: 'Nope' },
        },
        expected: false,
      },
      {
        data: {
          MisusedDrugs: { value: 'No' },
        },
        expected: true,
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: '' },
            items: [],
          },
        },
        expected: false,
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'Nope' },
            items: [{ DrugUse: {} }],
          },
        },
        expected: false,
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
          List: {
            branch: { value: 'No' },
            items: [{ DrugUse: {} }],
          },
        },
        expected: false,
      },
      {
        data: {
          MisusedDrugs: { value: 'Yes' },
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
                    },
                    to: {
                      month: '1',
                      day: '1',
                      year: '2012',
                    },
                    present: false,
                  },
                  PrescriptionName: {
                    value: 'Foo',
                  },
                  Reason: {
                    value: 'The reason',
                  },
                  UseWhileEmployed: { value: 'Yes' },
                  UseWithClearance: { value: 'Yes' },
                },
              },
            ],
          },
        },
        expected: true,
      },
    ]
    tests.forEach((test) => {
      expect(new DrugPrescriptionUsesValidator(test.data).isValid()).toBe(
        test.expected
      )
    })
  })
})
