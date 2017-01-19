import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'

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
    this.setState({ active: !this.state.active })
  }

  getMessage () {
    if (this.state.active) {
      return (
        <div className="message eapp-help-message">
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

  render () {
    return (
      <div className="help">
        {this.children()}
        {this.getMessage()}
      </div>
    )
  }
}
