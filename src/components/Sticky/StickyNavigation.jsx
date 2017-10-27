import React from 'react'
import { sidebar } from './sidebar'

export default class StickyNavigation extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.sidebar = new sidebar('.eapp-core', '.menu > .contents')
    this.sidebar.on()
  }

  componentWillUnmount () {
    if (this.sidebar) {
      this.sidebar.off()
    }
  }

  render () {
    return (
      <div>
        <div className="menu">
          <div className="contents">
            {this.props.children}
          </div>
        </div>
        <div className="sidebar-log"></div>
      </div>
    )
  }
}

StickyNavigation.defaultProps = {}
