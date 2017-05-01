import React from 'react'
import ValidationElement from '../ValidationElement'
import ReactMarkdown from 'react-markdown'
import Autosuggest from 'react-autosuggest'
import { autotab } from '../Generic'

const trimLeadingZero = (num) => {
  if (isNaN(num)) {
    return num
  }

  const i = parseInt(`0${num}`, 10)
  return i === 0 ? '' : '' + i
}

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = (suggestion, search) => {
  let text = `${suggestion.name}`

  // If the value is different than the name then display that
  // as well
  if (suggestion.name !== suggestion.value) {
    text += ` (${suggestion.value})`
  }

  // Highlight what was matched
  if (search.query) {
    let rx = new RegExp(search.query, 'ig')
    if (rx.test(text)) {
      let lastIndex = rx.lastIndex
      let firstIndex = lastIndex - search.query.length
      text = text.slice(0, lastIndex) + '**' + text.slice(lastIndex + Math.abs(0))
      text = text.slice(0, firstIndex) + '**' + text.slice(firstIndex + Math.abs(0))
    }
  }

  return (
    <div>
      <ReactMarkdown source={text} />
    </div>
  )
}

export default class Dropdown extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      options: [],
      suggestions: [],
      focus: props.focus,
      error: props.error,
      valid: props.valid
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.onSuggestionChange = this.onSuggestionChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  componentDidMount () {
    if (this.props.children) {
      let arr = []
      for (let child of this.props.children) {
        if (child && child.type === 'option') {
          arr.push({
            name: child.props.children || '',
            value: child.props.value
          })
        }
      }

      this.setState({options: arr}, () => {
        // Force validation. Particularly on first render we need to revalidate the
        // value.
        let event = {
          target: {
            id: this.props.id,
            name: this.props.name,
            value: this.state.value
          },
          persist: function () {},
          fake: true
        }

        this.handleValidation(event)
      })
    }
  }

  componentWillReceiveProps (next) {
    if (next.receiveProps) {
      this.setState({
        value: next.value
      })
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    this.setState({value: trimLeadingZero(event.target.value)}, () => {
      super.handleChange(event)
    })
  }

  handleValidation (event, status, errorCodes) {
    let value = trimLeadingZero(this.state.value)
    status = value.length > 0 ? false : null

    if (status !== null) {
      this.state.options.forEach(x => {
        if (x.name.toLowerCase() === value.toLowerCase() || x.value.toLowerCase() === value.toLowerCase()) {
          status = true
          value = x.name
        }
      })

      if (status === false) {
        errorCodes = 'notfound'
      }
    }

    this.setState({
      value: trimLeadingZero(value),
      error: status === false,
      valid: status === true
    },
    () => {
      const e = { [this.props.name]: errorCodes }
      super.handleValidation(event, status, e)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the key up event.
   */
  handleKeyUp (event) {
    autotab(event, this.props.maxlength, this.props.tabBack, this.props.tabNext)
  }

  /**
   * Prevents clipboard events from making changes to the value of the elements
   */
  disallowClipboard (event) {
    event.preventDefault()
  }

  getSuggestions (value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : this.state.options.filter(opt => opt.name.toLowerCase().slice(0, inputLength) === inputValue || opt.value.toLowerCase().slice(0, inputLength) === inputValue)
  }

  onSuggestionChange (event, change) {
    let e = {
      ...event,
      target: {
        id: this.props.name,
        name: this.props.name,
        value: change.newValue
      }
    }
    this.setState({value: change.newValue}, () => {
      super.handleChange(e)
    })
  }

  onSuggestionsFetchRequested (query) {
    this.setState({
      suggestions: this.getSuggestions(query.value)
    })
  }

  onSuggestionsClearRequested (value) {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected (event) {
    this.props.tabNext()
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    return `dropdown ${this.props.className || ''} ${!this.props.disabled && (this.state.error || this.props.error) ? 'usa-input-error' : ''}`.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    if (this.props.disabled) {
      return 'disabled'
    }

    return `${this.state.error || this.props.error ? 'usa-input-error-label' : ''}`.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass () {
    if (this.props.disabled) {
      return null
    }

    return `${this.state.focus || this.props.focus ? 'usa-input-focus' : ''} ${this.state.valid ? 'usa-input-success' : ''}`.trim()
  }

  render () {
    const inputProps = {
      value: this.state.value,
      className: this.inputClass(),
      id: this.props.name,
      name: this.props.name,
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      pattern: this.props.pattern,
      maxLength: this.props.maxlength,
      readOnly: this.props.readonly,
      onChange: this.onSuggestionChange,
      onBlur: this.handleBlur,
      onKeyUp: this.handleKeyUp,
      onCopy: this.props.clipboard ? this.props.onCopy : this.disallowClipboard,
      onCut: this.props.clipboard ? this.props.onCut : this.disallowClipboard,
      onPaste: this.props.clipboard ? this.props.onPaste : this.disallowClipboard
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <Autosuggest suggestions={this.state.suggestions}
                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                     onSuggestionSelected={this.onSuggestionSelected}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps}
                     ref="autosuggest"
                     />
      </div>
    )
  }
}

Dropdown.defaultProps = {
  id: '',
  name: 'dropdown',
  label: '',
  placeholder: '',
  value: '',
  maxlength: 255,
  disabled: false,
  pattern: '',
  readonly: false,
  className: '',
  focus: false,
  error: false,
  valid: false,
  clipboard: true,
  tabNext: () => {},
  tabBack: () => {}
}
