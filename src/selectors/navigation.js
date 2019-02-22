import { createSelector } from 'reselect'

import { formTypeSelector } from '@selectors/formType'
import * as formTypeConfig from '@config/formTypes'
import * as sections from '@constants/sections'

// TODO - DO NOT MERGE THIS, IT'S AN EXAMPLE AND NOT AN ACTUAL REQUIREMENT OF THE FORM //
const birthPlaceCountrySelector = state => {
  const { application } = state
  const { Identification } = application
  const { ApplicantBirthPlace } = Identification

  return ApplicantBirthPlace
    && ApplicantBirthPlace.Location
    && ApplicantBirthPlace.Location.country
    && (ApplicantBirthPlace.Location.country.value || ApplicantBirthPlace.Location.country)
}

export const formSectionsSelector = createSelector(
  formTypeSelector,
  birthPlaceCountrySelector,
  (formType, birthPlaceCountry) => {
    // Make a copy b/c we are going to mutate this
    // Might want to add & use update here to make this easier
    const formTypeSections = [ ...formTypeConfig[formType] ]

    // Example: Filter out SSN if birthPlaceCountry is not USA
    if (birthPlaceCountry && birthPlaceCountry !== 'United States') {
      const identificationSection = formTypeSections
        .find(s => s.key === sections.IDENTIFICATION)

      const newIdentificationSection = {
        ...identificationSection,
        subsections: identificationSection.subsections.filter(s => s.key !== sections.IDENTIFICATION_SSN)
      }

      formTypeSections[0] = newIdentificationSection
    }

    return formTypeSections
  }
)
