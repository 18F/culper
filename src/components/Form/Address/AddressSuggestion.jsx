import React from 'react'

export function AddressSuggestion (props) {
  const suggestion = props.suggestion
  return (
    <div className="address-suggestion">
      <div>
        <HighlightedField new={ suggestion.Address } old={props.current.address} />
      </div>
      <div>
        <HighlightedField new={ suggestion.City } old={props.current.city} />, <HighlightedField new={ suggestion.State } old={props.current.state} /> <HighlightedField new={ suggestion.Zipcode } old={props.current.zipcode} />
      </div>
    </div>
  )
}

export function HighlightedField (props) {
  let updated = props.new || ''
  let old = props.old || ''
  if (updated.toUpperCase() !== old.toUpperCase()) {
    return (
      <span className="highlight">{ updated }</span>
    )
  }
  return (<span>{ props.old }</span>)
}


