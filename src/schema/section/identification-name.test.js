import { unschema } from '../schema'
import { identificationName } from './identification-name'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Name: {}
    }

    expect(unschema(identificationName(data))).toEqual(data)
  })
})
