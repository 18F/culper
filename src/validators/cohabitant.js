import { validateModel } from 'models/validate'
import cohabitant from 'models/cohabitant'
import relationshipsCohabitants from 'models/sections/relationshipsCohabitants'

export const validateCohabitant = data => validateModel(data, cohabitant) === true

export const validateCohabitants = data => validateModel(data, relationshipsCohabitants) === true

export const validateSimilarSpouse = (cohabitantName, spouse) => {
  if (!cohabitantName || !spouse) {
    return false
  }

  if (
    cohabitantName.first === spouse.first
    && cohabitantName.last === spouse.last
    && cohabitantName.middle === spouse.middle
  ) {
    return true
  }

  return false
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
    return validateSimilarSpouse(this.name, spouse)
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
    return validateCohabitant(this.data)
  }
}
