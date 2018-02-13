import { unschema } from '../schema'
import { substanceDrugMisuse } from './substance-drug-misuse'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      MisusedDrugs: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            PrescriptionName: {},
            InvolvementDates: {
              from: {},
              to: {},
              present: null
            },
            Reason: {},
            UseWhileEmployed: {},
            UseWithClearance: {}
          }
        }]
      }
    }

    expect(unschema(substanceDrugMisuse(data))).toEqual(data)
  })
})
