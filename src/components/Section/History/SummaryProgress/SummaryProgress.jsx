import React from 'react'
import { ValidationElement } from '../../../Form'
import { decimalAdjust, rangeSorter, utc, julian, findPercentage, now, today, julianNow, julianTen, gaps } from '../dateranges'

export default class SummaryProgress extends ValidationElement {
  /**
   * Compile the ranges from the list of items
   */
  ranges () {
    let items = []
    if (this.props.List) {
      items = this.props.List() || []
    } else {
      console.warn('No List() function was provided for Summary Progress')
    }

    return items.sort(rangeSorter).map((dates) => {
      let left = 0
      let width = 0

      if (dates.from && dates.to) {
        const from = julian(dates.from)
        const to = julian(dates.to)

        if (dates.from >= julianTen || to >= julianTen) {
          // Meat of the calculations into percentages
          let right = findPercentage(julianNow, julianTen, to)
          left = findPercentage(julianNow, julianTen, from)
          width = Math.abs(right - left)

          // Check boundaries
          if (left < 0) {
            left = 0
          }

          if (width < 0) {
            width = 0
          }

          if (width > 100) {
            width = 100 - left
          }
        }
      }

      // Add the range to the collection
      return {
        left: left,
        width: decimalAdjust('round', width, -2),
        dates: dates
      }
    })
  }

  /**
   * Calculate the amount of units based on the sum of percentages
   * in compiled ranges.
   */
  completed () {
    const sum = this.ranges().reduce((a, b) => a + b.width, 0)
    const total = parseInt(this.props.total)
    return decimalAdjust('floor', total * (sum / 100), 0)
  }

  /**
   * Provide visualized timeline from compiled ranges
   */
  timeline () {
    // Loop through the collected ranges and output as elements
    //
    // Example: 10 years ago |----- Gap -----|----- Filled -----|----- Gap -----| Today
    // Imagine 10 years ago is 0% and today is 100%
    return this.ranges().map((range) => {
      const styles = {
        left: '' + range.left + '%',
        width: '' + range.width + '%'
      }
      return <div className="filled" style={styles}></div>
    })
  }

  render () {
    const klass = `summary ${this.props.className || ''}`.trim()
    const completed = this.completed()
    const total = parseInt(this.props.total)
    const klassFraction = `fraction ${completed === total ? 'covered' : ''}`.trim()

    return (
      <div className={klass}>
        <div className="content">
          <div>
            {this.props.children}
            <span className="title">{this.props.title}</span>
          </div>
          <div className="progress">
            {this.timeline()}
          </div>
        </div>
        <div className="stats">
          <div className={klassFraction}>
            <span className="completed">{completed}</span>
            <span className="slash">/</span>
            <span className="total">{total}</span>
          </div>
          <span className="unit">{this.props.unit}</span>
        </div>
      </div>
    )
  }
}
