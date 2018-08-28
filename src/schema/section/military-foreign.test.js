import { unschema } from '../schema'
import { militaryForeign } from './military-foreign'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: null,
        items: [
          {
            Item: {
              Has: {},
              Organization: {},
              Name: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Country: {},
              Rank: {},
              Division: {},
              Circumstances: {},
              ReasonLeft: {},
              MaintainsContact: {},
              List: {
                branch: null,
                items: [
                  {
                    Item: {
                      Has: {},
                      Name: {},
                      Address: {
                        country: null
                      },
                      Title: {},
                      Dates: {
                        from: {},
                        to: {},
                        present: null
                      },
                      Frequency: {}
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }

    expect(unschema(militaryForeign(data))).toEqual(data)
  })
})
