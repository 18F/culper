import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignBusinessConferences = {
  Description: { presence: true, hasValue: true },
  Sponsor: { presence: true, hasValue: true },
  City: { presence: true, hasValue: true },
  Country: { presence: true, country: true },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Purpose: { presence: true, hasValue: true },
  Contacts: {
    presence: true,
    model: {
      validator: {
        List: {
          presence: true,
          branchCollection: {
            validator: {
              Explanation: { presence: true, hasValue: true },
            },
          },
        },
      },
    },
  },
}

export default foreignBusinessConferences
