import { validateDrugInvolvements } from './druginvolvements'

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

      expect(validateDrugInvolvements(testData, 'SF86'))
        .toEqual(expect.arrayContaining([
          'List.accordion.0.InvolvementWhileEmployed.presence.REQUIRED',
          'List.accordion.0.InvolvementWithClearance.presence.REQUIRED',
          'List.accordion.0.InvolvementInFuture.presence.REQUIRED',
        ]))
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

      expect(validateDrugInvolvements(testData, 'SF85'))
        .toEqual(expect.arrayContaining([
          'List.accordion.INVALID_BRANCH',
        ]))
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
