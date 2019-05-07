import { isZipcodeState, zipcodes } from 'config/zipcodes'

const zipcodeValidator = (value, options, key, attributes) => {
  const { state } = attributes

  const validZipcodeState = zipcodes[state] && isZipcodeState(state, value)

  if (validZipcodeState) return null

  return 'Invalid zipcode'
}

export default zipcodeValidator
