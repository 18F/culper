// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

export const isPO = location => (
  countryString(location.country) === 'POSTOFFICE'
)

export const isUS = location => (
  countryString(location.country) === 'United States'
)

export const isInternational = location => (
  !isPO(location) && !isUS(location)
)
