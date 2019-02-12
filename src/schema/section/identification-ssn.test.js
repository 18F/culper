import { unschema } from '../schema'
import { identificationSSN } from './identification-ssn'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const testData = [
      {
        ssn: {},
        verified: false
      },
      {
        ssn: {
          first: "111",
          middle: "11",
          last: "1111",
          notApplicable: false
        },
        verified: true
      },
      {
        ssn: {
          first: "",
          middle: "",
          last: "",
          notApplicable: true
        },
        verified: false
      }
    ]

    testData.forEach(data => {
      expect(unschema(identificationSSN(data))).toEqual(data)
    })
  })
})
