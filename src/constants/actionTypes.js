/* eslint import/prefer-default-export: 0 */

export const VALIDATE_FORM_DATA = 'VALIDATE_FORM_DATA'
export const SET_FORM_DATA = 'SET_FORM_DATA'

export const INIT_APP = 'INIT_APP'
export const FETCH_FORM = 'FETCH_FORM'
export const FETCH_FORM_SUCCESS = 'FETCH_FORM_SUCCESS'
export const FETCH_FORM_ERROR = 'FETCH_FORM_ERROR'

// Handled by saga (called from UI)
export const HANDLE_SUBSECTION_UPDATE = 'HANDLE_SUBSECTION_UPDATE'

// Handled by form reducer (called via saga)
export const UPDATE_SUBSECTION = 'UPDATE_SUBSECTION'

// One-off actions (use in side effects)
export const UPDATE_SUBSECTION_DATA = 'UPDATE_SUBSECTION_DATA'
export const UPDATE_SUBSECTION_ERRORS = 'UPDATE_SUBSECTION_ERRORS'
export const UPDATE_SUBSECTION_COMPLETE = 'UPDATE_SUBSECTION_COMPLETE'
