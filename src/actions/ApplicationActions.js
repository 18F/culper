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
  // Sample structure
  //
  // {
  //   "section": {
  //     "status": "incomplete",
  //     "section1.1": { "status": "complete" },
  //     "section1.2": { "status": "incomplete" },
  //     "section1.3": { "status": "neutral" }
  //   }
  // }

  // First see if section is present
  // If subsection is NOT given then set section status
  // If subsection is given then see it is present
  // If subsection is given then set subsection status
  return updateApplication('Completed', section, status)
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
