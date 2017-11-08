import React from 'react'

export const TelephoneSummary = (props, unknown = '') => {
  if (!props) {
    return unknown
  }

  let number = ''
  if (props.Item && !props.noNumber && props.Item.number) {
    number = props.Item.number

    switch (props.Item.type) {
      case 'DSN':
        number = `${number.slice(0, 3).trim()}-${number.slice(3, 7).trim()}`
        break

      case 'International':
        number = `+${number.slice(0, 3).trim()} ${number.slice(3, 13).trim()}`
        if (props.Item.extension) {
          number += ` x${props.Item.extension}`
        }
        break

      case 'Domestic':
      default:
        number = `(${number.slice(0, 3).trim()}) ${number.slice(3, 6).trim()}-${number.slice(6, 10).trim()}`
        if (props.Item.extension) {
          number += ` x${props.Item.extension}`
        }
        break
    }
  }

  return number.length > 0
    ? <span className="title-case">{number}</span>
    : unknown
}
