const militaryDiscipline = {
  // TODO >= DOB, <= NOW
  Date: {
    presence: true,
    date: { requireDay: false },
  },
  Offenses: { presence: true, hasValue: true },
  Name: { presence: true, hasValue: true },
  Court: { presence: true, hasValue: true },
  Outcome: { presence: true, hasValue: true },
}

export default militaryDiscipline
