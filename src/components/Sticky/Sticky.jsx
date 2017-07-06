import React from 'react'

const STEP = 3
const RATIO = 100
const UNIT = 'vh'
const BREAKPOINT_LOWER = 10
const BREAKPOINT_UPPER = 200

export default class Sticky extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      position: 'relative',
      top: 0,
      scrollY: 0
    }

    this.onScroll = this.onScroll.bind(this)
    this.onWheel = this.onWheel.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('mousewheel', this.onWheel)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('mousewheel', this.onWheel)
  }

  onScroll (event) {
    const deltaY = window.pageYOffset - this.state.scrollY
    this.setState({ scrollY: window.pageYOffset }, () => {
      this.fancyPants(deltaY)
    })
  }

  onWheel (event) {
    this.fancyPants(event.deltaY)
  }

  fancyPants (delta) {
    let future = {
      position: null,
      top: null
    }

    const winHeight = window.innerHeight
    const scrolled = {
      up: delta < 0,
      down: delta > 0
    }

    const rect = this.refs.sticky.getBoundingClientRect()
    if (rect.top < BREAKPOINT_LOWER || rect.top > BREAKPOINT_UPPER) {
      future.position = 'sticky'
    } else {
      future.position = 'relative'
    }

    if (future.position === 'sticky') {
      if (scrolled.down) {
        let offset = this.state.top
        offset -= Math.abs(delta / RATIO) * STEP

        // Check if the bottom of the navigation is visible.
        // If it is then we don't need to scroll anymore.
        if (rect.bottom < winHeight) {
          offset = this.state.top
        }

        future.top = offset
      }

      if (scrolled.up) {
        let offset = this.state.top
        offset += Math.abs(delta / RATIO) * STEP

        // Check to see if this exceeds the initial setting. If so, then
        // reset it.
        if (offset > 0) {
          offset = 0
        }

        future.top = offset
      }
    }

    // Set the state
    this.setState(future)
  }

  render () {
    const styleContainer = {
      position: this.state.position
    }
    const style = {
      top: this.state.top ? `${this.state.top}${UNIT}` : null
    }

    return (
      <div className="sticky-container" style={styleContainer}>
        <div ref="sticky" className="sticky" style={style} onScroll={this.onScroll}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
