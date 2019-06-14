const militaryDiscipline = {
  Date: { presence: true, date: true },
  Offenses: { presence: true, hasValue: true },
  Name: { presence: true, hasValue: true },
  Court: { presence: true, hasValue: true },
  Outcome: { presence: true, hasValue: true },
}

export default militaryDiscipline
