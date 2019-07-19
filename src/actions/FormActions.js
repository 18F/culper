/* eslint import/prefer-default-export: 0 */
import * as actionTypes from 'constants/actionTypes'

export const updateSubsectionData = (sectionKey, fieldName, fieldValues) => ({
  type: actionTypes.UPDATE_SUBSECTION_DATA,
  key: sectionKey,
  field: fieldName,
  data: fieldValues,
})
