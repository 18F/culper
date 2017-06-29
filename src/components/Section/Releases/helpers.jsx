import React from 'react'
import { i18n } from '../../../config'

const nameFormatter = (name) => {
  let nameParts = []
  nameParts.push(name.first)
  if (!name.noMiddleName) {
    nameParts.push(name.middle)
  }
  nameParts.push(name.last)
  switch (name.suffix) {
    case 'Other':
      nameParts.push(name.suffixOther)
      break
    case null:
    case '':
      break
    default:
      // If it's not other or empty, then it's a suffix we want to use
      nameParts.push(name.suffix)
  }

  return nameParts.join(' ')
}

const telephoneFormatter = (telephone) => {
  let number = ''
  if (!telephone || !telephone.number) {
    return null
  }
  number = telephone.number
  switch (telephone.type) {
    case 'DSN':
      number = `${number.slice(0, 3)}-${number.slice(3, 7)}`
      break

    case 'International':
      number = `+${number.slice(0, 3)} ${number.slice(3, 13)}`
      if (telephone.extension) {
        number += ` x${telephone.extension}`
      }
      break

    case 'Domestic':
    default:
      number = `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`
      if (telephone.extension) {
        number += ` x${telephone.extension}`
      }
      break
  }
  return number
}

export function FullName (props) {
  const formattedName = nameFormatter(props.Name)
  return (
    <div>
      <h3>{ i18n.t('releases.verify.heading.name') }</h3>
      { formattedName }
    </div>
  )
}

export function OtherNames (props) {
  const othernames = props.OtherNames
  let names = []

  if (othernames && othernames.List && !othernames.List.length) {
    names = othernames.List.map(name => {
      const formattedName = nameFormatter(name.Name)
      return (
        <div>{ formattedName }</div>
      )
    })
  }

  return (
    <div>
      <h3>{ i18n.t('releases.verify.heading.otherNamesUsed') }</h3>
      { names }
    </div>
  )
}

export function DateOfBirth (props) {
  const dob = props.Date
  let formattedDate = ''

  if (dob && dob.date) {
    formattedDate = `${dob.date.getMonth() + 1}/${dob.date.getDate()}/${dob.date.getFullYear()}`
  }

  return (
    <div>
      <h3>{ i18n.t('releases.verify.heading.dateOfBirth') }</h3>
      { formattedDate }
    </div>
  )
}

export function SSN (props) {
  const ssn = props.SSN
  let formattedSSN = ''

  if (ssn && ssn.first && ssn.middle && ssn.last) {
    formattedSSN = `${ssn.first}-${ssn.middle}-${ssn.last}`
  }

  return (
    <div>
      <h3>{ i18n.t('releases.verify.heading.ssn') }</h3>
      { formattedSSN }
    </div>
  )
}

export function Telephone (props) {
  let numbers = [...props.Numbers || []]
  if (numbers && numbers.length) {
    numbers = numbers.map(telephone => {
      const formattedTelephone = telephoneFormatter(telephone.Telephone)
      return (
        <div>{ formattedTelephone }</div>
      )
    })
  }

  return (
    <div>
      <h3>{ i18n.t('releases.verify.heading.telephoneNumber') }</h3>
      { numbers }
    </div>
  )
}
