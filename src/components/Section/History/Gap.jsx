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

    const dates = DateSummary(this.props.dates)
    return (
      <div className="gap details open">
        <div className="usa-alert usa-alert-error">
          <div className="usa-alert-body">
            <h5 className="usa-alert-heading">{this.props.title} - <span className="dates">{dates}</span></h5>

            <p>{this.props.para}</p>
            <button className="usa-button-outline" onClick={this.props.onClick}>
              <span>{this.props.btnText}</span>
              <i className="fa fa-plus-circle"></i>
            </button>
          </div>
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
