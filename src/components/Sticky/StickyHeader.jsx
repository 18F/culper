import React from 'react'

export default class StickyHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stick: false
    }
    this.onScroll = this.onScroll.bind(this)
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
    return st
  }

  elementOffset() {
    if (!this.refs.content) {
      return 0
    }
    const rect = this.refs.content.getBoundingClientRect()
    const bodyRect = this.props.document().body.getBoundingClientRect()
    const elOffset = rect.top - bodyRect.top
    return elOffset + this.props.offset
  }

  onScroll(event) {
    // Obtain document scroll top which is a representation of the position
    // of the top of the page
    let documentScrollTop = this.documentScrollTop()

    // Obtain the position of the element
    let elementOffset = this.elementOffset()

    let stick = this.state.stick
    if (documentScrollTop >= elementOffset) {
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
  }

  render() {
    const stickyClass = this.state.stick ? this.props.stickyClass : ''
    const classes = [stickyClass, this.props.className].join(' ')
    return (
      <div className={classes} ref="content">
        {this.props.children}
      </div>
    )
  }
}

StickyHeader.defaultProps = {
  window: () => {
    return window
  },
  document: () => {
    return document
  },
  stickyClass: '',
  offset: 110,
  events: ['scroll', 'resize', 'pageshow', 'load']
}
