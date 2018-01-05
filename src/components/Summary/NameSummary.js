import React from 'react'

export const NameSummary = (props, unknown = '') => {
  const name = NameText(props, '')
  return name.length > 0
    ? <span className="title-case">{name}</span>
    : unknown
}

export const NameText = (props, unknown = '') => {
  if (!props) {
    return unknown
  }

  const suffix = props.suffix && props.suffix === 'Other' ? props.suffixOther : props.suffix
  const name = `${props.first || ''} ${props.middle || ''} ${props.last || ''} ${suffix || ''}`.trim()
  return name.length > 0 ? titleCase(name) : unknown
}

const titleCase = (str) => {
  return str.split(' ').map(c => c.slice(0, 1).toUpperCase() + c.slice(1).toLowerCase()).join(' ')
}
