import React from 'react'

// TODO: Remove logging after wide range of browser testing.
const isEventSupported = (el, eventName) => {
  const faux = `on${eventName}`
  if (faux in el) {
    // console.log('event [' + eventName + '] is supported')
    return true
  }
  // console.log('event [' + eventName + '] is not supported')
  return false
}

const getBox = (ref) => {
  if (ref) {
    return ref.getBoundingClientRect()
  }

  return { top: 0, bottom: 0 }
}

const toppedOut = (w, b) => {
  return w.pageYOffset <= 1
}

const bottomedOut = (w, b) => {
  return (w.innerHeight + w.pageYOffset) >= b.offsetHeight
}

export default class Sticky extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      position: props.position,
      marginTop: props.marginTop,
      scrollY: props.scrollY,
      touched: 0
    }

    this.onScroll = this.onScroll.bind(this)
    this.onWheel = this.onWheel.bind(this)
    this.elastic = this.elastic.bind(this)
  }

  componentDidMount () {
    const w = this.props.window()
    let scroll = false
    this.props.events.scroll.forEach(name => {
      if (!scroll && isEventSupported(w, name)) {
        this.props.addEvent(w, name, this.onScroll)
        scroll = true
      }
    })

    let wheel = false
    this.props.events.wheel.forEach(name => {
      if (!wheel && isEventSupported(w, name)) {
        this.props.addEvent(w, name, this.onWheel)
        wheel = true
      }
    })

    this.elastic(0)
  }

  componentWillUnmount () {
    const w = this.props.window()
    this.props.events.scroll.forEach(name => {
      if (isEventSupported(w, name)) {
        this.props.removeEvent(w, name, this.onScroll)
      }
    })
    this.props.events.wheel.forEach(name => {
      if (isEventSupported(w, name)) {
        this.props.removeEvent(w, name, this.onWheel)
      }
    })
  }

  onScroll (event) {
    this.props.getDelta(this, event, this.props.window(), this.state, this.elastic)
  }

  onWheel (event) {
    this.props.getDelta(this, event, this.props.window(), this.state, this.elastic)
  }

  setPosition (w, b, scrolled, scrollbar) {
    const content = getBox(this.refs.content)
    const dipstick = getBox(this.refs.dipstick)
    let klasses = ''

    //
    // Check our dipstick stick
    // Check the content's boundaries
    //
    if (dipstick.top >= 0) {
      klasses += ' anchor-visible'
    } else if (content.top > 0 && content.bottom < w.innerHeight) {
      klasses += ' both-visible'
    } else if (content.top > 0) {
      klasses += ' top-visible'
    } else if (content.bottom < w.innerHeight) {
      klasses += ' bottom-visible'
    } else {
      klasses += ' none-visible'
    }

    //
    // Check the scrolling direction
    //
    if (scrolled.up) {
      klasses += ' scrolled-up'
    } else if (scrolled.down) {
      klasses += ' scrolled-down'
    } else {
      klasses += ' no-scroll'
    }

    //
    // Check the scrollbar position
    //
    if (scrollbar.top) {
      klasses += ' scrollbar-top'
    } else if (scrollbar.bottom) {
      klasses += ' scrollbar-bottom'
    } else {
      klasses += ' scrollbar-flux'
    }

    //
    // Special case classes
    //
    const form = getBox(document.getElementsByClassName('eapp-form')[0])
    if (form.height < content.height) {
      klasses += ' page-short'
    }

    return klasses.trim()
  }

  elastic (delta) {
    const w = this.props.window()
    const b = this.props.body()
    const scrolled = { up: delta < 0, down: delta > 0 }
    const scrollbar = { top: toppedOut(w, b), bottom: bottomedOut(w, b) }
    const current = this.state.position
    const position = this.setPosition(w, b, scrolled, scrollbar)

    let marginTop = this.state.marginTop
    if (scrolled.up) {
      if (['page-short', 'top-visible', 'anchor-visible'].some(pos => position.indexOf(pos) !== -1)) {
        marginTop = null
      } else if (current.indexOf('bottom-visible') !== -1 && scrolled.up) {
        const headerAdjust = document.getElementsByClassName('eapp-header')[0].clientHeight
        const offset = w.pageYOffset + getBox(this.refs.content).top - headerAdjust
        marginTop = `${offset}${this.props.unit}`
      }
    } else if (scrolled.down) {
      marginTop = null
    }

    this.setState({ position: position, marginTop: marginTop })
  }

  convert (px) {
    return `${px}${this.props.unit}`
  }

  render () {
    const klass = `sticky-container ${this.state.position}`
    const contentStyle = {
      marginTop: this.state.marginTop
    }

    return (
      <div>
        <span ref="dipstick" className="sticky-dipstick"></span>
        <div className={klass}>
          <div ref="content" className="sticky-content" style={contentStyle}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Sticky.defaultProps = {
  position: '',
  marginTop: null,
  scrollY: 0,
  unit: 'px',
  events: {
    scroll: ['scroll'],
    wheel: [/* 'mousewheel', 'wheel' */]
  },
  addEvent: (w, name, fn) => {
    w.addEventListener(name, fn)
  },
  removeEvent: (w, name, fn) => {
    w.removeEventListener(name, fn)
  },
  window: () => { return window },
  body: () => { return document.body },
  getDelta: (component, event, w, state, fn) => {
    const timestamp = parseInt(new Date().getTime() / 100)
    if (timestamp <= state.touched) {
      return
    }

    const y = w.pageYOffset
    const direction = y < state.scrollY ? -1 : 1
    let delta = 0

    if (event.deltaY) {
      delta = 53
    } else {
      const stick = getBox(component.refs.dipstick).top
      const navigationHeight = getBox(component.refs.content).height
      const windowHeight = w.innerHeight
      const percentageScrolled = y / (windowHeight - stick)
      delta = (navigationHeight * percentageScrolled) - y
    }

    component.setState({ scrollY: w.pageYOffset, touched: timestamp }, () => {
      fn(Math.abs(delta) * direction)
    })
  }
}
