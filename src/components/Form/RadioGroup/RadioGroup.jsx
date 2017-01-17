import React from 'react'

export default function RadioGroup (props) {
  const children = React.Children.map(props.children, (radio) => {
    // Check if current value matches one of the radio options
    let checked = (radio.props.value === props.selectedValue)

    // Use function when you want custom behavior
    if (props.selectedValueFunc) {
      checked = props.selectedValueFunc(radio.props)
    }

    return (
      <radio.type {...radio.props} checked={checked}></radio.type>
    )
  })

  return (
    <div className={props.className}>{children}</div>
  )
}
