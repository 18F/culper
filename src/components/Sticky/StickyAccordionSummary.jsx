import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const SUMMARY_CLASS = '.summary'
const MOBILE_BREAKPOINT = 850

export default class StickyAccordionSummary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stick: false,
    }

    this.contentEl = null
    this.events = ['scroll', 'resize', 'pageshow', 'load']
  }

  componentDidMount() {
    this.bindEvents()
    this.onScroll()
  }

  componentDidUpdate(prevProps, prevState) {
    const { stick } = this.state
    if (stick !== prevState.stick) {
      if (stick) this.updateFixedSummaryRowWidth()
      else this.updateRelativeSummaryRowWidth()
    }
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  bindEvents = () => {
    this.events.forEach((e) => { window.addEventListener(e, this.onScroll) })
  }

  unbindEvents = () => {
    this.events.forEach((e) => { window.removeEventListener(e, this.onScroll) })
  }

  onScroll = () => {
    const { onScroll } = this.props
    const { stick } = this.state

    // Do not perform any sticky behavior. Set to false and run away
    if (!this.doStick()) {
      if (stick) {
        this.setState({
          stick: false,
        })
        this.updateRelativeSummaryRowWidth()
        onScroll(false)
      }
      return
    }

    const documentScrollTop = this.documentScrollTop()
    const elementOffset = this.elementOffset()
    const elementBottomOffset = this.elementBottomOffset()

    const newStick = !!(documentScrollTop >= elementOffset
      && documentScrollTop <= elementBottomOffset)

    // Don't update state unless previous stick values have changed. This is to
    // prevent unnecessary setState updates which trigger re-renders
    if (stick !== newStick) {
      this.setState({
        stick: newStick,
      }, () => {
        onScroll(newStick)
      })
    }
  }

  documentScrollTop() {
    const { offset } = this.props
    const doc = window.document.documentElement
    const st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    return st + offset
  }

  elementOffset() {
    if (!this.contentEl) return 0

    const rect = this.contentEl.getBoundingClientRect()
    const bodyRect = window.document.body.getBoundingClientRect()
    const elOffset = rect.top - bodyRect.top
    return elOffset
  }

  elementBottomOffset() {
    const { offset } = this.props
    if (!this.contentEl) return 0

    const elementOffset = this.elementOffset()
    const elementHeight = this.contentEl.clientHeight
    return elementOffset + elementHeight - offset
  }

  summaryElement() {
    if (!this.contentEl) return null
    return this.contentEl.querySelector(SUMMARY_CLASS)
  }

  doStick() {
    const { preventStick } = this.props
    if (preventStick) return false
    if (window.innerWidth <= MOBILE_BREAKPOINT) return false // Don't stick at mobile size
    return true
  }

  /**
   * Sets the width of the fixed summary row to exactly match the width of the
   * accordion content area. This updates when the page is resized as well to be
   * properly aligned. Doing this with pure css yielded inconsistent results
   * where fixed summaries were not matching up exactly with the accordion
   * content area.
   */
  updateFixedSummaryRowWidth() {
    const fixedSummary = this.summaryElement()
    if (!fixedSummary) return

    const areaWidth = this.contentEl.clientWidth
    fixedSummary.style.width = `${areaWidth}px`
  }

  /**
   * When not fixed, removes the fixed summary width since it can follow the
   * natural width set
   */
  updateRelativeSummaryRowWidth() {
    const fixedSummary = this.summaryElement()
    if (!fixedSummary) return

    fixedSummary.style.width = ''
  }

  render() {
    const {
      children, stickyClass, className, id,
    } = this.props
    const { stick } = this.state

    const classes = classnames(
      { [stickyClass]: stick },
      className
    )

    return (
      <div id={id} className={classes} ref={(el) => { this.contentEl = el }}>
        {children}
      </div>
    )
  }
}

StickyAccordionSummary.propTypes = {
  stickyClass: PropTypes.string,
  preventStick: PropTypes.bool,
  offset: PropTypes.number,
  onScroll: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
}

StickyAccordionSummary.defaultProps = {
  stickyClass: '',
  preventStick: false,
  offset: 52,
  onScroll: () => {},
  children: null,
  className: '',
  id: null,
}
