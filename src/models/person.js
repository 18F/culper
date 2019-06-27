import name from 'models/shared/name'
import phone from 'models/shared/phone'
import email from 'models/shared/email'
import address from 'models/shared/locations/address'
import { relationshipOptions } from 'constants/enums/relationshipOptions'

const person = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  // TODO from >= DOB, to <= NOW
  Dates: {
    presence: true,
    daterange: true,
  },
  Rank: (value, attributes) => {
    if (attributes.RankNotApplicable
      && attributes.RankNotApplicable.applicable === false) return {}

    return {
      presence: true,
      hasValue: true,
    }
  },
  Relationship: {
    presence: true,
    array: {
      validator: {
        presence: true,
        inclusion: relationshipOptions,
      },
      length: { minimum: 1 },
    },
  },
  RelationshipOther: (value, attributes) => {
    if (attributes.Relationship
      && attributes.Relationship.values
      && attributes.Relationship.values.some(i => i === 'Other')) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  MobileTelephone: (value, attributes) => {
    const requireNumber = !!(attributes.OtherTelephone
      && attributes.OtherTelephone.noNumber)

    return {
      presence: true,
      model: { validator: phone, requireNumber },
    }
  },
  OtherTelephone: (value, attributes) => {
    const requireNumber = !!(attributes.MobileTelephone
      && attributes.MobileTelephone.noNumber)

    return {
      presence: true,
      model: { validator: phone, requireNumber },
    }
  },
  Email: (value, attributes) => {
    if (attributes.EmailNotApplicable
      && attributes.EmailNotApplicable.applicable === false) return {}

    return {
      presence: true,
      model: { validator: email },
    }
  },
  Address: {
    presence: true,
    location: { validator: address },
  },
}

export default person
