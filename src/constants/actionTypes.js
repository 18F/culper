/* eslint import/prefer-default-export: 0 */

export const VALIDATE_FORM_DATA = 'VALIDATE_FORM_DATA'

export const INIT_APP = 'INIT_APP'

export const RENEW_SESSION = 'RENEW_SESSION'
export const SHOW_SESSION_WARNING = 'SHOW_SESSION_WARNING'
export const HIDE_SESSION_WARNING = 'HIDE_SESSION_WARNING'
export const LOGOUT = 'LOGOUT'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const FETCH_FORM = 'FETCH_FORM'
export const FETCH_FORM_SUCCESS = 'FETCH_FORM_SUCCESS'
export const FETCH_FORM_ERROR = 'FETCH_FORM_ERROR'

export const FETCH_STATUS = 'FETCH_STATUS'
export const FETCH_STATUS_SUCCESS = 'FETCH_STATUS_SUCCESS'
export const FETCH_STATUS_ERROR = 'FETCH_STATUS_ERROR'

// Handled by saga (called from UI)
export const HANDLE_SUBSECTION_UPDATE = 'HANDLE_SUBSECTION_UPDATE'

// Handled by form reducer (called via saga)
export const UPDATE_SUBSECTION = 'UPDATE_SUBSECTION'

// One-off actions (use in side effects)
export const UPDATE_SUBSECTION_DATA = 'UPDATE_SUBSECTION_DATA'
export const UPDATE_SUBSECTION_ERRORS = 'UPDATE_SUBSECTION_ERRORS'
export const UPDATE_SUBSECTION_COMPLETE = 'UPDATE_SUBSECTION_COMPLETE'
