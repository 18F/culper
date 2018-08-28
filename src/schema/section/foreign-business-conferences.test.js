import { unschema } from '../schema'
import { foreignBusinessConferences } from './foreign-business-conferences'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignConferences: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Description: {},
              Sponsor: {},
              City: {},
              Country: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Purpose: {},
              Contacts: {
                List: {
                  branch: null,
                  items: [
                    {
                      Item: {
                        Has: {},
                        Explanation: {}
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessConferences(data))).toEqual(data)
  })
})
