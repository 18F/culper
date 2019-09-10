// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

export const isPO = location => (
  countryString(location.country) === 'POSTOFFICE'
)

export const isUS = location => (
  countryString(location.country) === 'United States'
)

export const isInternational = location => (
  location && location.country && (!isPO(location) && !isUS(location))
)

export const countryValueResolver = (props) => {
  if (typeof props.country === 'string') {
    const valueArr = props.country ? [props.country] : []
    const comments = props.countryComments || ''
    return {
      value: valueArr,
      comments,
    }
  }
  return props.country
}
