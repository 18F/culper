import React from 'react'

export const NameSummary = (props, unknown = '') => {
  if (!props) {
    return unknown
  }

  const suffix = props.suffix && props.suffix === 'Other' ? props.suffixOther : props.suffix
  const name = `${props.first || ''} ${props.middle || ''} ${props.last || ''} ${suffix || ''}`.trim()
  return name.length > 0
    ? <span className="title-case">{name}</span>
    : unknown
}
