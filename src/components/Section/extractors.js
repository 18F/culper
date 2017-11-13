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

export const extractOtherNames = (app) => {
  let names = []
  let identification = app.Identification;
  if (!identification) {
    return names
  }

  let otherNames = identification.OtherNames
  if (!otherNames) {
    return names
  }

  if (!otherNames.List || !otherNames.List.items) {
    return names
  }

  for (let otherName of otherNames.List.items) {
    const item = (otherName.Item || {})
    names.push(item.Name)
  }
  return names
}
