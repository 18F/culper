import { isZipcodeState, zipcodes } from 'config/zipcodes'
import { ZIPCODE_STATE_MISMATCH } from 'constants/errors'

const zipcodeValidator = (value, options, key, attributes) => {
  const { state } = attributes

  const validZipcodeState = zipcodes[state] && isZipcodeState(state, value)

  if (validZipcodeState) return null

  return ZIPCODE_STATE_MISMATCH
}

export default zipcodeValidator
