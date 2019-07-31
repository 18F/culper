/* eslint import/no-cycle: 0 */
import { YES, NO } from 'constants/values'
import validate from './validateConfig'

export const validateModel = (data, model, options) => {
  const errors = options
    ? validate(data, model, options)
    : validate(data, model)

  // console.log('validate model', data, model, errors)

  if (!errors) return true

  return errors
}

export default validateModel

// Misc helpers (might be moved later)

/** require Yes or No */
export const hasYesOrNo = {
  inclusion: [YES, NO],
}

/** check the value of an attribute.value */
export const checkValue = (attribute, expected) => !!(attribute
  && attribute.value
  && attribute.value === expected)

export const checkValueIncluded = (attribute, expected) => attribute
  && attribute.value
  && expected.includes(attribute.value)

export const valueIsEmpty = (data = {}) => !data.value || validate.isEmpty(data.value)

export const nameIsEmpty = (data = {}) => {
  const {
    first, firstInitialOnly, middle, middleInitialOnly, last, suffix,
  } = data

  const fields = [
    first, firstInitialOnly, middle, middleInitialOnly, last, suffix,
  ]

  return fields.every(i => i === false || validate.isEmpty(i))
}

export const dateIsEmpty = (data = {}) => {
  const { day, month, year } = data
  const fields = [day, month, year]
  return fields.every(i => validate.isEmpty(i))
}

export const locationIsEmpty = (data = {}) => {
  const { country, city, state } = data

  return (validate.isEmpty(country) || valueIsEmpty(country))
    && validate.isEmpty(city)
    && validate.isEmpty(state)
}
