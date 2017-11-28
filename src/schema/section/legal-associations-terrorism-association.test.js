import { unschema } from '../schema'
import { legalAssociationsTerrorismAssociation } from './legal-associations-terrorism-association'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasTerrorism: { value: 'Yes' },
      Explanation: {}
    }

    expect(unschema(legalAssociationsTerrorismAssociation(data))).toEqual(data)
  })
})
