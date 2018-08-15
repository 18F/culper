import React from 'react'
import { Link } from 'react-router-dom'

export default class InvalidSection extends React.Component {
  render() {
    const incompleteSubsections = this.props.mark.subsections.map((subsection, i) => {
      return (<li key={`${subsection.url}-${i}`}>{subsection.name}</li>)
    })

    return (
      <div className="field">
        <div className="table expand">
          <div className="usa-alert usa-alert-error">
            <div className="usa-alert-body">
              <h5 className="usa-alert-heading">{this.props.mark.section.title}</h5>
              <ul>{incompleteSubsections}</ul>
              <Link to={`/form/${this.props.mark.section.url}/review`}>
                <button className="back usa-button-outline">Back to section</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
