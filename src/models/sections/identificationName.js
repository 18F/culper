import name from 'models/shared/name'

const identificationName = {
  Name: {
    presence: true,
    model: { validator: name },
  },
}

export default identificationName
