import React from 'react'
import { help } from '../../../config'

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

  getText () {
    return help.ById(this.state.id)
  }

  children () {
    if (this.props.index) {
      return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          ...child.props,
          index: this.props.index
        })
      })
    }

    return this.props.children
  }

  render () {
    if (this.state.active) {
      return (
        <div className="help">
          <div className="content">
            {this.children()}
            <div className="message">
              {this.getText()}
            </div>
          </div>
          <button className="toggle" onClick={this.handleClick}>
            <i className="fa fa-info-circle"></i>
          </button>
        </div>
      )
    }

    return (
      <div className="help">
        <div className="content">
          {this.children()}
        </div>
        <button className="toggle" onClick={this.handleClick}>
          <i className="fa fa-info-circle"></i>
        </button>
      </div>
    )
  }
}
