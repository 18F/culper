import { unschema } from '../schema'
import citizenshipUsPassport from './citizenship-us-passport'

describe('Schema for citizenship us passport', () => {
  it('can wrap in schema', () => {
    const data = {
      HasPassports: { value: 'Yes' },
      Name: {},
      Number: {},
      Card: {},
      Issued: {},
      Expiration: {},
      Comments: {},
    }

    expect(unschema(citizenshipUsPassport(data))).toEqual(data)
  })
})
