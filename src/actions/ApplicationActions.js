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
  let prefix = subsection.length
      ? [section, subsection].join('.')
      : section

  let expandedCodes = []
  codes.forEach((code) => {
    let c = (prefix + '.' + code).toLowerCase()
    if (!c.endsWith('.')) {
      expandedCodes.push(c)
    }
  })

  return updateApplication('Errors', section, expandedCodes)
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
