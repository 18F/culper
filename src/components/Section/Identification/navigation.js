import * as validators from '../../../validators/index'

const navigation = {
  name: 'Information about you',
  title: 'Information about you',
  url: 'identification',
  store: 'Identification',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      name: 'Introduction',
      url: 'intro',
      exclude: true
    },
    {
      name: 'Full name',
      url: 'name',
      store: 'ApplicantName',
      validator: validators.IdentificationNameValidator
    },
    {
      name: 'Date of birth',
      url: 'birthdate',
      store: 'ApplicantBirthDate',
      validator: validators.IdentificationBirthDateValidator
    },
    {
      name: 'Place of birth',
      url: 'birthplace',
      store: 'ApplicantBirthPlace',
      validator: validators.IdentificationBirthPlaceValidator
    },
    {
      name: 'Social security number',
      url: 'ssn',
      store: 'ApplicantSSN',
      validator: validators.IdentificationSSNValidator
    },
    {
      name: 'Other names used',
      url: 'othernames',
      store: 'OtherNames',
      validator: validators.IdentificationOtherNamesValidator
    },
    {
      name: 'Your contact information',
      url: 'contacts',
      store: 'Contacts',
      validator: validators.IdentificationContactInformationValidator
    },
    {
      name: 'Your identifying information',
      url: 'physical',
      store: 'Physical',
      validator: validators.IdentificationPhysicalValidator
    },
    {
      name: 'Review',
      url: 'review',
      exclude: true
    }
  ]
}

export default navigation
