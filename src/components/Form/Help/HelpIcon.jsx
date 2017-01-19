import React from 'react'

export default class HelpIcon extends React.Component {
  extendedClass () {
    let klass = (this.props.className || '') + ' toggle eapp-help-toggle'
    return klass.trim()
  }

  // NOTE: Get rid of this if not necessary
  icon () {
    if (this.props.active) {
      return '../img/info-light-blue-w-bg-line.svg'
    }

    return '../img/info-light-blue-w-bg-line.svg'
  }

  render () {
    return (
      <a href="javascript:;"
         tabIndex="-1"
         title="Show help"
         className={this.extendedClass()}
         onClick={this.props.onClick}
         >
        <img src={this.icon()} />
      </a>
    )
  }
}
