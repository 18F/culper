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
		<svg viewBox="0 0 32.4 32.4">
			<circle className="eapp-help-circle" cx="16.2" cy="16.2" r="16.2"/>
			<g>
				<path className="eapp-help-icon" d="M16.2,25.9c-5.4,0-9.7-4.4-9.7-9.7c0-5.4,4.4-9.7,9.7-9.7s9.7,4.4,9.7,9.7S21.6,25.9,16.2,25.9z M16.5,9.7
					c-2.1,0-3.6,0.9-4.7,2.7c-0.1,0.2-0.1,0.4,0.1,0.5l1.7,1.3c0.1,0.1,0.2,0.1,0.2,0.1c0.1,0,0.2-0.1,0.3-0.2c0.6-0.8,0.8-1,1.1-1.2
					c0.2-0.2,0.6-0.3,1.1-0.3c0.8,0,1.6,0.5,1.6,1.1c0,0.7-0.3,1-1.1,1.3c-0.9,0.4-2.1,1.5-2.1,2.7v0.5c0,0.2,0.2,0.4,0.4,0.4h2.4
					c0.2,0,0.4-0.2,0.4-0.4c0-0.3,0.4-0.9,1-1.3c1-0.5,2.3-1.3,2.3-3.2C21.1,11.4,18.7,9.7,16.5,9.7z M17.8,19.8c0-0.2-0.2-0.4-0.4-0.4
					H15c-0.2,0-0.4,0.2-0.4,0.4v2.4c0,0.2,0.2,0.4,0.4,0.4h2.4c0.2,0,0.4-0.2,0.4-0.4V19.8z"/>
			</g>
		</svg>
      </a>
    )
  }
}
