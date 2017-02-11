import React from 'react'
import Svg from '../Svg'

export default class HelpIcon extends React.Component {
  render () {
    const klass = `${this.props.className || ''} toggle eapp-help-toggle`.trim()
    return (
      <a href="javascript:;"
         tabIndex="-1"
         title="Show help"
         className={klass}
         onClick={this.props.onClick}
         >
        <Svg src="img/info.svg" />
      </a>
    )
  }
}
