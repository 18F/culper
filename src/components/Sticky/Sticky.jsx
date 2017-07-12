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

    this.elastic(0)
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

  setPosition (winHeight, scrolled) {
    const content = this.props.getBox(this.refs.content)
    const measure = this.props.getBox(this.refs.measure)
    const current = this.state.position
    const pin = {
      top: content.top >= 0 && content.bottom > winHeight,
      bottom: content.top < 0 && content.bottom <= winHeight
    }

    let position = ''
    if (measure.top > 0 || (pin.top && pin.bottom)) {
      position = 'pin-top'
    } else if (pin.bottom) {
      if (scrolled.up) {
        position = 'no-pin'
      } else {
        position = 'pin-bottom'
      }
    } else {
      position = 'no-pin'
      if (scrolled.up && (content.top > 0 || current.indexOf('pin-top') !== -1)) {
        position += ' pin-top'
      }
    }

    return position
  }

  getDiffFromStick (delta) {
    const content = this.props.getBox(this.refs.content)
    const measure = this.props.getBox(this.refs.measure)

    return measure.top - content.top
  }

  setOffset (delta, settings, winHeight, scrolled) {
    const content = this.props.getBox(this.refs.content)
    let top = (Math.abs(content.top) + delta) * -1

    // Pseudo pin to the bottom without flicker effect
    if (scrolled.down && content.bottom < winHeight) {
      top = Math.abs(content.top) * -1
    }

    // Pseudo pin to the top without flicker effect
    if (scrolled.up && content.top > 0) {
      top = 0
    }

    return top
  }

  elastic (delta) {
    const w = this.props.window()
    const settings = this.props.settings
    const winHeight = w.innerHeight
    const scrolled = {
      up: delta < 0,
      down: delta > 0
    }
    const position = this.setPosition(winHeight, scrolled)
    const top = position.indexOf('pin-top') === -1
          ? this.setOffset(delta, settings, winHeight, scrolled)
          : 0

    this.setState({
      position: position,
      top: top
    })
  }

  render () {
    const klass = `sticky-container ${this.state.position}`
    const style = {
      top: this.state.top !== null ? `${this.state.top}${this.props.unit}` : null
    }

    return (
      <div>
        <span ref="measure" className="sticky-stick"></span>
        <div className={klass}>
          <div ref="content" className="sticky-content" style={style} onScroll={this.onScroll}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Sticky.defaultProps = {
  position: '',
  top: 0,
  scrollY: 0,
  unit: 'px',
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
