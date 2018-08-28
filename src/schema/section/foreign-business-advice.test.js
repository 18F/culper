import { unschema } from '../schema'
import { foreignBusinessAdvice } from './foreign-business-advice'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignAdvice: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Description: {},
              Name: {},
              Organization: {},
              Country: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Compensation: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessAdvice(data))).toEqual(data)
  })
})
