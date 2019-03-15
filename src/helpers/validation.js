import * as sections from 'constants/sections'
import * as validators from 'validators'

// Map sections to their validator classes (temporary)
export const getValidatorForSection = (section) => {
  switch (section) {
    case sections.IDENTIFICATION_NAME:
      return validators.IdentificationNameValidator

    case sections.IDENTIFICATION_BIRTH_DATE:
      return validators.IdentificationBirthDateValidator

    case sections.IDENTIFICATION_BIRTH_PLACE:
      return validators.IdentificationBirthPlaceValidator

    case sections.IDENTIFICATION_SSN:
      return validators.IdentificationSSNValidator

    case sections.IDENTIFICATION_OTHER_NAMES:
      return validators.IdentificationOtherNamesValidator

    case sections.IDENTIFICATION_CONTACTS:
      return validators.IdentificationContactInformationValidator

    case sections.IDENTIFICATION_PHYSICAL:
      return validators.IdentificationPhysicalValidator

    default:
      // console.warn(`Validator for ${section} section not found`)
      return null
  }
}

export const validateSection = ({ key, data }) => {
  const Validator = getValidatorForSection(key)

  if (Validator) {
    return new Validator(data).isValid()
  }

  return false
}
