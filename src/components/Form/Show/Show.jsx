import React from 'react'

export default function Show (props) {
  if (props.when) {
    return props.children
  }
  return null
}
