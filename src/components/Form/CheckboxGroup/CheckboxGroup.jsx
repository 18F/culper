import React from 'react'
import ValidationElement from '../ValidationElement'

export default class CheckboxGroup extends ValidationElement {
  constructor(props) {
    super(props)
    this.state = {
      uid: `${props.name}-${super.guid()}`,
      error: false
    }
    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount() {
    this.onUpdate({ value: '' })
  }

  handleValue(option) {
    let value = option.value
    if (!value) {
      return this.props.selectedValues
    }

    let selected = [...(this.props.selectedValues || [])]
    if (selected.includes(value)) {
      selected.splice(selected.indexOf(value), 1)
    } else {
      selected.push(value)
    }
    return selected
  }

  onUpdate(option) {
    const selectedValues = this.handleValue(option)
    const errors = this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(selectedValues, this.props),
        uid: this.state.uid
      }
    })

    this.setState({
      error: errors.some(x => x.valid === false)
    })

    this.props.onError(selectedValues, errors)
  }

  render() {
    const children = React.Children.map(this.props.children, checkbox => {
      let checked = null

      // Handle empty array case so that .find() doesn't error
      if (
        !this.props.selectedValues ||
        this.props.selectedValues.length === 0
      ) {
        checked = false
      } else if (this.props.selectedValues.find) {
        // Check if current value matches one of the checkbox options. Boolify it
        // if a value is found
        checked = !!this.props.selectedValues.find(v => {
          return v === checkbox.props.value
        })
      }

      // Use function when you want custom behavior
      if (this.props.selectedValueFunc) {
        checked = this.props.selectedValueFunc(checkbox.props)
      }

      const onUpdate = option => {
        if (checkbox.props.onUpdate) {
          checkbox.props.onUpdate(option)
        }
        this.onUpdate(option)
      }

      return (
        <checkbox.type
          {...checkbox.props}
          checked={checked}
          onUpdate={onUpdate}
        />
      )
    })

    const classes = [
      'blocks',
      this.props.className,
      this.state.error === true ? 'usa-input-error' : ''
    ]
      .join(' ')
      .trim()
    return <div className={classes}>{children}</div>
  }
}

CheckboxGroup.defaultProps = {
  selectedValues: [],
  onError: (value, arr) => {
    return arr
  }
}

CheckboxGroup.errors = [
  {
    code: 'required',
    func: (values, props) => {
      if (props.required) {
        return !!values && !!values.length
      }
      return true
    }
  }
]
