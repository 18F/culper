import React from 'react'
import { countryString } from '../../../validators/location'

/**
 * Helper component that renders address information found
 */
export function AddressSuggestion (props) {
  const suggestion = props.suggestion
  const current = props.current
  const country = countryString(current.country)

  switch (country) {
    case 'United States':
    case 'POSTOFFICE':
      return (
        <div className="address-suggestion">
          <div>
            <HighlightedField new={ suggestion.Street || suggestion.street } current={ current.street } />
          </div>
          <div>
            <HighlightedField new={ suggestion.Street2 || suggestion.street2 } current={ current.street2 } />
          </div>
          <div>
            <HighlightedField new={ suggestion.City || suggestion.city } current={ current.city } />, <HighlightedField new={ suggestion.State || suggestion.state } current={ current.state } /> <HighlightedField new={ suggestion.Zipcode || suggestion.zipcode } current={ current.zipcode } />
          </div>
        </div>
      )
    default:
      return (
        <div className="address-suggestion">
          <div>
            <HighlightedField new={ suggestion.Street || suggestion.street } current={ current.street } />
          </div>
          <div>
            <HighlightedField new={ suggestion.Street2 || suggestion.street2 } current={ current.street2 } />
          </div>
          <div>
            <HighlightedField new={ suggestion.City || suggestion.city } current={ current.city } />, <HighlightedField new={ suggestion.Country || suggestion.country } current={ country } />
          </div>
        </div>
      )
  }
}

/**
 * Compares a current and new value and adds a class in order to allow
 * values to be highlighted when there's a mismatch
 */
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
