import React from 'react'
import Radio from '../Radio'
import ValidationElement from '../ValidationElement'

export default class RadioGroup extends ValidationElement {
  constructor(props) {
    super(props)
    this.state = {
      uid: `${props.name}-${super.guid()}`,
      error: false
    }
    this.lastSelectedValue = ''
    this.onUpdate = this.onUpdate.bind(this)
    this.processError = this.processError.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const selectedValue = nextProps.selectedValue
    if (this.lastSelectedValue !== selectedValue) {
      this.processError(selectedValue)
    }
  }

  componentDidMount() {
    this.onUpdate({ value: this.props.selectedValue })
  }

  processError(selectedValue) {
    const errors = this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(selectedValue, this.props),
        uid: this.state.uid
      }
    })
    this.setState({
      error: errors.some(x => x.valid === false)
    })
    this.props.onError(selectedValue, errors)
    this.lastSelectedValue = selectedValue
  }

  onUpdate(option) {
    const selectedValue = option.value
    this.processError(selectedValue)
  }

  render() {
    const { selectedValue } = this.props;
    const name = this.props.name ? `${this.state.uid}-${this.props.name}` : null
    const children = React.Children.map(this.props.children, child => {
      // If type is not Radio, stop
      if (!child || child.type !== Radio) {
        return child
      }

      // Check if current value matches one of the child radio options
      let checked = child.props.value === selectedValue

      const onUpdate = option => {
        if (child.props.onUpdate) {
          child.props.onUpdate(option)
        }
        this.onUpdate(option)
      }

      return (
        <child.type
          {...child.props}
          name={name || child.props.name}
          disabled={this.props.disabled}
          checked={checked}
          onUpdate={onUpdate}
        />
      )
    })

    const errorClass =
    this.state.error === true && this.props.disabled === false
        ? 'usa-input-error'
        : ''
    const classes = ['blocks', this.props.className, errorClass]
      .join(' ')
      .trim()
    return <div className={classes}>{children}</div>
  }
}

RadioGroup.defaultProps = {
  onError: (value, arr) => {
    return arr
  },
  required: false,
  disabled: false
}

RadioGroup.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!value
      }
      return true
    }
  }
]
