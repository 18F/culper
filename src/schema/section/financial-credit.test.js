import { unschema } from '../schema'
import { financialCredit } from './financial-credit'

describe('Schema for financial credit', () => {
  it('can wrap in schema', () => {
    const data = {
      HasCreditCounseling: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Explanation: {},
              Name: {},
              Telephone: {},
              Location: {
                country: null
              },
              Description: {}
            }
          }
        ]
      }
    }

    expect(unschema(financialCredit(data))).toEqual(data)
  })
})
