import eyeColorOptions from 'constants/enums/eyeColorOptions'

const eyeColor = {
  value: {
    presence: { allowEmpty: false },
    inclusion: eyeColorOptions,
  },
}

export default eyeColor
