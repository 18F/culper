/* eslint import/prefer-default-export: 0 */
import * as actionTypes from 'constants/actionTypes'

export const handleSubsectionUpdate = (sectionKey, fieldName, fieldValues = {}) => ({
  type: actionTypes.HANDLE_SUBSECTION_UPDATE,
  key: sectionKey,
  field: fieldName,
  data: fieldValues,
})

export const updateSubsection = (sectionKey, subsection) => ({
  type: actionTypes.UPDATE_SUBSECTION,
  key: sectionKey,
  subsection,
})

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
