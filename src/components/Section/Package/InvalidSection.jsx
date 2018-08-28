import React from 'react'
import { Link } from 'react-router-dom'

export default class InvalidSection extends React.Component {
  render() {
    const incompleteSubsections = this.props.mark.subsections.map(
      (subsection, i) => {
        return <li key={`${subsection.url}-${i}`}>{subsection.name}</li>
      }
    )

    return (
      <div className="field">
        <div className="table expand">
          <span className="messages error-messages">
            <div className="message error">
              <i className="fa fa-exclamation" />
              <h3>{this.props.mark.section.title}</h3>
              <ul>{incompleteSubsections}</ul>
              <Link to={`/form/${this.props.mark.section.url}/review`}>
                <button className="back usa-button-outline">
                  Back to section
                </button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    )
  }
}
