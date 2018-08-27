import { unschema } from '../schema'
import { psychologicalDiagnoses } from './psychological-diagnoses'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Diagnosed: { value: 'Yes' },
      DidNotConsult: { value: 'Yes' },
      DiagnosisList: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Condition: {},
              Diagnosed: {
                from: {},
                to: {},
                present: null
              },
              Treatment: {
                Name: {},
                Phone: {},
                Address: {
                  country: null
                }
              },
              TreatmentFacility: {
                Name: {},
                Phone: {},
                Address: {
                  country: null
                }
              },
              Effective: {},
              Explanation: {}
            }
          }
        ]
      },
      InTreatment: { value: 'Yes' },
      TreatmentList: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              Phone: {},
              Address: {
                country: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(psychologicalDiagnoses(data))).toEqual(data)
  })
})
