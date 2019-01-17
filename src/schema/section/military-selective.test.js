import { unschema } from '../schema'
import { militarySelective } from './military-selective'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      WasBornAfter: {},
      HasRegistered: {},
      HasRegisteredNotApplicable: {},
      RegistrationNumber: {},
      Explanation: {}
    }

    expect(unschema(militarySelective(data))).toEqual(data)
  })
})
