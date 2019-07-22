import civilUnion from 'models/civilUnion'
import divorce from 'models/divorce'
import { maritalStatusOptions, marriedOptions, previouslyMarriedOptions } from 'constants/enums/relationshipOptions'

const relationshipsMarital = {
  Status: {
    presence: true,
    hasValue: {
      validator: { inclusion: maritalStatusOptions },
    },
  },
  CivilUnion: (value, attributes) => {
    if (attributes.Status
      && attributes.Status.value
      && marriedOptions.indexOf(attributes.Status.value) > -1) {
      return {
        presence: true,
        model: {
          validator: civilUnion,
        },
      }
    }

    return {}
  },
  DivorcedList: (value, attributes) => {
    // Required if Status is a previously married value
    // OR if Status is a currently married value, AND CivilUnion.Divorced is "Yes"
    if (attributes.Status
      && attributes.Status.value
      && (previouslyMarriedOptions.indexOf(attributes.Status.value) > -1
        || (marriedOptions.indexOf(attributes.Status.value) > -1
          && attributes.CivilUnion && attributes.CivilUnion.Divorced
          && attributes.CivilUnion.Divorced.value === 'Yes'))) {
      return {
        presence: true,
        accordion: {
          validator: divorce,
        },
      }
    }

    return {}
  },
}

export default relationshipsMarital
