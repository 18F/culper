import React from 'react'
import { i18n } from '../../../config'
import { DateSummary } from '../../Summary'

/**
 * Renders a formatted gap row
 */
export class Gap extends React.Component {
  render() {
    if (!this.props.dates.from || !this.props.dates.to) {
      return null
    }

    const dates = DateSummary(this.props.dates)
    return (
      <div className="gap details open">
        <div className="message error">
          <i className="fa fa-exclamation" />
          <span className="dates">
            <strong>{dates}</strong>
          </span>
          <h3>{this.props.title}</h3>
          <p>{this.props.para}</p>
          <button className="usa-button-outline" onClick={this.props.onClick}>
            <span>{this.props.btnText}</span>
            <i className="fa fa-plus-circle" />
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
