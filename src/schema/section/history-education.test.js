import { unschema } from '../schema'
import { historyEducation } from './history-education'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasAttended: { value: 'Yes' },
      HasDegree10: { value: 'No' },
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Dates: {
              from: {},
              to: {},
              present: null
            },
            Type: {},
            Name: {},
            Address: {
              country: null
            },
            Comments: {},
            Reference: {
              FullName: {},
              LastContact: {},
              Relationship: {},
              RelationshipOther: {},
              Phone: {},
              Email: {},
              EmailNotApplicable: {},
              Address: {
                country: null
              }
            },
            Diplomas: {
              branch: null,
              items: [{
                Item: {
                  Has: {},
                  Diploma: {},
                  DiplomaOther: {},
                  Date: {}
                }
              }]
            }
          }
        }]
      }
    }

    expect(unschema(historyEducation(data))).toEqual(data)
  })
})
