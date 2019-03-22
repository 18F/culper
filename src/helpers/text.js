/* eslint import/prefer-default-export: 0 */

export const getYearsString = (years) => {
  switch (years) {
    case 5:
      return 'five'
    case 7:
      return 'seven'
    case 10:
      return 'ten'
    default:
      return ''
  }
}

export const getNumberOfYearsString = (years, includeNumericString = true) => {
  if (years === 1) {
    return 'year'
  }

  if (includeNumericString) {
    return `${getYearsString(years)} (${years}) years`
  }

  return `${years} years`
}
