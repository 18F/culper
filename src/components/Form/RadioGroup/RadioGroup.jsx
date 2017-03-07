import React from 'react'
import Radio from '../Radio'

export default function RadioGroup (props) {
  let id = new Date().getTime()
  let name = props.name ? `${props.name}-${id}` : null
  const children = React.Children.map(props.children, (child) => {
    // If type is not Radio, stop
    if (child.type !== Radio) {
      return child
    }
    // Check if current value matches one of the child radio options
    let checked = (child.props.value === props.selectedValue)

    // Use function when you want custom behavior
    if (props.selectedValueFunc) {
      checked = props.selectedValueFunc(child.props)
    }

    return (
      <child.type {...child.props} name={name || child.props.name} checked={checked}></child.type>
    )
  })

  return (
    <div className={props.className}>{children}</div>
  )
}
