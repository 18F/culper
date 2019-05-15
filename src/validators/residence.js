import { validateModel } from 'models/validate'
import { validateCollection } from 'helpers/validation'
import residence from 'models/residence'

export const validateResidence = (data) => {
  const modelData = {
    ...data,
    Role: data.Role ? data.Role.value : null,
    ReferenceEmail: data.ReferenceEmail ? data.ReferenceEmail.value : null,
    ReferenceRelationship: data.ReferenceRelationship ? data.ReferenceRelationship.values : [],
  }

  return validateModel(modelData, residence) === true
}

export class ResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateResidence(this.data)
  }
}

export default class HistoryResidenceValidator {
  constructor(data = {}) {
    this.list = data.List || {}
  }

  isValid() {
    const { items } = this.list

    return validateCollection(items, validateResidence)
  }
}
