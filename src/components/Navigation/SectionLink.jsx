import { Link } from 'react-router-dom'
import React from 'react'
import { Show } from '../Form'

export default class SectionLink extends React.Component {
  render() {
    return (
      <Link className={this.props.className} onClick={this.props.onClick} to={this.props.to}>
        <Show when={this.props.sectionNum}>
          <span className="section-number">{this.props.sectionNum}</span>
        </Show>
        <span className="section-name">
          {this.props.name}
          {this.props.children}
        </span>
        <span className="eapp-status-icon eapp-status-icon-valid"></span>
        <span className="eapp-status-icon eapp-status-icon-error"></span>
      </Link>
    )
  }
}

SectionLink.defaultProps = {
  sectionNum: null
}
