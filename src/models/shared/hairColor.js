import hairColorOptions from 'constants/enums/hairColorOptions'

const hairColor = {
  value: {
    presence: { allowEmpty: false },
    inclusion: hairColorOptions,
  },
}

export default hairColor
