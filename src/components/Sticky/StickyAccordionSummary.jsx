import React from 'react'

const SUMMARY_CLASS = '.summary'
const MOBILE_BREAKPOINT = 850

export default class StickyAccordionSummary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stick: false
    }
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.stick) {
      this.updateRelativeSummaryRowWidth()
    } else {
      this.updateFixedSummaryRowWidth()
    }
  }

  componentWillReceiveProps() {
    // Ah yes, the timeout hack
    setTimeout(() => {
      this.onScroll()
    }, 200)
  }

  componentDidMount() {
    this.props.events.forEach(e =>
      this.props.window().addEventListener(e, this.onScroll)
    )
    this.onScroll()
  }

  componentWillUnmount() {
    this.props.events.forEach(e =>
      this.props.window().removeEventListener(e, this.onScroll)
    )
  }

  documentScrollTop() {
    const doc = this.props.document().documentElement
    let st =
      (this.props.window().pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    return st + this.props.offset
  }

  elementOffset() {
    if (!this.refs.content) {
      return 0
    }
    const rect = this.refs.content.getBoundingClientRect()
    const bodyRect = this.props.document().body.getBoundingClientRect()
    const elOffset = rect.top - bodyRect.top
    return elOffset
  }

  elementBottomOffset() {
    if (!this.refs.content) {
      return 0
    }
    const elementOffset = this.elementOffset()
    const elementHeight = this.refs.content.clientHeight
    return elementOffset + elementHeight - this.props.offset
  }

  summaryElement() {
    if (!this.refs.content) {
      return null
    }
    return this.refs.content.querySelector(SUMMARY_CLASS)
  }

  doStick() {
    if (this.props.preventStick) {
      return false
    }
    if (this.props.window().innerWidth <= MOBILE_BREAKPOINT) {
      return false
    }
    return true
  }

  onScroll(event) {
    // Do not perform any sticky behavior. Set to false and run away
    if (!this.doStick()) {
      this.setState({
        stick: false
      })
      this.updateRelativeSummaryRowWidth()
      this.props.onScroll(false)
      return
    }

    // Obtain document scroll top which is a representation of the position
    // of the top of the page
    let documentScrollTop = this.documentScrollTop()

    // Obtain the position of the element
    let elementOffset = this.elementOffset()

    // Obtain the position for the bottom of the element
    let elementBottomOffset = this.elementBottomOffset()

    // Ensure that the top of the screen is within the bounds of the contents
    // of the accordion. The top and bottom of the accordion content region are
    // represented by elementOffset and elementBottomOffset respectively.
    let stick = this.state.stick
    if (
      documentScrollTop >= elementOffset &&
      documentScrollTop <= elementBottomOffset
    ) {
      stick = true
    } else {
      stick = false
    }

    // Don't update state unless previous stick values have changed. This is to
    // prevent unnecessary setState updates which trigger re-renders
    if (stick !== this.state.stick) {
      this.setState({
        stick: stick
      })
    }

    if (stick) {
      this.updateFixedSummaryRowWidth()
    } else {
      this.updateRelativeSummaryRowWidth()
    }
    this.props.onScroll(stick)
  }

  /**
   * Sets the width of the fixed summary row to exactly match the width of the accordion content area.
   * This updates when the page is resized as well to be properly aligned. Doing this with pure css yielded
   * inconsistent results where fixed summaries were not matching up exactly with the accordion content
   * area.
   */
  updateFixedSummaryRowWidth() {
    let fixedSummary = this.summaryElement()
    if (!fixedSummary) {
      return
    }
    let areaWidth = this.refs.content.clientWidth
    fixedSummary.style.width = `${areaWidth}px`
  }

  /**
   * When not fixed, removes the fixed summary width since it can follow the natural width set
   */
  updateRelativeSummaryRowWidth() {
    let fixedSummary = this.summaryElement()
    if (!fixedSummary) {
      return
    }
    fixedSummary.style.width = ''
  }

  render() {
    const stickyClass = this.state.stick ? this.props.stickyClass : ''
    const classes = [stickyClass, this.props.className].join(' ')
    return (
      <div id={this.props.id} className={classes} ref="content">
        {this.props.children}
      </div>
    )
  }
}

StickyAccordionSummary.defaultProps = {
  window: () => {
    return window
  },
  document: () => {
    return document
  },
  stickyClass: '',
  preventStick: false,
  offset: 52,
  onScroll: stick => {},
  events: ['scroll', 'resize', 'pageshow', 'load']
}
