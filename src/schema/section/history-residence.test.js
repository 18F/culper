import { unschema } from '../schema'
import { historyResidence } from './history-residence'
import alternateAddress from '../form/alternateaddress'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Address: {
                country: null
              },
              AlternateAddress: alternateAddress(),
              Comments: {},
              ReferenceName: {},
              ReferenceLastContact: {},
              ReferenceRelationshipComments: {},
              ReferenceRelationship: {},
              ReferenceRelationshipOther: {},
              ReferencePhoneEvening: {},
              ReferencePhoneDay: {},
              ReferencePhoneMobile: {},
              ReferenceEmail: {},
              ReferenceEmailNotApplicable: {},
              ReferenceAddress: {
                country: null
              },
              ReferenceAlternateAddress: alternateAddress(),
              Role: {},
              RoleOther: {}
            }
          }
        ]
      }
    }

    expect(unschema(historyResidence(data))).toEqual(data)
  })
})
