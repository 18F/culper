import phone from 'models/shared/phone'
import email from 'models/shared/email'
import { DUPLICATE_PHONE_NUMBER_TYPES, DUPLICATE_EMAIL } from 'constants/errors'

export const contactPhoneNumber = {
  Telephone: {
    model: {
      validator: phone,
      requireNumberType: true,
    },
  },
}

const identificationContactInfo = {
  // DuplicateEmail: (value, attributes) => {
  //   return (attributes.HomeEmail.value == attributes.WorkEmail.value) ? DUPLICATE_EMAIL : null;
  // },
  HomeEmail: (value, attributes) => {
    if (attributes.WorkEmail && attributes.WorkEmail.value) {
      if (attributes.HomeEmail && attributes.HomeEmail.value) {
        return {
          model: { validator: email },
          exclusion: { within: [attributes.WorkEmail.value] }
        }
      }
      return {}
    }

    return {
      presence: true,
      model: { validator: email },
    }
  },
  WorkEmail: (value, attributes) => {
    if (attributes.HomeEmail && attributes.HomeEmail.value) {
      if (attributes.WorkEmail && attributes.WorkEmail.value) {
        return {
          model: { validator: email },
          exclusion: { within: [attributes.HomeEmail.value] }
        }
      }
      return {}
    }

    return {
      presence: true,
      model: { validator: email },
    }
  },
  PhoneNumbers: {
    presence: true,
    accordion: {
      ignoreBranch: true,
      length: { minimum: 1 },
      validator: contactPhoneNumber,
      itemsValidator: (items) => {
        const numberTypes = []
        items.forEach((i) => {
          if (i.Item && i.Item.Telephone) {
            numberTypes.push(i.Item.Telephone.numberType)
          }
        })
        const unique = [...new Set(numberTypes)]
        if (numberTypes.length === unique.length) return null
        return DUPLICATE_PHONE_NUMBER_TYPES
      },
    },
  },
}

export default identificationContactInfo
