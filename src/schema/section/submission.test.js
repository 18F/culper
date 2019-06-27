import { unschema } from '../schema'
import { submission } from './submission'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      AdditionalComments: {
        Signature: {
          Name: {},
          Date: {}
        }
      },
      General: {
        Signature: {
          Name: {},
          Date: {}
        }
      },
      Medical: {
        Signature: {
          Name: {},
          Date: {}
        }
      },
      Attachments: {
        Method: {}
      },
      Credit: {
        Signature: {
          Name: {},
          Date: {}
        }
      }
    }

    expect(unschema(submission(data))).toEqual(data)
  })
})
