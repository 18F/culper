import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class MultipleDropdown extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`
    }

    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.updateToken = this.updateToken.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      value: this.props.value,
      ...queue
    })

    this.handleError(queue, [])
  }

  updateToken(event, options) {
    // If one has already been selected then no need to add it again
    if (this.props.value.some(x => x === options.suggestion.value)) {
      return
    }

    const values = (this.props.value || []).concat([options.suggestion.value])
    this.update({
      value: values
    })
  }

  remove(index) {
    const arr = [...(this.props.value || [])]
    arr.splice(index, 1)

    this.update({
      value: arr
    })
  }

  handleError(value, arr) {
    const local = this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props),
        uid: this.state.uid
      }
    })

    return this.props.onError(
      value,
      arr.filter(x => x.code.indexOf('required') === -1).concat(local)
    )
  }

  render() {
    const values = this.props.value || []
    const klass = `multiple-dropdown ${this.props.className || ''} ${
      values.length ? 'has-tokens' : ''
    }`.trim()
    const tokens = values.map((x, i) => {
      return (
        <span className="token" key={`${this.props.name}-${x}`}>
          {x}
          <span className="token-delete" onClick={this.remove.bind(this, i)}>
            X
          </span>
        </span>
      )
    })

    return (
      <div className={klass}>
        <Dropdown
          name={this.props.name}
          ref="dropdown"
          label={this.props.label}
          showComments={this.props.showComments}
          comments={this.props.comments}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          required={false}
          clearOnSelection={true}
          onSuggestionSelected={this.updateToken}
          onError={this.handleError}>
          {this.props.children}
        </Dropdown>
        <span className="tokens">{tokens}</span>
      </div>
    )
  }
}

MultipleDropdown.defaultProps = {
  name: 'multiple-dropdown',
  label: '',
  placeholder: '',
  maxlength: 255,
  disabled: false,
  explicit: true,
  pattern: '',
  readonly: false,
  className: '',
  input: '',
  value: [],
  showComments: false,
  comments: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

MultipleDropdown.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!props.value && !!props.value.length
      }
      return true
    }
  }
]
