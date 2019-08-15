import {validateModel, hasYesOrNo } from 'models/validate'
import militaryDiscipline from 'models/militaryDiscipline'

export const hideDisciplinaryProcedures = (store = {}) => !(store.Military
    && store.Military.History
    && store.Military.History.HasServed
    && store.Military.History.HasServed.value === 'Yes')


const militaryDisciplinaryProceduresModel = {
  HasDisciplinary: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    const { HasDisciplinary } = attributes
    if (HasDisciplinary && HasDisciplinary.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: militaryDiscipline },
      }
    }

    return {}
  },
}

export const validateMilitaryDisciplinaryProcedures = data => (
  validateModel(data, militaryDisciplinaryProceduresModel)
)

export class ProcedureValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, { Date: militaryDiscipline.Date }) === true
  }

  validOffenses() {
    return validateModel(this.data, { Offenses: militaryDiscipline.Offenses }) === true
  }

  validName() {
    return validateModel(this.data, { Name: militaryDiscipline.Name }) === true
  }

  validCourt() {
    return validateModel(this.data, { Court: militaryDiscipline.Court }) === true
  }

  validOutcome() {
    return validateModel(this.data, { Outcome: militaryDiscipline.Outcome }) === true
  }

  isValid() {
    return validateModel(this.data, militaryDiscipline) === true
  }
}

export default class MilitaryDisciplinaryValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDisciplinary() {
    return (
      validateModel(
        this.data,
        { HasDisciplinary: militaryDisciplinaryProceduresModel.HasDisciplinary },
      ) === true
    )
  }

  isValid() {
    return validateMilitaryDisciplinaryProcedures(this.data) === true
  }
}
