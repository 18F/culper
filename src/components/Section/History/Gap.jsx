import React from 'react'
import { i18n } from '../../../config'
import { DateSummary } from '../../Summary'

/**
 * Renders a formatted gap row
 */
export class Gap extends React.Component {
  render () {
    if (!this.props.dates.from || !this.props.dates.to) {
      return null
    }

    const dates = DateSummary({
      from: {
        day: `${this.props.dates.from.date.getDate()}`,
        month: `${this.props.dates.from.date.getMonth()+1}`,
        year: `${this.props.dates.from.date.getFullYear()}`
      },
      to: {
        day: `${this.props.dates.to.date.getDate()}`,
        month: `${this.props.dates.to.date.getMonth()+1}`,
        year: `${this.props.dates.to.date.getFullYear()}`
      }
    })

    return (
      <div className="gap details open">
        <div className="message error">
          <i className="fa fa-exclamation"></i>
          <span className="dates"><strong>{dates}</strong></span>
          <h3>{this.props.title}</h3>
          <p>{this.props.para}</p>
          <button className="usa-button-outline" onClick={this.props.onClick}>
            <span>{this.props.btnText}</span>
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
      </div>
    )
  }
}

Gap.defaultProps = {
  title: '',
  btnText: '',
  para: '',
  first: false,
  dates: {
    from: null,
    to: null
  }
}
