export function updateApplication (section, property, values) {
  return {
    type: `${section}.${property}`,
    section: section,
    property: property,
    values: values
  }
}

/**
 * This is a generic function to report any errors for a particular
 * section.
 */
export function reportErrors (section, subsection, codes) {
  return updateApplication('Errors', section, codes)
}

export function reportCompletion (section, subsection, status) {
  return updateApplication('Completed', section, [{ code: `${section}/${subsection}`.trim(), section: section, subsection: subsection, valid: status }])
}

export function updateIdentificationApplicantName (values) {
  return updateApplication('Identification', 'ApplicantName', values)
}

export function updateIdentificationBirthPlace (values) {
  return updateApplication('Identification', 'ApplicantBirthPlace', values)
}

export function updateIdentificationBirthDate (values) {
  return updateApplication('Identification', 'ApplicantBirthDate', values)
}

export function updateIdentificationSSN (values) {
  return updateApplication('Identification', 'ApplicantSSN', values)
}
