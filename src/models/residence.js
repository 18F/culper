import {
  relationshipOptions,
  roleOptions,
} from 'constants/enums/residenceOptions'

const residence = {
  Dates: {
    presence: true,
    daterange: true,
  },
  Address: {
    presence: true,
    address: true,
  },
  AlternateAddress: {},

  // reference required if date range is within 3 years
  ReferenceName: {
    // valid name
  },
  ReferenceLastContact: {
    // valid date
  },
  ReferenceComments: {}, // not used?
  ReferenceRelationship: {
    inclusion: relationshipOptions,
  },
  ReferenceRelationshipOther: {
    // required if relationship is other
  },
  // valid phone numbers
  ReferencePhoneEvening: {},
  ReferencePhoneDay: {},
  ReferencePhoneMobile: {},
  // valid not applicable
  ReferenceEmailNotApplicable: {},
  ReferenceEmail: {},
  ReferenceAddress: {
    // LocationValidator ADDRESS
  },
  ReferenceAlternateAddress: {},
  Role: {
    inclusion: roleOptions,
  },
  RoleOther: {},
}

export default residence
