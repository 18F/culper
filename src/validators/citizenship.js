import { validateModel } from 'models/validate'
import citizenshipStatus, {
  requireCertificateFields,
  requireDocumentationFields,
} from 'models/citizenshipStatus'

export const validateCitizenshipStatus = (data, formType, options = {}) => {
  const { hasValidUSPassport } = options

  return validateModel(data, citizenshipStatus, {
    ...options,
    requireForeignBornDocumentation: !hasValidUSPassport,
  })
}

export const isCertificateRequired = (data, requireForeignBornDocumentation) => (
  requireCertificateFields(data, { requireForeignBornDocumentation })
)

export const isDocumentRequired = (data, requireForeignBornDocumentation) => (
  requireDocumentationFields(data, { requireForeignBornDocumentation })
)
