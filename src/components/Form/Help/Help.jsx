import React from 'react'
import { help } from '../../../config'
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

  getText () {
    return help.ById(this.state.id)
  }

  render () {
    if (this.state.active) {
      return (
        <div className="help">
          <div className="content">
            {this.props.children}
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
          {this.props.children}
        </div>
        <button className="toggle" onClick={this.handleClick}>
          <i className="fa fa-info-circle"></i>
        </button>
      </div>
    )
  }
}
