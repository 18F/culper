import { validateModel } from 'models/validate'
import packageComments from 'models/sections/packageComments'

const validatePackageComments = data => (
  validateModel(data, packageComments) === true
)

export default validatePackageComments
