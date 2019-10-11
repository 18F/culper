import { validateModel } from 'models/validate'
import militaryDisciplinary from 'models/sections/militaryDisciplinary'

export const hideDisciplinaryProcedures = (store = {}) => !(store.Military
    && store.Military.History
    && store.Military.History.HasServed
    && store.Military.History.HasServed.value === 'Yes')

export const validateMilitaryDisciplinaryProcedures = (data, formType, options = {}) => (
  validateModel(data, militaryDisciplinary, options)
)
