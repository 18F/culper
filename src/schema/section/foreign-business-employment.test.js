import { unschema } from '../schema'
import { foreignBusinessEmployment } from './foreign-business-employment'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignEmployment: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              Description: {},
              Date: {},
              Address: {
                country: null
              },
              Accepted: {},
              Explanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessEmployment(data))).toEqual(data)
  })
})
