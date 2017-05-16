import React from 'react'

export const AddressSummary = (props, unknown) => {
  if (!props) {
    return unknown
  }

  const address1 = `${props.address || ''}`.trim()
  let address2 = ''

  if (props.addressType === 'United States') {
    address2 = `${(props.city || '').toLowerCase()}, ${(props.state || '').toUpperCase()} ${props.zipcode || ''}`.trim()
  } else if (props.addressType === 'APOFPO') {
    address2 = `${(props.apoFpoType || '').toUpperCase()}, ${(props.apoFpo || '').toUpperCase()} ${props.zipcode || ''}`.trim()
  } else if (props.addressType === 'International') {
    address2 = `${(props.city || '').toLowerCase()}, ${(props.country || '').toLowerCase()}`.trim()
  }

  if (address1.length === 0 || address2.length === 1) {
    return unknown
  }

  return (
    <span className="title-case">{`${address1.toLowerCase()}, ${address2}`.trim()}</span>
  )
}
