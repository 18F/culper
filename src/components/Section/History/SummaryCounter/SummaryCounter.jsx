import React from 'react'
import { decimalAdjust, rangeSorter, utc, julian, findPercentage, now, today, julianNow, julianTen, gaps } from '../dateranges'

/**
 * Scan an array of items (of date ranges) and count those found within the
 * appropriate date range.
 */
const scan = (items) => {
  let counter = 0

  for (const dates of items.sort(rangeSorter)) {
    if (dates.from && dates.to) {
      const from = julian(dates.from)
      const to = julian(dates.to)

      if (dates.from >= julianTen || to >= julianTen) {
        counter++
      }
    } else if (dates.date) {
      const d = julian(dates.date)
      if (d >= julianTen) {
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
    return {
      schools: scan(this.props.schools && this.props.schools() || []),
      diplomas: scan(this.props.diplomas && this.props.diplomas() || [])
    }
  }

  render () {
    const klass = `summary counter ${this.props.className || ''}`.trim()
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
