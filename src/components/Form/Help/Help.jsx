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
          <div className="eapp-field-wrap">
            {this.props.children}
            <a href="javascript:;" title="Show help" className="toggle eapp-help-toggle" onClick={this.handleClick}>
              <i className="fa fa-info-circle"></i>
            </a>
            <div className="message eapp-help-message">
              <i className="fa fa-info"></i>
              {this.getText()}
              <a href="javascript:;" className="eapp-help-close" onClick={this.handleClick}>Close info Block</a>
            </div>
          </div>
      )
    }

    return (
        <div className="eapp-field-wrap">
          {this.props.children}
          <a href="javascript:;" title="Show help" className="toggle eapp-help-toggle" onClick={this.handleClick}>
            <i className="fa fa-info-circle"></i>
          </a>
        </div>
    )
  }
}
