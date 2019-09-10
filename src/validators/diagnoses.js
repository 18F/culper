import { validateModel } from 'models/validate'
import diagnoses from 'models/diagnoses'

export const validateDiagnoses = data => validateModel(data, diagnoses)
