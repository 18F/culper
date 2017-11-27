import { unschema } from '../schema'
import { foreignPassport } from './foreign-passport'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasPassports: { value: 'Yes' },
      Name: {},
      Number: {},
      Card: {},
      Issued: {},
      Expiration: {},
      Comments: {}
    }

    expect(unschema(foreignPassport(data))).toEqual(data)
  })
})
