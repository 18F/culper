import React from 'react'

export const AddressSummary = (props, unknown = '') => {
  if (!props) {
    return unknown
  }

  const address1 = `${props.street || ''} ${props.street2 || ''}`.trim()
  const country = props.country || {}
  let address2 = ''

  if (country.value === 'United States') {
    address2 = `${(props.city || '').toLowerCase()}, ${(props.state || '').toUpperCase()} ${props.zipcode || ''}`.trim()
  } else if (country.value === 'POSTOFFICE') {
    address2 = `${(props.apoFpoType || '').toUpperCase()}, ${(props.apoFpo || '').toUpperCase()} ${props.zipcode || ''}`.trim()
  } else if (country.value !== '') {
    address2 = `${(props.city || '').toLowerCase()}, ${(country.value || '').toLowerCase()}`.trim()
  }

  if (address1.length === 0 || address2.length === 1) {
    return unknown
  }

  return (
    <span className="title-case">{`${address1.toLowerCase()}, ${address2}`.trim()}</span>
  )
}
