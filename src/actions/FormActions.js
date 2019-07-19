/* eslint import/prefer-default-export: 0 */
import * as actionTypes from 'constants/actionTypes'

export const updateSubsectionData = (sectionKey, fieldName, fieldValues = {}) => ({
  type: actionTypes.UPDATE_SUBSECTION_DATA,
  key: sectionKey,
  field: fieldName,
  data: fieldValues,
})

export const updateSubsectionErrors = (sectionKey, errors = []) => ({
  type: actionTypes.UPDATE_SUBSECTION_ERRORS,
  key: sectionKey,
  errors,
})

export const updateSubsectionComplete = (sectionKey, complete) => ({
  type: actionTypes.UPDATE_SUBSECTION_COMPLETE,
  key: sectionKey,
  complete,
})
