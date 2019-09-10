import { validateDrugPrescriptionUses } from './drugprescriptionuses'

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

      expect(validateDrugPrescriptionUses(testData, 'SF86'))
        .toEqual(expect.arrayContaining([
          'List.accordion.0.UseWhileEmployed.presence.REQUIRED',
          'List.accordion.0.UseWithClearance.presence.REQUIRED',
        ]))
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

      expect(validateDrugPrescriptionUses(testData, 'SF85'))
        .toEqual(expect.arrayContaining([
          'List.accordion.0.Reason.presence.REQUIRED',
        ]))
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
