import { unschema } from '../schema'
import { identificationContacts } from './identification-contacts'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Emails: {
        branch: null,
        items: [
          {
            Item: {
              Email: {}
            }
          }
        ]
      },
      PhoneNumbers: {
        branch: null,
        items: [
          {
            Item: {
              Telephone: {}
            }
          }
        ]
      }
    }

    expect(unschema(identificationContacts(data))).toEqual(data)
  })
})
