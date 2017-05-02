export const extractApplicantBirthDate = (app) => {
  if (!app.Identification || !app.Identification.ApplicantBirthDate) {
    return null
  }
  const bd = app.Identification.ApplicantBirthDate
  if (!bd.day || !bd.month || !bd.year) {
    return null
  }
  return new Date(`${bd.month}/${bd.day}/${bd.year}`)
}
