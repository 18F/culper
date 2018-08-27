import { unschema } from '../schema'
import { psychologicalConsultations } from './psychological-consultations'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Consulted: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              CourtAddress: {
                country: null
              },
              CourtName: {},
              Disposition: {},
              Occurred: {},
              Appeals: {
                branch: null,
                items: [
                  {
                    Item: {
                      CourtName: {},
                      CourtAddress: {
                        country: null
                      },
                      Disposition: {},
                      Has: {}
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }

    expect(unschema(psychologicalConsultations(data))).toEqual(data)
  })
})
