import { unschema } from '../schema'
import { psychologicalHospitalizations } from './psychological-hospitalizations'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Hospitalized: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              TreatmentDate: {
                from: {},
                to: {},
                present: null
              },
              Admission: {},
              Facility: {},
              FacilityAddress: {
                country: null
              },
              Explanation: {}
            }
          }
        ]
      }
    }

    expect(unschema(psychologicalHospitalizations(data))).toEqual(data)
  })
})
