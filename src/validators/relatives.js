/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import relationshipsRelativesModel from 'models/sections/relationshipsRelatives'

import {
  requireRelationshipRelativesForeignBornDoc,
  requireRelationshipRelativesUSResidenceDoc,
} from 'helpers/branches'

export const validateRelatives = (data, formType, options = {}) => (
  validateModel(
    data,
    relationshipsRelativesModel,
    {
      ...options,
      requireRelationshipRelativesForeignBornDoc:
        requireRelationshipRelativesForeignBornDoc(formType),
      requireRelationshipRelativesUSResidenceDoc:
        requireRelationshipRelativesUSResidenceDoc(formType),
    },
  )
)
