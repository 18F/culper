import React from 'react'

export function AddressSuggestion (props) {
  const suggestion = props.suggestion
  const current = props.current
  return (
    <div className="address-suggestion">
      <div>
        <HighlightedField new={ suggestion.Address } current={current.address} />
      </div>
      <div>
        <HighlightedField new={ suggestion.City } current={current.city} />, <HighlightedField new={ suggestion.State } current={current.state} /> <HighlightedField new={ suggestion.Zipcode } current={current.zipcode} />
      </div>
    </div>
  )
}

export function HighlightedField (props) {
  let updated = props.new || ''
  let current = props.current || ''
  if (updated.toUpperCase() !== current.toUpperCase()) {
    return (
      <span className="highlight">{ updated }</span>
    )
  }
  return (<span>{ props.current }</span>)
}
