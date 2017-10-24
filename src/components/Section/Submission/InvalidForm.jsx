import React from 'react'
import { i18n } from '../../../config'
import { Link } from 'react-router-dom'

export class InvalidSection extends React.Component {
  render () {
    const incompleteSubsections = this.props.section.subsections
          .filter(subsection => !subsection.complete)
    const incompleteSubsectionsElements = incompleteSubsections
          .map(subsection => {
            return (<div key={subsection.url}>{ subsection.name }</div>)
          })

    return (
      <div className="field">
        <div className="table expand">
          <span className="messages error-messages">
            <div className="message error">
              <i className="fa fa-exclamation"></i>
              <h3>{ this.props.section.title }</h3>
              { incompleteSubsectionsElements }
              <Link to={`/form/${this.props.section.url}/review`}>
                <button className="back usa-button-outline">Back to section</button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    )
  }
}

export default class InvalidForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: null,
      width: 0
    }
  }

  errors () {
    let errors = []
    for (let section of this.props.sections) {
      if (!section.complete) {
        errors.push(<InvalidSection key={section.url} section={section} />)
      }
    }
    return errors
  }

  render () {
    const errors = this.errors()
    return (
      <div className="invalid-form">
        { i18n.m(`submission.invalidForm`) }
        { errors }
      </div>
    )
  }
}

InvalidForm.defaultProps = {
}
