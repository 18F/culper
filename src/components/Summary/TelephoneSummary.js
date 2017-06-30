import React from 'react'

export const TelephoneSummary = (props, unknown) => {
  if (!props) {
    return unknown
  }

  let number = ''
  if (props.Telephone && !props.noNumber && props.Telephone.number) {
    number = props.Telephone.number

    switch (props.Telephone.type) {
      case 'DSN':
        number = `${number.slice(0, 3)}-${number.slice(3, 7)}`
        break

      case 'International':
        number = `+${number.slice(0, 3)} ${number.slice(3, 13)}`
        if (props.Telephone.extension) {
          number += ` x${props.Telephone.extension}`
        }
        break

      case 'Domestic':
      default:
        number = `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`
        if (props.Telephone.extension) {
          number += ` x${props.Telephone.extension}`
        }
        break
    }
  }

  return number.length > 0
    ? <span className="title-case">{number}</span>
    : <span>{unknown}</span>
}
