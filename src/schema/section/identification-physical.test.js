import { unschema } from '../schema'
import { identificationPhysical } from './identification-physical'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Comments: {},
      EyeColor: {},
      HairColor: {},
      Height: {
        feet: 0,
        inches: 0
      },
      Sex: {},
      Weight: {
        value: ''
      }
    }

    expect(unschema(identificationPhysical(data))).toEqual(data)
  })
})
