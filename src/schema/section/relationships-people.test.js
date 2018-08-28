import { unschema } from '../schema'
import { relationshipsPeople } from './relationships-people'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Address: {
                country: null
              },
              Name: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Email: {},
              EmailNotApplicable: {},
              MobileTelephone: {},
              OtherTelephone: {},
              Rank: {},
              RankNotApplicable: {},
              Relationship: {},
              RelationshipOther: {}
            }
          }
        ]
      }
    }

    expect(unschema(relationshipsPeople(data))).toEqual(data)
  })
})
