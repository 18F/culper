import { unschema } from '../schema'
import { psychologicalCompetence } from './psychological-competence'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      IsIncompetent: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              CourtAddress: {
                country: null
              },
              CourtName: {},
              Occurred: {},
              Appeals: {
                branch: null,
                items: [
                  {
                    Item: {
                      Has: {},
                      CourtName: {},
                      CourtAddress: {
                        country: null
                      },
                      Disposition: {}
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }

    expect(unschema(psychologicalCompetence(data))).toEqual(data)
  })
})
