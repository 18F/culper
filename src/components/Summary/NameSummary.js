import React from 'react'

export const NameSummary = (props, unknown) => {
  if (!props) {
    return unknown
  }

  const name = `${props.first || ''} ${props.middle || ''} ${props.last || ''}`.trim()
  return name.length > 0
    ? <span className="title-case">{name}</span>
    : unknown
}
