import { validateModel } from 'models/validate'
import relative from 'models/relative'

import {
  MARRIED, SEPARATED, MOTHER, FATHER, FATHER_IN_LAW, MOTHER_IN_LAW,
} from 'constants/enums/relationshipOptions'

import {
  requireRelationshipRelativesForeignBornDoc,
  requireRelationshipRelativesUSResidenceDoc,
} from 'helpers/branches'

export const validateRelative = (data, formType) => (
  validateModel(
    data,
    relative,
    {
      requireRelationshipRelativesForeignBornDoc:
        requireRelationshipRelativesForeignBornDoc(formType),
      requireRelationshipRelativesUSResidenceDoc:
        requireRelationshipRelativesUSResidenceDoc(formType),
    },
  )
)

export const validateRelatives = (data, formType, options = {}) => {
  const { maritalStatus } = options

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
      ...options,
      requireRelationshipRelativesForeignBornDoc:
        requireRelationshipRelativesForeignBornDoc(formType),
      requireRelationshipRelativesUSResidenceDoc:
        requireRelationshipRelativesUSResidenceDoc(formType),
    },
  )
}
