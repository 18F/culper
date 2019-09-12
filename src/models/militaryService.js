import { hasYesOrNo, checkValue } from 'models/validate'
import state from 'models/shared/locations/state'
import militaryServiceOptions from 'constants/enums/militaryServiceOptions'
import militaryStatusOptions from 'constants/enums/militaryStatusOptions'
import militaryOfficerOptions from 'constants/enums/militaryOfficerOptions'
import militaryDischargeOptions from 'constants/enums/militaryDischargeOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const isAirOrArmyNationalGuard = serviceType => (
  serviceType
  && serviceType.value
  && ['AirNationalGuard', 'ArmyNationalGuard'].includes(serviceType.value)
)

const militaryService = {
  Service: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: militaryServiceOptions,
      },
    },
  },
  Status: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: militaryStatusOptions,
      },
    },
  },
  Officer: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: militaryOfficerOptions,
      },
    },
  },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  ServiceNumber: { presence: true, hasValue: true },
  ServiceState: (value, attributes) => {
    if (isAirOrArmyNationalGuard(attributes.Service)) {
      return {
        presence: true,
        location: { validator: state },
      }
    }

    return {}
  },
  HasBeenDischarged: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  DischargeType: (value, attributes) => (
    checkValue(attributes.HasBeenDischarged, 'Yes')
      ? {
        presence: true,
        hasValue: {
          validator: {
            inclusion: militaryDischargeOptions,
          },
        },
      } : {}
  ),
  DischargeReason: (value, attributes) => {
    if (
      (attributes.HasBeenDischarged && attributes.HasBeenDischarged.value === 'No')
      || (attributes.DischargeType && attributes.DischargeType.value === 'Honorable')
    ) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  DischargeTypeOther: (value, attributes) => (
    checkValue(attributes.DischargeType, 'Other')
      ? { presence: true, hasValue: true }
      : {}
  ),
  DischargeDate: (value, attributes, attributeName, options = {}) => (
    checkValue(attributes.HasBeenDischarged, 'Yes')
      ? { presence: true, date: { earliest: options.applicantBirthdate, latest: DEFAULT_LATEST } }
      : {}
  ),
}

export default militaryService
