import { validateModel } from 'models/validate'
import relative, { isCitizen, requireCitizenshipDocumentation } from 'models/relative'
import alias from 'models/shared/alias'

import {
  MOTHER, FATHER, FATHER_IN_LAW, MOTHER_IN_LAW, marriedOptions,
} from 'constants/enums/relationshipOptions'

import store from 'services/store'
import { selectMaritalStatus } from 'selectors/data'

const requiredMotherAndFather = [
  i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER,
  i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER,
]

const requiredParentalInLaws = [
  i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER_IN_LAW,
  i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER_IN_LAW,
]

export const validateRelative = data => validateModel(data, relative) === true

export const validateAlias = data => validateModel(data, alias) === true

export const getMaritalStatus = () => {
  const state = store.getState()
  return selectMaritalStatus(state)
}

export const validateRelatives = (data) => {
  const maritalStatus = getMaritalStatus()

  let requiredRelations
  if (marriedOptions.includes(maritalStatus)) {
    requiredRelations = [
      ...requiredMotherAndFather,
      ...requiredParentalInLaws,
    ]
  } else {
    requiredRelations = requiredMotherAndFather
  }

  const relativesModel = {
    List: {
      presence: true,
      accordion: { validator: relative },
      containsRequiredItems: {
        requirements: requiredRelations,
      },
    },
  }

  return validateModel(data, relativesModel) === true
}

export const validateMaritalRelations = (data, context = null) => {
  const maritalStatus = context || getMaritalStatus()
  let requiredRelations
  const maritalRelationsModel = {
    List: {
      presence: true,
    },
  }

  if (marriedOptions.includes(maritalStatus)) {
    requiredRelations = requiredParentalInLaws

    maritalRelationsModel.List.containsRequiredItems = {
      requirements: requiredRelations,
    }
  }


  return validateModel(data, maritalRelationsModel) === true
}

export const validateMinimumRelations = (data) => {
  const minimumRelationsModel = {
    List: {
      presence: true,
      containsRequiredItems: {
        requirements: requiredMotherAndFather,
      },
    },
  }

  return validateModel(data, minimumRelationsModel) === true
}
export default class RelativesValidator {
  constructor(data = {}) {
    this.data = data
  }

  validMaritalRelations(context = null) {
    return validateMaritalRelations(this.data, context)
  }

  validMinimumRelations() {
    return validateMinimumRelations(this.data)
  }

  isValid() {
    return validateRelatives(this.data)
  }
}

export class RelativeValidator {
  constructor(data = {}) {
    this.data = data
  }

  citizen() {
    return isCitizen(this.data)
  }

  requiresCitizenshipDocumentation() {
    return requireCitizenshipDocumentation(this.data)
  }

  validRelation() {
    return validateModel(this.data, { Relation: relative.Relation }) === true
  }

  validName() {
    return validateModel(this.data, { Name: relative.Name }) === true
  }

  validBirthdate() {
    return validateModel(this.data, { Birthdate: relative.Birthdate }) === true
  }

  validBirthplace() {
    return validateModel(this.data, { Birthplace: relative.Birthplace }) === true
  }

  validCitizenship() {
    return validateModel(this.data, { Citizenship: relative.Citizenship }) === true
  }

  validMaidenName() {
    return validateModel(this.data, {
      MaidenName: relative.MaidenName,
    }) === true
  }

  validAliases() {
    return validateModel(this.data, { Aliases: relative.Aliases }) === true
  }

  validIsDeceased() {
    return validateModel(this.data, { IsDeceased: relative.IsDeceased }) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: relative.Address }) === true
  }

  validCitizenshipDocumentation() {
    return validateModel(this.data, {
      CitizenshipDocumentation: relative.CitizenshipDocumentation,
      OtherCitizenshipDocumentation: relative.OtherCitizenshipDocumentation,
    }) === true
  }

  validDocumentNumber() {
    return validateModel(this.data, { DocumentNumber: relative.DocumentNumber }) === true
  }

  validCourtName() {
    return validateModel(this.data, { CourtName: relative.CourtName }) === true
  }

  validCourtAddress() {
    return validateModel(this.data, { CourtAddress: relative.CourtAddress }) === true
  }

  validDocument() {
    return validateModel(this.data, {
      Document: relative.Document,
      DocumentComments: relative.DocumentComments,
    }) === true
  }

  validResidenceDocumentNumber() {
    return validateModel(this.data, {
      ResidenceDocumentNumber: relative.ResidenceDocumentNumber,
    }) === true
  }

  validExpiration() {
    return validateModel(this.data, {
      Expiration: relative.Expiration,
    }) === true
  }

  validFirstContact() {
    return validateModel(this.data, {
      FirstContact: relative.FirstContact,
    }) === true
  }

  validLastContact() {
    return validateModel(this.data, {
      LastContact: relative.LastContact,
    }) === true
  }

  validMethods() {
    return validateModel(this.data, {
      Methods: relative.Methods,
      MethodsComments: relative.MethodsComments,
    }) === true
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: relative.Frequency,
      FrequencyComments: relative.FrequencyComments,
    }) === true
  }

  validEmployer() {
    return validateModel(this.data, {
      Employer: relative.Employer,
    }) === true
  }

  validEmployerAddress() {
    return validateModel(this.data, {
      EmployerAddress: relative.EmployerAddress,
    }) === true
  }

  validEmployerRelationship() {
    return validateModel(this.data, {
      HasAffiliation: relative.HasAffiliation,
      EmployerRelationship: relative.EmployerRelationship,
    }) === true
  }

  isValid() {
    return validateRelative(this.data)
  }
}

export class AliasValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateAlias(this.data)
  }
}
