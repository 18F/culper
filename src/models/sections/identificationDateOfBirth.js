import { SELF } from 'constants/dateLimits'

const identificationDateOfBirth = {
  Date: {
    presence: true,
    date: { ...SELF },
  },
}

export default identificationDateOfBirth
