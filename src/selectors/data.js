/* eslint import/prefer-default-export: 0 */

export const selectMaritalStatus = state => (
  state.application
  && state.application.Relationships
  && state.application.Relationships.Marital
  && state.application.Relationships.Marital.Status
  && state.application.Relationships.Marital.Status.value
)

export const selectApplicantBirthdate = state => (
  state.application
  && state.application.Identification
  && state.application.Identification.ApplicantBirthDate
  && state.application.Identification.ApplicantBirthDate.Date
)
