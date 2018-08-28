import { unschema } from '../schema'
import { historyFederal } from './history-federal'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasFederalService: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Name: {},
              Position: {},
              Address: {
                country: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(historyFederal(data))).toEqual(data)
  })
})
