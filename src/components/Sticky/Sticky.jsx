import React from 'react'

export default class Sticky extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      position: props.position,
      top: props.top,
      scrollY: props.scrollY
    }

    this.onScroll = this.onScroll.bind(this)
    this.onWheel = this.onWheel.bind(this)
    this.elastic = this.elastic.bind(this)
  }

  componentDidMount () {
    const w = this.props.window()
    this.props.events.scroll.forEach(name => this.props.addEvent(w, name, this.onScroll))
    this.props.events.wheel.forEach(name => this.props.addEvent(w, name, this.onWheel))
  }

  componentWillUnmount () {
    const w = this.props.window()
    this.props.events.scroll.forEach(name => this.props.removeEvent(w, name, this.onScroll))
    this.props.events.wheel.forEach(name => this.props.removeEvent(w, name, this.onWheel))
  }

  onScroll (event) {
    this.props.getDelta(this, event, this.props.window(), this.state, this.elastic)
  }

  onWheel (event) {
    this.props.getDelta(this, event, this.props.window(), this.state, this.elastic)
  }

  elastic (delta) {
    const w = this.props.window()
    const settings = this.props.settings
    const breakpoint = settings.breakpoint
    let future = {
      position: null,
      top: null
    }

    const winHeight = w.innerHeight
    const scrolled = {
      up: delta < 0,
      down: delta > 0
    }

    const rect = this.props.getBox(this.refs.sticky)
    if (rect.top < breakpoint.lower || rect.top > breakpoint.upper) {
      future.position = 'sticky'
    } else {
      future.position = 'relative'
    }

    if (future.position === 'sticky') {
      if (scrolled.down) {
        let offset = this.state.top
        offset -= Math.abs(delta / settings.ratio) * settings.step

        // Check if the bottom of the navigation is visible.
        // If it is then we don't need to scroll anymore.
        if (rect.bottom < winHeight) {
          offset = this.state.top
        }

        future.top = offset
      }

      if (scrolled.up) {
        let offset = this.state.top
        offset += Math.abs(delta / settings.ratio) * settings.step

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
    const klass = `sticky-container ${this.state.position}`
    const style = {
      top: this.state.top ? `${this.state.top}${this.props.settings.unit}` : null
    }

    return (
      <div className={klass}>
        <div ref="sticky" className="sticky-content" style={style} onScroll={this.onScroll}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Sticky.defaultProps = {
  position: 'relative',
  top: 0,
  scrollY: 0,
  settings: {
    step: 3,
    ratio: 100,
    unit: 'vh',
    breakpoint: {
      upper: 200,
      lower: 10
    }
  },
  events: {
    scroll: ['scroll'],
    wheel: ['mousewheel']
  },
  addEvent: (w, name, fn) => {
    w.addEventListener(name, fn)
  },
  removeEvent: (w, name, fn) => {
    w.removeEventListener(name, fn)
  },
  window: () => { return window },
  getBox: (ref) => {
    if (ref) {
      return ref.getBoundingClientRect()
    }

    return { top: 0, bottom: 0 }
  },
  getDelta: (component, event, w, state, fn) => {
    let delta = 0
    if (!event.deltaY) {
      delta = w.pageYOffset - state.scrollY
    } else {
      delta = event.deltaY
    }

    component.setState({ scrollY: w.pageYOffset }, () => {
      fn(delta)
    })
  }
}
