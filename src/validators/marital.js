/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import relationshipsMaritalModel from 'models/sections/relationshipsMarital'

import {
  requireRelationshipMaritalForeignBornDocExpiration,
  requireRelationshipMaritalDivorcePhoneNumber,
} from 'helpers/branches'

export const validateMarital = (data, formType, options = {}) => {
  const isForeignBornDocExpirationRequired = requireRelationshipMaritalForeignBornDocExpiration(
    formType
  )

  const isDivorceePhoneNumberRequired = requireRelationshipMaritalDivorcePhoneNumber(formType)

  const modelOptions = {
    requireForeignBornDocExpiration: isForeignBornDocExpirationRequired,
    requireRelationshipMaritalDivorcePhoneNumber: isDivorceePhoneNumberRequired,
  }
  return validateModel(data, relationshipsMaritalModel, { ...options, ...modelOptions })
}
