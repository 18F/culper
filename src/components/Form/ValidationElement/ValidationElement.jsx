import React from 'react'

export default class ValidationElement extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.handleValidation(event)
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, errorCodes) {
    if (this.props.onValidate) {
      this.props.onValidate(event, status, errorCodes)
    }
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }
  }

  flattenObject (obj) {
    let s = ''
    let what = Object.prototype.toString.call(obj)
    switch (what) {
      case '[object Object]':
        for (let p in obj) {
          if (!obj.hasOwnProperty(p)) {
            continue
          }
          s += (s.length === 0 ? '' : '.') + p + '.' + this.flattenObject(obj[p])
        }
        break
      case '[object String]':
        s += (s.length === 0 ? '' : '.') + obj
        break
      case '[object Array]':
        obj.forEach((x) => {
          s += (s.length === 0 ? '' : '.') + this.flattenObject(x)
        })
        break
    }

    return s
  }

  mergeError (previous, error) {
    let codes = []

    // Clean up any errors which are no longer valid
    previous.forEach((c) => {
      if (error && error.endsWith('.') && c.indexOf(error) > -1) {
        return
      }

      codes.push(c)
    })

    // Add the error if it does not already exist
    if (error && error.length && !error.endsWith('.') && !codes.includes(error)) {
      codes.push(error)
    }

    return codes
  }

  triageErrors (section, previous, codes) {
    let arr = []

    // First we need to persist any error messages stored in the same section
    // but not necessarily within the same scope
    previous.forEach((e) => {
      for (let subsection in codes) {
        if (!codes.hasOwnProperty(subsection)) continue
        if (e.indexOf(`${subsection}.`) === -1) {
          arr.push(e.replace(`${section}.`, ''))
        }
      }
    })

    for (let subsection in codes) {
      // skip loop if the property is from prototype
      if (!codes.hasOwnProperty(subsection)) continue

      if (codes[subsection]) {
        for (let prop in codes[subsection]) {
          if (!codes[subsection].hasOwnProperty(prop)) continue

          let e = `${subsection}.` + this.flattenObject(codes[subsection][prop])
          if (!arr.includes(e)) {
            arr.push(e)
          }
        }
      }
    }

    return arr
  }
}
