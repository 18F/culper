import React from 'react'
import { rangeSorter, julian, today, daysAgo } from '../dateranges'

/**
 * Scan an array of items (of date ranges) and count those found within the
 * appropriate date range.
 */
const scan = (items, julianMax) => {
  let counter = 0

  for (const dates of items.sort(rangeSorter)) {
    if (dates.from && dates.to) {
      const from = julian(dates.from.date)
      const to = julian(dates.to.date)

      if (from >= julianMax || to >= julianMax) {
        counter++
      }
    } else if (dates.date) {
      const d = julian(dates.date)
      if (d >= julianMax) {
        counter++
      }
    }
  }

  return counter
}

export default class SummaryCounter extends React.Component {
  /**
   * Compile the ranges from the list of items
   */
  ranges () {
    const total = parseInt(this.props.total || 10)
    const julianMax = julian(daysAgo(today, 365 * total))

    return {
      schools: scan(this.props.schools && this.props.schools() || [], julianMax),
      diplomas: scan(this.props.diplomas && this.props.diplomas() || [], julianMax)
    }
  }

  render () {
    const klass = `summary-counter ${this.props.className || ''}`.trim()
    const total = this.ranges()
    const totalSchools = total.schools
    const totalDiplomas = total.diplomas

    return (
      <div className={klass}>
        <div className="row">
          <span className="content"></span>
          <span className="cell schools">{totalSchools}</span>
          <span className="cell diplomas">{totalDiplomas}</span>
        </div>
        <div className="row">
          <div className="content">
            {this.props.children}
            <span className="title">{this.props.title}</span>
          </div>
          <span className="cell unit">{this.props.schoolsLabel}</span>
          <span className="cell unit">{this.props.diplomasLabel}</span>
        </div>
      </div>
    )
  }
}
