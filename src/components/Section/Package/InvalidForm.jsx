import React from 'react'
import { i18n, env } from '../../../config'
import { Link } from 'react-router-dom'
import { Show } from '../../Form'

export default class InvalidForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: null,
      width: 0
    }
    this.errors = this.errors.bind(this)
  }

  errors () {
    let errors = []
    for (const sectionName in this.props.tally) {
      const mark = this.props.tally[sectionName]
      if (mark.errors) {
        errors.push(<InvalidSection key={mark.section.url} mark={mark} />)
      }
    }
    return errors
  }

  render () {
    return (
      <div className="invalid-form">
        { i18n.m(`application.invalidForm`) }
        { this.errors() }
        <Show when={!env.IsProduction()}>
          <Link to="/form/package/submit">Simulate valid form</Link>
        </Show>
      </div>
    )
  }
}

export class InvalidSection extends React.Component {
  render () {
    const incompleteSubsections = this.props.mark.subsections.map((subsection, i) => {
      return (<li key={`${subsection.url}-${i}`}>{ subsection.name }</li>)
    })

    return (
      <div className="field">
        <div className="table expand">
          <span className="messages error-messages">
            <div className="message error">
              <i className="fa fa-exclamation"></i>
              <h3>{ this.props.mark.section.title }</h3>
              <ul>{ incompleteSubsections }</ul>
              <Link to={`/form/${this.props.mark.section.url}/review`}>
                <button className="back usa-button-outline">Back to section</button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    )
  }
}

InvalidForm.defaultProps = {
  tally: {},
  dispatch: (action) => {}
}
