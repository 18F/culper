import React from 'react'
import { ValidationElement } from '../../../Form'

export default class SummaryProgress extends ValidationElement {
  /**
   * Get the Julian date
   */
  julian (date) {
    if (!date) {
      return null
    }
    return (((+date) / 86400000) + 2440587.5).toFixed(6)
  }

  findPercentage (max, min, value) {
    const pos = ((value - min) / (max - min)) * 100
    return this.decimalAdjust('round', pos, -2)
  }

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
    const now = new Date(new Date().toUTCString())
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
    const ten = new Date(today - (1000 * 60 * 60 * 24 * 365 * 10))
    const julianNow = this.julian(today)
    const julianTen = this.julian(ten)

    let items = []
    if (this.props.List) {
      items = this.props.List() || []
    } else {
      console.warn('No List() function was provided for Summary Progress')
    }

    return items.map((dates) => {
      let left = 0
      let width = 0

      if (dates.from && dates.to) {
        let from = this.julian(new Date(Date.UTC(dates.from.getFullYear(), dates.from.getMonth(), dates.from.getDate())))
        let to = this.julian(new Date(Date.UTC(dates.to.getFullYear(), dates.to.getMonth(), dates.to.getDate())))

        if (dates.from >= julianTen || to >= julianTen) {
          // Meat of the calculations into percentages
          let right = this.findPercentage(julianNow, julianTen, to)
          left = this.findPercentage(julianNow, julianTen, from)
          width = Math.abs(right - left)

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
      }

      // Add the range to the collection
      return {
        left: left,
        width: this.decimalAdjust('round', width, 0)
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

  gaps (ranges = [], buffer = 90) {
    let holes = []

    for (const range of ranges) {
    }

    return holes
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
