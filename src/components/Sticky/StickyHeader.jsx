import React from 'react'

export default class StickyHeader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      stick: false
    }
    this.originalHeight = 0
    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount () {
    //const w = this.props.window()
    //this.props.events.scroll.forEach(name => this.props.addEvent(w, name, this.onScroll))
    //this.props.events.wheel.forEach(name => this.props.addEvent(w, name, this.onWheel))
    this.originalHeight = this.refs.content.offsetHeight
    this.props.events.forEach(e => window.addEventListener(e, this.onScroll))
  }

  componentWillUnmount () {
    //const w = this.props.window()
    //this.props.events.scroll.forEach(name => this.props.removeEvent(w, name, this.onScroll))
    //this.props.events.wheel.forEach(name => this.props.removeEvent(w, name, this.onWheel))
    this.props.events.forEach(e => window.removeEventListener(e, this.onScroll))
  }

  onScroll (event) {
    const offset = this.props.offset
    const rect = this.refs.content.getBoundingClientRect()
    const doc = document.documentElement
    //let st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) - offset
    let st = window.pageYOffset
    let ot = rect.top
    if (!this.state.stick) {
      st = st - offset
    } else {
      ////st = st + (Math.abs(st - this.originalHeight))
      ////st = st - offset
      //st = st - (Math.abs(st + offset ))
      ////ot = (offset + ot)
      st = st + (st - offset)
    }
    console.log('========')
    console.log('st:', st)
    console.log('ot:', ot)
    console.log('bt:', rect.bottom)
    console.log('original height:', this.originalHeight)
    console.log('offset:', offset)
    console.log('========')

    let stick = this.state.stick
    if (st > ot) {
      console.log('STICK ME')
      stick = true
    } else {
      if (st <= ot) {
        console.log('UNSTICK ME')
        stick = false
      }
    }

    // Don't update state unless previous stick values have changed. This is to
    // prevent unnecessary setState updates which trigger re-renders
    if (stick !== this.state.stick) {
      this.setState({
        stick: stick
      })
    }
  }

  render () {
    const stickClass = this.state.stick ? 'stickify' : ''
    return (
      <div>
        { this.state.stick && <div style={{ height: this.originalHeight }}></div> }
        <div ref="sticky" className={stickClass} ref="content">
          { this.props.children }
        </div>
      </div>
    )
  }
}

StickyHeader.defaultProps = {
  offset: 0,

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
  events: [
    'scroll',
    'resize',
    'pageshow',
    'load'
  ],
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
