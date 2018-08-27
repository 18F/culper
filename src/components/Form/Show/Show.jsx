import React from 'react'

export default function Show(props) {
  if (props.when && props.children) {
    const okayRaw = ['[object Function]', '[object Object]']
    if (okayRaw.includes(Object.prototype.toString.call(props.children))) {
      return props.children
    }

    // Typically if `children` is an Array it will throw an exception
    return <span>{props.children}</span>
  }

  return null
}
