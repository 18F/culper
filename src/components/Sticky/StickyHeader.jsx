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

  componentDidUpdate () {
    if (!this.state.stick) {
      this.initialTop = this.refs.content.offsetTop
    }
  }

  componentReceiveProps () {
    if (!this.state.stick) {
      this.initialTop = this.refs.content.offsetTop
    }
  }

  componentDidMount () {
    this.originalHeight = this.refs.content.offsetHeight
    //this.initialTop = this.refs.content.getBoundingClientRect().top
    this.initialTop = this.refs.content.offsetTop
    //this.initialOffsetTop = this.refs.content.offsetTop
    this.props.events.forEach(e => window.addEventListener(e, this.onScroll))
  }

  componentWillUnmount () {
    this.props.events.forEach(e => window.removeEventListener(e, this.onScroll))
  }

  onScroll (event) {
    if (this.props.disabled) {
      this.setState({
        stick: false
      })
      return
    }
    const offset = this.props.offset
    const rect = this.refs.content.getBoundingClientRect()
    const doc = document.documentElement
    let st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) - offset
    //let ot = rect.top
    let ot = this.refs.content.offsetTop

    let stick = this.state.stick
    //console.log('=====')
    //console.log(this.props.index)
    //console.log('st:', st)
    //console.log('ot:', ot)
    //console.log('rect:', rect)
    //console.log('=====')
    //console.log('initialTop:', this.initialTop)
    //console.log('initialOffsetTop:', this.initialOffsetTop)

    if (this.state.stick) {
      if (this.initialTop < st) {
        console.log('STICK ME')
        stick = true
      } else {
        if (this.initialTop >= st) {
          console.log('UNSTICK ME')
          stick = false
        }
      }
    } else {
      if (ot < st) {
        console.log('STICK ME')
        stick = true
      } else {
        if (ot >= st) {
          console.log('UNSTICK ME')
          stick = false
        }
      }
    }

    // Don't update state unless previous stick values have changed. This is to
    // prevent unnecessary setState updates which trigger re-renders
    if (stick !== this.state.stick) {
      this.setState({
        stick: stick
      })
    }
    if (this.props.disableFunc) {
      this.props.disableFunc(this.refs.childrenRefs)
    }
  }

  render () {
    const stickClass = this.state.stick ? this.props.className : ''
    let style = {}
    if (this.state.stick) {
      //style.position = 'fixed'
    } else {
      //style.position = 'relative'
      style.top = ''
    }

    const cloned = React.cloneElement(
      this.props.children,
      {
        ref: 'childrenRefs'
      }
    )
    return (
      <div>
        { this.state.stick && <div style={{height: this.originalHeight}}></div> }
        <div ref="sticky" style={style} className={stickClass} ref="content">
          { cloned }
        </div>
      </div>
    )
  }
}

StickyHeader.defaultProps = {
  className: 'stickify',
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
