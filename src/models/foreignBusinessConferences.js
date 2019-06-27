const foreignBusinessConferences = {
  Description: { presence: true, hasValue: true },
  Sponsor: { presence: true, hasValue: true },
  City: { presence: true, hasValue: true },
  // TODO country
  Country: { presence: true, hasValue: true },
  // TODO must be >= DOB, <= NOW
  Dates: { presence: true, daterange: true },
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
