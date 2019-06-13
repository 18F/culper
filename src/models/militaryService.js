import { hasYesOrNo, checkValue, hasLength } from 'models/validate'
import state from 'models/shared/locations/state'

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
        inclusion: ['Army', 'ArmyNationalGuard', 'Navy', 'AirForce', 'AirNationalGuard', 'MarineCorps', 'CoastGuard'],
      },
    },
  },
  Status: {
    presence: true,
    hasValue: {
      validator: {
        // Double Check: (15.2.3) says `Active`, not `ActiveDuty`
        inclusion: ['ActiveDuty', 'ActiveReserve', 'InactiveReserve'],
      },
    },
  },
  Officer: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: ['Officer', 'Enlisted', 'NotApplicable'],
      },
    },
  },
  Dates: { presence: true, daterange: true },
  ServiceNumber: {
    presence: true,
    hasValue: { validator: hasLength },
  },
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
            inclusion: ['Honorable', 'Dishonorable', 'OtherThanHonorable', 'General', 'BadConduct', 'Other']
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

    return {
      presence: true,
      hasValue: { validator: hasLength },
    }
  },
  DischargeTypeOther: (value, attributes) => (
    checkValue(attributes.DischargeType, 'Other')
      ? {
        presence: true,
        hasValue: { validator: hasLength },
      } : {}
  ),
  DischargeDate: (value, attributes) => (
    checkValue(attributes.HasBeenDischarged, 'Yes')
      ? {
        presence: true,
        date: true,
      } : {}
  ),
}

export default militaryService