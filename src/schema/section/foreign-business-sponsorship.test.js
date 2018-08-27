import { unschema } from '../schema'
import { foreignBusinessSponsorship } from './foreign-business-sponsorship'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasForeignSponsorship: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Name: {},
              Birthdate: {},
              BirthdateNotApplicable: {},
              Birthplace: {
                country: null
              },
              Address: {
                country: null
              },
              Citizenship: {},
              Organization: {},
              OrganizationNotApplicable: {},
              OrganizationAddress: {
                country: null
              },
              OrganizationAddressNotApplicable: {},
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Residence: {
                country: null
              },
              Stay: {},
              Sponsorship: {}
            }
          }
        ]
      }
    }

    expect(unschema(foreignBusinessSponsorship(data))).toEqual(data)
  })
})
