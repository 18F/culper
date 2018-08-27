import React from 'react' // eslint-disable-line no-unused-vars

export const TelephoneSummary = (props, unknown = '') => {
  if (!props) {
    return unknown
  }

  let number = ''
  if (!props.noNumber && props.number) {
    number = props.number

    switch (props.type) {
      case 'DSN':
        number = `${number.slice(0, 3).trim()}-${number.slice(3, 7).trim()}`
        break

      case 'International':
        number = `+${number.slice(0, 3).trim()} ${number.slice(3, 13).trim()}`
        if (props.extension) {
          number += ` x${props.extension}`
        }
        break

      case 'Domestic':
      default:
        number = `(${number.slice(0, 3).trim()}) ${number
          .slice(3, 6)
          .trim()}-${number.slice(6, 10).trim()}`
        if (props.extension) {
          number += ` x${props.extension}`
        }
        break
    }
  }

  return number.length > 0 ? (
    <span className="title-case">{number}</span>
  ) : (
    unknown
  )
}
