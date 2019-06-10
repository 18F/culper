/* eslint import/prefer-default-export: 0 */
import { createSelector } from 'reselect'

import { hasValidUSPassport as hasValidUSPassportFn } from 'validators/passport'

export const selectValidUSPassport = createSelector(
  (state) => {
    const { application = {} } = state
    const { Foreign = {} } = application
    return hasValidUSPassportFn(Foreign.Passport)
  },
  hasValidUSPassport => ({
    hasValidUSPassport,
  })
)
