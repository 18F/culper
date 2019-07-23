import { validateModel } from 'models/validate'
import relative, { isCitizen, requireCitizenshipDocumentation } from 'models/relative'
import alias from 'models/shared/alias'

import {
  MARRIED, SEPARATED, MOTHER, FATHER, FATHER_IN_LAW, MOTHER_IN_LAW,
} from 'constants/enums/relationshipOptions'

import store from 'services/store'
import { selectMaritalStatus } from 'selectors/data'
import {
  requireRelationshipRelativesForeignBornDoc,
  requireRelationshipRelativesUSResidenceDoc,
} from 'helpers/branches'

export const validateRelative = (data, formType) => (
  validateModel(
    data,
    relative,
    {
      requireRelationshipRelativesForeignBornDoc: requireRelationshipRelativesForeignBornDoc(formType),
      requireRelationshipRelativesUSResidenceDoc: requireRelationshipRelativesUSResidenceDoc(formType),
    },
  ) === true
)

export const validateAlias = data => validateModel(data, alias) === true

export const getMaritalStatus = () => {
  const state = store.getState()
  return selectMaritalStatus(state)
}

export const validateRelatives = (data, formType) => {
  const maritalStatus = getMaritalStatus()

  const requiredRelations = [
    i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER,
    i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER,
  ]

  if ([MARRIED, SEPARATED].includes(maritalStatus)) {
    requiredRelations.push(
      i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER_IN_LAW,
    )
    requiredRelations.push(
      i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER_IN_LAW,
    )
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

  return validateModel(
    data,
    relativesModel,
    {
      requireRelationshipRelativesForeignBornDoc: requireRelationshipRelativesForeignBornDoc(formType),
      requireRelationshipRelativesUSResidenceDoc: requireRelationshipRelativesUSResidenceDoc(formType),
    },
  ) === true
}

export default class RelativesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validMaritalRelations(context = null) {
    const maritalStatus = context || getMaritalStatus()
    const requiredRelations = []

    if ([MARRIED, SEPARATED].includes(maritalStatus)) {
      requiredRelations.push(
        i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER_IN_LAW,
      )
      requiredRelations.push(
        i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER_IN_LAW,
      )
    }

    const maritalRelationsModel = {
      List: {
        presence: true,
        containsRequiredItems: {
          requirements: requiredRelations,
        },
      },
    }

    return validateModel(this.data, maritalRelationsModel) === true
  }

  validMinimumRelations() {
    const requiredRelations = [
      i => i.Item && i.Item.Relation && i.Item.Relation.value === MOTHER,
      i => i.Item && i.Item.Relation && i.Item.Relation.value === FATHER,
    ]

    const minimumRelationsModel = {
      List: {
        presence: true,
        containsRequiredItems: {
          requirements: requiredRelations,
        },
      },
    }

    return validateModel(this.data, minimumRelationsModel) === true
  }

  isValid() {
    return validateRelatives(this.data, this.formType)
  }
}

export class RelativeValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
    this.options = {
      requireRelationshipRelativesForeignBornDoc: requireRelationshipRelativesForeignBornDoc(formType),
      requireRelationshipRelativesUSResidenceDoc: requireRelationshipRelativesUSResidenceDoc(formType),
    }
  }

  citizen() {
    return isCitizen(this.data)
  }

  requiresCitizenshipDocumentation() {
    return requireCitizenshipDocumentation(this.data, this.options)
  }

  validRelation() {
    return validateModel(this.data, { Relation: relative.Relation }, this.options) === true
  }

  validName() {
    return validateModel(this.data, { Name: relative.Name }, this.options) === true
  }

  validBirthdate() {
    return validateModel(this.data, { Birthdate: relative.Birthdate }, this.options) === true
  }

  validBirthplace() {
    return validateModel(this.data, { Birthplace: relative.Birthplace }, this.options) === true
  }

  validCitizenship() {
    return validateModel(this.data, { Citizenship: relative.Citizenship }, this.options) === true
  }

  validMaidenName() {
    return validateModel(this.data, { MaidenName: relative.MaidenName }, this.options) === true
  }

  validAliases() {
    return validateModel(this.data, { Aliases: relative.Aliases }, this.options) === true
  }

  validIsDeceased() {
    return validateModel(this.data, { IsDeceased: relative.IsDeceased }, this.options) === true
  }

  validAddress() {
    return validateModel(this.data, { Address: relative.Address }, this.options) === true
  }

  validCitizenshipDocumentation() {
    return validateModel(this.data, {
      CitizenshipDocumentation: relative.CitizenshipDocumentation,
      OtherCitizenshipDocumentation: relative.OtherCitizenshipDocumentation,
    }, this.options) === true
  }

  validDocumentNumber() {
    return validateModel(this.data, { DocumentNumber: relative.DocumentNumber }, this.options) === true
  }

  validCourtName() {
    return validateModel(this.data, { CourtName: relative.CourtName }, this.options) === true
  }

  validCourtAddress() {
    return validateModel(this.data, { CourtAddress: relative.CourtAddress }, this.options) === true
  }

  validDocument() {
    return validateModel(this.data, {
      Document: relative.Document,
      DocumentComments: relative.DocumentComments,
    }, this.options) === true
  }

  validResidenceDocumentNumber() {
    return validateModel(this.data, {
      ResidenceDocumentNumber: relative.ResidenceDocumentNumber,
    }, this.options) === true
  }

  validExpiration() {
    return validateModel(this.data, { Expiration: relative.Expiration }, this.options) === true
  }

  validFirstContact() {
    return validateModel(this.data, { FirstContact: relative.FirstContact }, this.options) === true
  }

  validLastContact() {
    return validateModel(this.data, { LastContact: relative.LastContact }, this.options) === true
  }

  validMethods() {
    return validateModel(this.data, {
      Methods: relative.Methods,
      MethodsComments: relative.MethodsComments,
    }, this.options) === true
  }

  validFrequency() {
    return validateModel(this.data, {
      Frequency: relative.Frequency,
      FrequencyComments: relative.FrequencyComments,
    }, this.options) === true
  }

  validEmployer() {
    return validateModel(this.data, { Employer: relative.Employer }, this.options) === true
  }

  validEmployerAddress() {
    return validateModel(this.data, { EmployerAddress: relative.EmployerAddress }, this.options) === true
  }

  validEmployerRelationship() {
    return validateModel(this.data, {
      HasAffiliation: relative.HasAffiliation,
      EmployerRelationship: relative.EmployerRelationship,
    }, this.options) === true
  }

  isValid() {
    return validateRelative(this.data, this.formType, this.options)
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
