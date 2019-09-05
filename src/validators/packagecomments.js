import { validateModel } from 'models/validate'
import packageComments from 'models/sections/packageComments'

const validatePackageComments = (data, formType, options = {}) => (
  validateModel(data, packageComments, options)
)

export default validatePackageComments
