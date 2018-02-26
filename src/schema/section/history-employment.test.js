import { unschema } from '../schema'
import { historyEmployment } from './history-employment'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      EmploymentRecord: {},
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            EmploymentActivity: {},
            Dates: {
              from: {},
              to: {},
              present: null
            },
            Employment: {},
            Status: {},
            Title: {},
            DutyStation: {},
            Address: {
              country: null
            },
            Additional: {
              branch: null,
              items: [{
                Item: {
                  Has: {},
                  Position: {},
                  Supervisor: {},
                  DatesEmployed: {
                    from: {},
                    to: {},
                    present: null
                  }
                }
              }]
            },
            Telephone: {},
            PhysicalAddress: {
              HasDifferentAddress: {},
              Address: {
                country: null
              },
              Telephone: {}
            },
            ReasonLeft: {
              Comments: {},
              Reasons: {
                branch: null,
                items: [{
                  Item: {
                    Has: {},
                    Reason: {},
                    Text: {},
                    Date: {}
                  }
                }]
              },
              ReasonDescription: {}
            },
            Reprimand: {
              branch: null,
              items: [{
                Item: {
                  Has: {},
                  Text: {},
                  Date: {}
                }
              }]
            },
            Supervisor: {
              SupervisorName: {},
              Title: {},
              Email: {},
              EmailNotApplicable: {},
              Address: {
                country: null
              },
              Telephone: {}
            },
            ReferenceName: {},
            ReferencePhone: {},
            ReferenceAddress: {
              country: null
            }
          }
        }]
      }
    }

    expect(unschema(historyEmployment(data))).toEqual(data)
  })
})
