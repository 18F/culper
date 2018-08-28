import React from 'react'
import { i18n } from '../../../config'
import Number from '../Number'

/**
 * Wraps a Number component and adds the dollar icon. This is meant mostly for UI purposes. This can be a drop-in
 * replacement for any current field being used for currency purposes. This simply just passes down the props.
 */
export default class Currency extends React.Component {
  constructor(props) {
    super(props)
    this.handleError = this.handleError.bind(this)
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `currency.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr)
  }

  render() {
    return (
      <div className="currency">
        <i className="fa fa-dollar" />
        <div className="number">
          <Number {...this.props} onError={this.handleError} />
        </div>
      </div>
    )
  }
}

Currency.defaultProps = {
  name: 'currency',
  placeholder: i18n.t('currency.placeholder'),
  disabled: false,
  value: '',
  min: '1',
  max: '',
  onError: (value, arr) => {
    return arr
  }
}

Currency.errors = []
