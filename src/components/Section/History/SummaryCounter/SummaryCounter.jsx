import React from 'react'
import { Svg } from 'components/Form'
import { i18n } from 'config'
import {
  rangeSorter, julian, today, daysAgo,
} from '../dateranges'

/**
 * Scan an array of items (of date ranges) and count those found with
 * appropriate date(s).
 */
const scan = (items) => {
  let counter = 0

  for (const dates of items.sort(rangeSorter)) {
    if (dates.from && (dates.present || dates.to)) {
      counter++
    } else if (dates.month && dates.day && dates.year) {
      counter++
    }
  }

  return counter
}

export default class SummaryCounter extends React.Component {
  /**
   * Compile the ranges from the list of items
   */
  ranges() {
    return {
      schools: scan((this.props.schools && this.props.schools()) || []),
      diplomas: scan((this.props.diplomas && this.props.diplomas()) || []),
    }
  }

  render() {
    const klass = `summary-counter ${this.props.className || ''}`.trim()
    const total = this.ranges()
    const totalSchools = total.schools
    const totalDiplomas = total.diplomas

    return (
      <div className={klass}>
        <div className="summary-counter-title">
          <Svg
            src="/img/school-cap.svg"
            alt={i18n.t('history.education.summary.svgAlt')}
          />
          <span className="title">{this.props.title}</span>
        </div>
        <div className="summary-counter-schools">
          <span className="schools total">{totalSchools}</span>
          <span className="schools unit">{this.props.schoolsLabel}</span>
        </div>
        <div className="summary-counter-diplomas">
          <span className="diplomas total">{totalDiplomas}</span>
          <span className="diplomas unit">{this.props.diplomasLabel}</span>
        </div>
      </div>
    )
  }
}
