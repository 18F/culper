import React from 'react'
import { ValidationElement } from '../../../Form'

export default class SummaryProgress extends ValidationElement {
  /**
   * Do some fancy decimal rounding allowing for different types:
   *  - round
   *  - floor
   *  - ceiling
   *
   * This was pulled from Mozilla Developer Network.
   */
  decimalAdjust (type, value, exp) {
    // If the exp is undefiend or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value)
    }

    value = +value
    exp = +exp

    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN
    }

    // Shift
    value = value.toString().split('e')
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))

    // Shift back
    value = value.toString().split('e')
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
  }

  /**
   * Compile the ranges from the list of items
   */
  ranges () {
    const now = new Date()
    const tenYears = new Date(now - (1000 * 60 * 60 * 24 * 365 * 10))
    const items = this.props.List || []

    return items.map((item) => {
      const res = item.Residence || {}
      const dates = res.Dates || {}
      const from = dates.from
      const to = dates.to
      let left = 0
      let width = 0

      if (from && to) {
        let right = ((to.getFullYear() - tenYears.getFullYear()) / 10) * 100
        left = ((from.getFullYear() - tenYears.getFullYear()) / 10) * 100
        width = right - left

        // Check boundaries
        if (left < 0) {
          left = 0
        }

        if (width < 0) {
          width = 0
        }

        if (width > 100) {
          width = 100
        }
      }

      // Add the range to the collection
      return {
        left: this.decimalAdjust('round', left, -2),
        width: this.decimalAdjust('round', width, -2)
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
    return this.decimalAdjust('floor', total * (sum / 100), 0)
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
          <div className="fraction">
            <span className="completed">{this.completed()}</span>
            <span className="slash">/</span>
            <span className="total">{this.props.total}</span>
          </div>
          <span className="unit">{this.props.unit}</span>
        </div>
      </div>
    )
  }
}
