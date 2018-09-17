import { unschema } from '../schema'
import { militaryHistory } from './military-history'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasServed: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Service: {},
              Status: {},
              Officer: {},
              ServiceNumber: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              ServiceState: {},
              HasBeenDischarged: {},
              DischargeType: {},
              DischargeTypeOther: {},
              DischargeReason: {},
              DischargeDate: {}
            }
          }
        ]
      }
    }

    expect(unschema(militaryHistory(data))).toEqual(data)
  })
})
