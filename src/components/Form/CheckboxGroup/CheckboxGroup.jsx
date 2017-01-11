import React from 'react'

export default function CheckboxGroup (props) {

  const children = React.Children.map(props.children, (checkbox) => {
    // Check if current value matches one of the checkbox options
    let checked = !!(props.selectedValues.find(v => {
      return (v === checkbox.props.value)
    }))

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
