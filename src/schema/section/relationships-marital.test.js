import { unschema } from '../schema'
import { relationshipsMarital } from './relationships-marital'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      Status: {},
      CivilUnion: {
        Address: {
          country: null
        },
        AddressSeparated: {
          country: null
        },
        AddressSeparatedNotApplicable: {},
        BirthPlace: {
          country: null
        },
        Birthdate: {},
        Citizenship: {},
        DateSeparated: {},
        Divorced: {},
        Email: {},
        EnteredCivilUnion: {},
        ForeignBornDocument: {
          DocumentType: {},
          OtherExplanation: {},
          DocumentNumber: {},
          DocumentExpiration: {},
          DocumentExpirationNotApplicable: {}
        },
        Name: {},
        OtherNames: {
          branch: null,
          items: [{
            Item: {
              Has: {},
              Name: {},
              MaidenName: {},
              DatesUsed: {
                from: {},
                to: {},
                present: null
              }
            }
          }]
        },
        SSN: {},
        Separated: {},
        Telephone: {},
        UseCurrentAddress: {}
      },
      DivorcedList: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Name: {},
            Birthdate: {},
            BirthPlace: {
              country: null
            },
            Citizenship: {},
            Telephone: {},
            Recognized: {},
            Address: {
              country: null
            },
            DateDivorced: {},
            Status: {},
            Deceased: {},
            DeceasedAddress: {
              country: null
            },
            DeceasedAddressNotApplicable: {}
          }
        }]
      }
    }

    expect(unschema(relationshipsMarital(data))).toEqual(data)
  })
})
