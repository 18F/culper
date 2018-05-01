import React from 'react' // eslint-disable-line no-unused-vars

export const NameSummary = (props, unknown = '') => {
  const name = NameText(props, '')
  return name.length > 0 ? <span className="title-case">{name}</span> : unknown
}

export const NameText = (props, unknown = '') => {
  if (!props) {
    return unknown
  }

  const suffix = props.suffix && props.suffix === 'Other' ? titleCase(props.suffixOther) : props.suffix
  const name = titleCase(`${props.first || ''} ${props.middle || ''} ${props.last || ''}`.trim())
  const nameAndSuffix = `${name} ${suffix || ''}`.trim()
  return nameAndSuffix || unknown
}

const titleCase = (str) => {
  return str.split(' ').map(c => c.slice(0, 1).toUpperCase() + c.slice(1).toLowerCase()).join(' ')
}
