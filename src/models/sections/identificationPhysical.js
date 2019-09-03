import height from 'models/shared/height'

import {
  eyeColorOptions,
  hairColorOptions,
  sexOptions,
} from 'constants/enums/physicalOptions'

const identificationPhysical = {
  Height: { presence: true, model: { validator: height } },
  Weight: {
    presence: true,
    hasValue: {
      validator: {
        numericality: { greaterThanOrEqualTo: 10 },
      },
    },
  },
  HairColor: {
    presence: true,
    hasValue: { validator: { inclusion: hairColorOptions } },
  },
  EyeColor: {
    presence: true,
    hasValue: { validator: { inclusion: eyeColorOptions } },
  },
  Sex: {
    presence: true,
    hasValue: { validator: { inclusion: sexOptions } },
  },
}

export default identificationPhysical
