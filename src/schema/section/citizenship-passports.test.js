import { unschema } from '../schema'
import { citizenshipPassports } from './citizenship-passports'

describe('Schema for citizenship passports', () => {
  it('can wrap in schema', () => {
    const data = {
      Passports: {
        branch: null,
        items: [
          {
            Item: {
              Has: { value: 'No' },
              Country: {},
              Issued: {},
              Location: {
                country: null
              },
              Name: {},
              Number: {},
              Expiration: {},
              Used: {},
              Countries: {
                items: [
                  {
                    Item: {
                      Country: {},
                      Dates: {
                        from: {},
                        to: {},
                        present: null
                      }
                    }
                  }
                ],
                branch: null
              }
            }
          }
        ]
      }
    }

    expect(unschema(citizenshipPassports(data))).toEqual(data)
  })
})
