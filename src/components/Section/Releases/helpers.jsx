import React from 'react'

export function SSN (props, unknown) {
  const ssn = props.SSN
  let formattedSSN = unknown

  if (ssn && ssn.first && ssn.middle && ssn.last) {
    formattedSSN = `${ssn.first}-${ssn.middle}-${ssn.last}`
  }

  return <span>{formattedSSN}</span>
}
