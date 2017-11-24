import { unschema } from '../schema'
import { identificationBirthplace } from './identification-birthplace'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Location: {
        country: null
      }
    }

    expect(unschema(identificationBirthplace(data))).toEqual(data)
  })
})
