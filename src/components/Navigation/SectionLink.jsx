import { Link } from 'react-router-dom'
import React from 'react'
import { Show } from '../Form'

export default class SectionLink extends React.Component {
  render() {
    // https://codeburst.io/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90
    const { sectionNum, ...passThroughProps } = this.props

    return (
      <Link {...passThroughProps}>
        <Show when={sectionNum}>
          <span className="section-number">{sectionNum}</span>
        </Show>
        <span className="section-name">
          {this.props.title}
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
