import React from 'react'

export function SSN(obj, unknown) {
  let formattedSSN = unknown
  const ssn = obj.ssn || obj || {}

  if (ssn && ssn.first && ssn.middle && ssn.last) {
    formattedSSN = `${ssn.first}-${ssn.middle}-${ssn.last}`
  }

  return <span>{formattedSSN}</span>
}
