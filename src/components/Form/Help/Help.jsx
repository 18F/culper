import React from 'react'
import { i18n } from '../../../config'

export default class Help extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: this.props.id,
      active: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * Handle the click event.
   */
  handleClick (event) {
    this.setState({ active: !this.state.active }, () => {
      this.scrollIntoView()
    })
  }

  getMessage () {
    if (this.state.active) {
      return (
        <div ref="message" className="message eapp-help-message">
          <i className="fa fa-info"></i>
          {i18n.t(this.props.id)}
        </div>
      )
    }
    return ''
  }

  children () {
    return React.Children.map(this.props.children, (child) => {
      let extendedProps = {}

      if (child.type) {
        let what = Object.prototype.toString.call(child.type)
        if (what === '[object Function]' && child.type.name === 'HelpIcon') {
          extendedProps.onClick = this.handleClick
          extendedProps.active = this.state.active
        }
      }

      if (this.props.index) {
        extendedProps.index = this.props.index
      }

      return React.cloneElement(child, {
        ...child.props,
        ...extendedProps
      })
    })
  }

  /**
   * Checks if the children and help message are within the current viewport. If not, scrolls the
   * help message into view so that users can see the message without having to manually scroll.
   */
  scrollIntoView () {
    // Grab the bottom position for the help container
    const helpBottom = this.refs.help.getBoundingClientRect().bottom

    // Grab the current window height
    const winHeight = window.innerHeight

    // Flag if help container bottom is within current viewport
    const notInView = (winHeight < helpBottom)

    if (this.state.active && this.props.scrollIntoView && notInView) {
      this.refs.message.scrollIntoView(false)
    }
  }

  render () {
    return (
      <div className="help" ref="help">
        {this.children()}
        {this.getMessage()}
      </div>
    )
  }
}

Help.defaultProps = {
  // Flag that allows a help message to be scrolled into view
  scrollIntoView: false
}
