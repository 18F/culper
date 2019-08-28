import { validateModel, hasYesOrNo } from 'models/validate'
import cohabitant from 'models/cohabitant'

export const validateCohabitant = data => validateModel(data, cohabitant)

export const validateCohabitants = (data) => {
  const cohabitantsModel = {
    HasCohabitant: {
      presence: true,
      hasValue: { validator: hasYesOrNo },
    },
    CohabitantList: (value, attributes) => {
      if (attributes.HasCohabitant && attributes.HasCohabitant.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: cohabitant },
        }
      }

      return {}
    },
  }

  return validateModel(data, cohabitantsModel)
}

export default class CohabitantsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateCohabitants(this.data) === true
  }
}

export class CohabitantValidator {
  constructor(data = {}) {
    this.data = data
    this.name = data.Name
  }

  similarSpouse(spouse) {
    if (!this.name || !spouse) {
      return false
    }

    if (
      this.name.first === spouse.first
      && this.name.last === spouse.last
      && this.name.middle === spouse.middle
    ) {
      return true
    }

    return false
  }

  validForeignBornDocument() {
    return validateModel(this.data, {
      ForeignBornDocument: cohabitant.ForeignBornDocument,
    }) === true
  }

  validOtherNames() {
    return validateModel(this.data, {
      OtherNames: cohabitant.OtherNames,
    }) === true
  }

  validCitizenship() {
    return validateModel(this.data, {
      Citizenship: cohabitant.Citizenship,
    }) === true
  }

  isValid() {
    return validateCohabitant(this.data) === true
  }
}
