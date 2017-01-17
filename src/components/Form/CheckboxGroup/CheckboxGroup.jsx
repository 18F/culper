import React from 'react'

export default function CheckboxGroup (props) {
  const children = React.Children.map(props.children, (checkbox) => {
    let checked = null

    // Handle empty array case so that .find() doesn't error
    if (!props.selectedValues || props.selectedValues.length === 0) {
      checked = false
    } else {
      // Check if current value matches one of the checkbox options. Boolify it
      // if a value is found
      checked = !!(props.selectedValues.find(v => {
        return (v === checkbox.props.value)
      }))
    }

    // Use function when you want custom behavior
    if (props.selectedValueFunc) {
      checked = props.selectedValueFunc(checkbox.props)
    }

    return (
      <checkbox.type {...checkbox.props} checked={checked}></checkbox.type>
    )
  })

  return (
    <div className={props.className}>{children}</div>
  )
}

CheckboxGroup.defaultProps = {
  selectedValues: []
}
