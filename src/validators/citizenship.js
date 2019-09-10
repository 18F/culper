import store from 'services/store'
import { selectValidUSPassport } from 'selectors/misc'

import { validateModel } from 'models/validate'
import citizenshipStatus, {
  requireCertificateFields,
  requireDocumentationFields,
} from 'models/citizenshipStatus'

export const validateCitizenshipStatus = (data) => {
  const { hasValidUSPassport } = selectValidUSPassport(store.getState())

  return validateModel(data, citizenshipStatus, {
    requireForeignBornDocumentation: !hasValidUSPassport,
  })
}

export const isCertificateRequired = (data, requireForeignBornDocumentation) => (
  requireCertificateFields(data, { requireForeignBornDocumentation })
)

export const isDocumentRequired = (data, requireForeignBornDocumentation) => (
  requireDocumentationFields(data, { requireForeignBornDocumentation })
)
