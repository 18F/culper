import { unschema } from '../schema'
import { identificationSSN } from './identification-ssn'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      ssn: {},
      verified: false
    }

    expect(unschema(identificationSSN(data))).toEqual(data)
  })
})
