import React from 'react'

export const NameSummary = (props, unknown) => {
  if (!props) {
    return <span>{unknown}</span>
  }

  const suffix = props.suffix && props.suffix === 'Other' ? props.suffixOther : props.suffix
  const name = `${props.first || ''} ${props.middle || ''} ${props.last || ''} ${suffix || ''}`.trim()
  return name.length > 0
    ? <span className="title-case">{name}</span>
    : <span>{unknown}</span>
}
